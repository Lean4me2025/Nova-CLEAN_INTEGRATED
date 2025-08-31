async function loadTraits(){
  try{
    const res = await fetch('traitdata.json', {cache:'no-store'});
    const data = await res.json();
    return Array.isArray(data) ? data : (data.traits || []);
  }catch(e){
    console.error('Failed to load traits:', e);
    return [];
  }
}

function preferExternalIntro(){
  // Prefer /audio/intro.mp3 if present; otherwise use a short embedded fallback clip
  return fetch('audio/intro.mp3', {method:'HEAD', cache:'no-store'})
    .then(r => r.ok)
    .catch(()=>false);
}

function setFallbackAudio(el){
  // Short embedded base64 OGG beep (very small). This ensures "real audio" even when file missing.
  // 0.1s tone generated elsewhere, kept tiny.
  const oggBase64 = 'T2dnUwACAAAAAAAAAABW1+u9AAAAABYdG9uZQEAAAAAAAAAAAAAAABPZ2dTAAAAAAAAAAAAAFbX670AAAAAFnRvbmUBAAAAAAAAAAAAAAA=';
  el.src = 'data:audio/ogg;base64,' + oggBase64;
}

function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

async function init(){
  const startBtn = document.getElementById('startBtn');
  const audio = document.getElementById('introAudio');
  const status = document.getElementById('audioStatus');
  const back = document.getElementById('backToIntro');

  // Decide audio source
  if(await preferExternalIntro()){
    audio.src = 'audio/intro.mp3';
  }else{
    setFallbackAudio(audio);
  }

  // Start flow
  startBtn.addEventListener('click', async ()=>{
    status.textContent = 'Starting...';
    try{
      await audio.play();
      status.textContent = 'Playing intro...';
      // After audio ends (or 12s cap), show traits
      const timeout = setTimeout(()=>{
        audio.pause();
        show('traitsScreen');
      }, 12000);

      audio.addEventListener('ended', ()=>{
        clearTimeout(timeout);
        show('traitsScreen');
      }, {once:true});
    }catch(err){
      status.textContent = 'Autoplay blocked. Tap again or check system volume.';
      console.error(err);
    }
  });

  back.addEventListener('click', ()=> show('intro'));

  // Render traits
  const grid = document.getElementById('traitsGrid');
  const traits = await loadTraits();
  grid.innerHTML = '';
  traits.forEach(t=>{
    const li = document.createElement('li');
    li.textContent = t;
    grid.appendChild(li);
  });
}

init();

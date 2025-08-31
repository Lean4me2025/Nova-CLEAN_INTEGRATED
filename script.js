(function(){
  const audio = document.getElementById('introAudio');
  const startBtn = document.getElementById('startBtn');
  const continueLink = document.getElementById('continueLink');
  const hint = document.getElementById('hint');

  // Try to autoplay on load; many browsers will block unless muted or there has been a gesture.
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Attempt play. If blocked, we'll catch and wait for user gesture.
      await audio.play();
      onAudioStarted();
    } catch (err) {
      // Autoplay blocked; show hint to tap Start.
      hint.textContent = 'Tap Start to play the intro.';
    }
  });

  // Start button ensures we have a user gesture; also safe if autoplay already succeeded.
  startBtn.addEventListener('click', async () => {
    try {
      await audio.play();
      onAudioStarted();
    } catch (err) {
      console.error('Audio play failed:', err);
      alert('Your browser blocked audio. Check site sound permissions and try again.');
    }
  });

  function onAudioStarted(){
    startBtn.textContent = 'Restart Intro';
    continueLink.style.display = 'inline-block';
    hint.textContent = 'Intro is playing.';
  }
})();
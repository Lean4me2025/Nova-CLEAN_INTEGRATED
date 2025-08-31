const introScreen = document.getElementById('intro-screen');
const traitsScreen = document.getElementById('traits-screen');
const reportScreen = document.getElementById('report-screen');
const startBtn = document.getElementById('startBtn');
const continueBtn = document.getElementById('continueBtn');
const downloadBtn = document.getElementById('downloadBtn');
const introAudio = document.getElementById('introAudio');
const traitsContainer = document.getElementById('traits-container');
const chosenTraitsDiv = document.getElementById('chosen-traits');

let chosenTraits = [];

// Load traits
fetch('traits.json')
  .then(res => res.json())
  .then(traits => {
    traits.forEach(trait => {
      const div = document.createElement('div');
      div.className = 'trait';
      div.textContent = trait;
      div.onclick = () => div.classList.toggle('selected');
      traitsContainer.appendChild(div);
    });
  });

startBtn.onclick = () => {
  introAudio.play().catch(() => {
    introAudio.setAttribute('controls', 'controls');
  });
  introScreen.classList.remove('active');
  introScreen.classList.add('hidden');
  traitsScreen.classList.add('active');
};

continueBtn.onclick = () => {
  chosenTraits = Array.from(document.querySelectorAll('.trait.selected')).map(el => el.textContent);
  chosenTraitsDiv.innerHTML = chosenTraits.join(', ');
  traitsScreen.classList.remove('active');
  traitsScreen.classList.add('hidden');
  reportScreen.classList.add('active');
};

downloadBtn.onclick = () => {
  const docContent = "Your NOVA Traits: " + chosenTraits.join(', ');
  const blob = new Blob([docContent], {type: 'application/pdf'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'NOVA_Report.pdf';
  link.click();
};

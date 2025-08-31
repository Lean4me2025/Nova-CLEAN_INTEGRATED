/**
 * NOVA Intro Audio Boot — "auto when allowed; Start button when not"
 * Works on Chrome, Safari (iOS/macOS), Firefox, Edge.
 * - Attempts autoplay on load
 * - If blocked by browser policy, shows Start button
 * - Any user interaction (click/tap/keydown) will trigger playback
 */

(function() {
  const audio = document.getElementById('introAudio');
  const startBtn = document.getElementById('startBtn');

  // Ensures we only attempt once per flow
  let attemptedAuto = false;
  let hasPlayed = false;

  function showStart() {
    startBtn.style.display = 'inline-flex';
  }

  function hideStart() {
    startBtn.style.display = 'none';
  }

  async function tryPlay(tag) {
    if (!audio) return;
    try {
      // Make sure we have the latest source selection
      audio.load(); // harmless if already loaded
      await audio.play();
      hasPlayed = true;
      hideStart();
      console.log(`[NOVA] Audio started via: ${tag}`);
    } catch (err) {
      console.log(`[NOVA] Autoplay blocked (${tag}):`, err && err.name || err);
      showStart();
    }
  }

  // 1) Attempt to autoplay as soon as DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    if (attemptedAuto) return;
    attemptedAuto = true;
    tryPlay('DOMContentLoaded');
  });

  // 2) If the page becomes visible after initial load, try again (helps background-tab opens)
  document.addEventListener('visibilitychange', () => {
    if (!hasPlayed && document.visibilityState === 'visible') {
      tryPlay('visibilitychange');
    }
  });

  // 3) Any user interaction should unlock and play (covers iOS Safari)
  const userUnlock = () => {
    if (!hasPlayed) {
      tryPlay('user-gesture');
    }
    // Remove after first gesture to reduce overhead
    window.removeEventListener('pointerdown', userUnlock);
    window.removeEventListener('keydown', userUnlock);
    window.removeEventListener('touchstart', userUnlock);
  };
  window.addEventListener('pointerdown', userUnlock, { once: true });
  window.addEventListener('keydown', userUnlock, { once: true });
  window.addEventListener('touchstart', userUnlock, { once: true, passive: true });

  // 4) Explicit Start button
  startBtn.addEventListener('click', () => tryPlay('Start button'));
})();

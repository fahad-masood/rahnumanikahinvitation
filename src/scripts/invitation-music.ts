/** Optional native audio. Browsers may require the dedicated play button. */
const musicRoot = document.querySelector<HTMLElement>('[data-invitation-music]');

if (musicRoot) {
  const audio = musicRoot.querySelector<HTMLAudioElement>('[data-music-audio]');
  const toggle = musicRoot.querySelector<HTMLButtonElement>('[data-music-toggle]');
  const label = musicRoot.querySelector<HTMLElement>('[data-music-label]');
  const playIcon = musicRoot.querySelector<SVGElement>('[data-music-play]');
  const pauseIcon = musicRoot.querySelector<SVGElement>('[data-music-pause]');
  const status = musicRoot.querySelector<HTMLElement>('[data-music-status]');

  if (audio && toggle && label && playIcon && pauseIcon && status) {
    const trackTitle = musicRoot.dataset.trackTitle ?? 'Invitation music';
    let manuallyPaused = false;
    let unavailable = false;
    let playRequested = false;
    let requestVersion = 0;
    audio.volume = 0.28;

    function showPlaybackState(playing: boolean) {
      if (unavailable) return;
      const action = playing ? 'Pause music' : 'Play music';
      label!.textContent = action;
      toggle!.setAttribute('aria-label', `${action}: ${trackTitle}`);
      toggle!.setAttribute('aria-pressed', String(playing));
      playIcon!.toggleAttribute('hidden', playing);
      pauseIcon!.toggleAttribute('hidden', !playing);
    }

    function showUnavailable() {
      if (unavailable) return;
      unavailable = true;
      requestVersion += 1;
      playRequested = false;
      audio!.pause();
      label!.textContent = 'Music unavailable';
      toggle!.setAttribute('aria-label', `${trackTitle}: music unavailable`);
      toggle!.setAttribute('aria-pressed', 'false');
      toggle!.disabled = true;
      playIcon!.removeAttribute('hidden');
      pauseIcon!.setAttribute('hidden', '');
      status!.textContent = 'The invitation music could not be loaded.';
    }

    async function requestPlayback(automatic = false) {
      if (unavailable || (automatic && manuallyPaused)) return;
      playRequested = true;
      const currentRequest = ++requestVersion;
      try {
        await audio!.play();
        if (currentRequest !== requestVersion || manuallyPaused) return;
        playRequested = false;
        showPlaybackState(!audio!.paused);
      } catch (error) {
        if (currentRequest !== requestVersion || unavailable) return;
        playRequested = false;
        const errorName = error instanceof DOMException ? error.name : '';
        if (errorName === 'NotAllowedError' || errorName === 'AbortError') {
          showPlaybackState(false);
          status!.textContent = errorName === 'NotAllowedError'
            ? `Select Play music to listen to ${trackTitle}.`
            : 'Music is paused.';
          return;
        }
        showUnavailable();
      }
    }

    audio.addEventListener('playing', () => {
      if (manuallyPaused || unavailable) {
        audio.pause();
        return;
      }
      playRequested = false;
      showPlaybackState(true);
      status.textContent = `Playing ${trackTitle}.`;
    });
    audio.addEventListener('pause', () => {
      playRequested = false;
      showPlaybackState(false);
      if (!unavailable) status.textContent = 'Music is paused.';
    });
    audio.addEventListener('error', showUnavailable);

    toggle.addEventListener('click', () => {
      if (unavailable) return;
      if (!audio.paused || playRequested) {
        manuallyPaused = true;
        requestVersion += 1;
        playRequested = false;
        audio.pause();
        showPlaybackState(false);
      } else {
        manuallyPaused = false;
        void requestPlayback();
      }
    });

    toggle.hidden = false;
    if (document.readyState === 'complete') {
      void requestPlayback(true);
    } else {
      window.addEventListener('load', () => void requestPlayback(true), { once: true });
    }
  }
}

export {};

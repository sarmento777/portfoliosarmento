(() => {
  'use strict';
  const audio = document.querySelector('#background-music');
  const widget = document.querySelector('.music-widget');
  const play = document.querySelector('#music-toggle');
  const label = document.querySelector('#music-label');
  const note = document.querySelector('.music-note');
  const settings = document.querySelector('#music-settings');
  const panel = document.querySelector('#music-panel');
  const volume = document.querySelector('#music-volume');
  const output = document.querySelector('#music-volume-value');
  const status = document.querySelector('#music-status');
  let state = 'musicReady', pending = false, request = 0;
  const t = key => (window.SITE_I18N[document.documentElement.lang] || window.SITE_I18N.en).strings[key];

  audio.volume = Number(volume.value) / 100;
  widget.hidden = false;
  function refresh() {
    label.textContent = t(pending ? 'musicLoading' : audio.paused ? 'musicPlay' : 'musicPause');
    play.setAttribute('aria-label', label.textContent);
    note.textContent = audio.paused ? '♫' : 'Ⅱ';
    play.setAttribute('aria-pressed', String(!audio.paused));
    play.setAttribute('aria-busy', String(pending));
    status.textContent = t(state);
    output.value = `${volume.value}%`;
  }
  function closeSettings() {
    panel.hidden = true;
    settings.setAttribute('aria-expanded', 'false');
  }
  function pause() {
    ++request;
    const wasActive = pending || !audio.paused;
    pending = false;
    audio.pause();
    if (wasActive) state = 'musicPaused';
    refresh();
  }
  play.addEventListener('click', async () => {
    if (pending || !audio.paused) { pause(); return; }
    const current = ++request;
    pending = true;
    state = 'musicLoading';
    refresh();
    try {
      await audio.play();
      if (current !== request) return;
      pending = false;
      state = 'musicPlaying';
    } catch {
      if (current !== request) return;
      pending = false;
      state = 'musicError';
    }
    refresh();
  });
  audio.addEventListener('pause', () => {
    if (state !== 'musicError') state = 'musicPaused';
    refresh();
  });
  audio.addEventListener('error', () => {
    ++request;
    pending = false;
    state = 'musicError';
    refresh();
  });
  settings.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    settings.setAttribute('aria-expanded', String(!panel.hidden));
  });
  document.querySelector('#music-close').addEventListener('click', () => {
    closeSettings();
    settings.focus();
  });
  widget.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      closeSettings();
      settings.focus();
      event.stopPropagation();
    }
  });
  volume.addEventListener('input', () => {
    audio.volume = Number(volume.value) / 100;
    refresh();
  });
  document.addEventListener('portfolio:language-change', refresh);
  document.addEventListener('portfolio:demo-open', () => { pause(); closeSettings(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  window.addEventListener('pagehide', pause);
  refresh();
})();

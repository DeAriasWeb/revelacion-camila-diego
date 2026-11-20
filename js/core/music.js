/* Música de fondo opcional: botón de reproducir / pausar */
(function () {
  var audio, btn, ready = false, wanted = false;

  function paint() {
    var on = audio && !audio.paused;
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'Pausar música' : 'Activar música');
  }
  function play() {
    var p = audio.play();
    if (p && p.catch) p.catch(function () { paint(); });
  }

  window.Music = {
    init: function (cfg) {
      audio = App.$('#bgm'); btn = App.$('#musicBtn');
      if (!cfg || !cfg.src) return;
      audio.preload = 'metadata';
      audio.volume = cfg.volume != null ? cfg.volume : 0.6;
      audio.addEventListener('loadedmetadata', function () { ready = true; btn.hidden = false; paint(); if (wanted) play(); });
      audio.addEventListener('play', paint); audio.addEventListener('pause', paint);
      audio.addEventListener('error', function () { btn.hidden = true; });
      audio.src = cfg.src;
      btn.addEventListener('click', function () { if (audio.paused) play(); else audio.pause(); });
      document.addEventListener('visibilitychange', function () { if (document.hidden && audio && !audio.paused) { audio.pause(); audio.dataset.resume = '1'; } else if (!document.hidden && audio && audio.dataset.resume) { delete audio.dataset.resume; play(); } });
    },
    /** Se llama desde el toque en el sobre (gesto del usuario) */
    startFromGesture: function (cfg) {
      if (!audio || !cfg || !cfg.autoplayOnOpen) return;
      wanted = true; if (ready) play(); else { audio.load(); play(); }
    }
  };
})();

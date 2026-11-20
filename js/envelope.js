/* ==========================================================================
   Sobre animado: sello → solapa → tarjeta → zoom hacia la invitación
   ========================================================================== */
(function () {
  window.Envelope = {
    init: function (ev, onReveal) {
      var sobre = App.$('#sobre'), btn = App.$('#envBtn'), flap = App.$('#envFlap');
      var stopDust = App.reduceMotion ? function () {} : Sparkle(App.$('#dust'), { count: 52 });
      var opened = false;

      // Entrada suave de la escena
      requestAnimationFrame(function () { requestAnimationFrame(function () { sobre.classList.add('is-ready'); }); });

      function at(ms, fn) { setTimeout(fn, App.reduceMotion ? Math.min(ms, 120) : ms); }

      function open() {
        if (opened) return; opened = true;
        // 1) Pantalla completa y música, directamente desde el toque del invitado
        if (ev.fullscreen !== false) Fullscreen.request();   // activa por defecto; con fullscreen: false en event.js se desactiva
        Music.startFromGesture(ev.music);

        sobre.classList.add('is-opening');
        btn.disabled = true;
        // 2) El sello se rompe y la solapa se levanta
        sobre.classList.add('is-broken');
        at(380, function () { sobre.classList.add('is-open'); });
        at(900, function () { sobre.classList.add('flap-behind'); });
        // 3) La tarjeta sale del sobre
        at(1350, function () { sobre.classList.add('is-rise'); });
        // 4) La tarjeta se acerca al invitado
        at(2500, function () { sobre.classList.add('is-front'); });
        // 5) Zoom hacia la invitación
        at(3350, function () { sobre.classList.add('is-dive'); onReveal(); });
        at(4750, function () { stopDust(); sobre.classList.add('is-gone'); });
      }

      btn.addEventListener('click', open);
    }
  };
})();

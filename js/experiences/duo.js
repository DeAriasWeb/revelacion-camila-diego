/* EFECTO 4 · Mamá y papá: barra que se arrastra para comparar dos fotos. */
(function () {
  App.register(function (ev) {
    var box = App.$('#duoBox'); if (!box) return;
    var set = (ev.sets && ev.sets.duo) || ev.gallery, A = set[0], B = set[1] || set[0];
    var top = App.$('#duoTop'), back = App.$('.duo__img--b', box), bar = App.$('#duoBar');
    [[top, A, 'duoA'], [back, B, 'duoB']].forEach(function (x) { x[0].appendChild(Photos.make(Object.assign({ key: x[2] }, x[1]), { w: 900, alt: x[1].caption || '', eager: true })); });
    var pos = 50, dragging = false, visible = false, played = false;

    function set_(p) {
      pos = Math.max(4, Math.min(96, p));
      top.style.clipPath = 'inset(0 ' + (100 - pos) + '% 0 0)'; top.style.webkitClipPath = top.style.clipPath;
      bar.style.left = pos + '%'; box.setAttribute('aria-valuenow', String(Math.round(pos)));
    }
    function fromEvent(e) { var r = box.getBoundingClientRect(); set_((e.clientX - r.left) / r.width * 100); }
    box.addEventListener('pointerdown', function (e) {
      dragging = true; played = true; box.classList.add('is-drag');
      try { box.setPointerCapture(e.pointerId); } catch (x) {} fromEvent(e);
    });
    box.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    function end() { dragging = false; box.classList.remove('is-drag'); }
    box.addEventListener('pointerup', end); box.addEventListener('pointercancel', end);
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { set_(pos - 6); e.preventDefault(); } else if (e.key === 'ArrowRight') { set_(pos + 6); e.preventDefault(); }
    });
    set_(50);

    // Pequeño vaivén de invitación la primera vez que se ve
    App.whenVisible(box, function (v) {
      visible = v;
      if (!v || played || App.reduceMotion) return;
      played = true; var t0 = performance.now();
      (function step(t) {
        if (dragging) return; var k = (t - t0) / 2600;
        if (k >= 1) { set_(50); return; }
        set_(50 + Math.sin(k * Math.PI * 2) * 30 * (1 - k)); requestAnimationFrame(step);
      })(t0);
    }, .5);
  });
})();

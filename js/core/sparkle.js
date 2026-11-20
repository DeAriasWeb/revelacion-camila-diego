/* Partículas brillantes (sobre y portada). Se detienen solas fuera de pantalla. */
(function () {
  window.Sparkle = function (canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext('2d'), W = 0, H = 0, run = true, vis = true, ps = [], r = 1;
    var colors = opts.colors || [opts.color || '255,217,160'], n = opts.count || 46;
    function size() {
      r = Math.min(window.devicePixelRatio || 1, 2);
      var b = canvas.getBoundingClientRect(); W = canvas.width = Math.max(1, b.width * r); H = canvas.height = Math.max(1, b.height * r);
    }
    size(); addEventListener('resize', size);
    for (var i = 0; i < n; i++) ps.push({ c: colors[i % colors.length], x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + .5, s: Math.random() * .00012 + .00004, d: Math.random() * 6, a: Math.random() * .55 + .2, tw: Math.random() * 3 + 1 });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe(canvas);
    var t0 = performance.now();
    (function frame(t) {
      if (!run) return; requestAnimationFrame(frame); if (!vis) return;
      ctx.clearRect(0, 0, W, H);
      ps.forEach(function (p) {
        p.y -= p.s * 16; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
        var x = (p.x + Math.sin((t - t0) / 2600 + p.d) * .02) * W, y = p.y * H, rr = p.r * r;
        var a = p.a * (0.55 + 0.45 * Math.sin((t - t0) / 400 * p.tw + p.d));
        var g = ctx.createRadialGradient(x, y, 0, x, y, rr * 4);
        g.addColorStop(0, 'rgba(' + p.c + ',' + a + ')'); g.addColorStop(1, 'rgba(' + p.c + ',0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rr * 4, 0, 7); ctx.fill();
      });
    })(t0);
    return function stop() { run = false; };
  };
})();

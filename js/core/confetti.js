/* Confeti y serpentinas de pantalla completa.
   Confetti.fire(x, y, n, colores)      · explosión de confeti
   Confetti.streamers(x, y, n, colores) · serpentinas largas que se enroscan
   Confetti.colors.pink / .blue / .mix  · paletas listas */
(function () {
  var cv, ctx, W, H, parts = [], raf = 0, r = 1;
  var PINK = ['#f58fb3', '#ffc1d6', '#ff7aa5', '#ffe3ec', '#ffffff', '#ffd9a0'];
  var BLUE = ['#6eb2f2', '#a8d4fa', '#4f9be6', '#dff0ff', '#ffffff', '#ffd9a0'];
  var MIX = PINK.slice(0, 3).concat(BLUE.slice(0, 3), ['#ffe9a8', '#ffffff']);

  function ensure() {
    if (cv) return;
    cv = document.createElement('canvas'); cv.setAttribute('aria-hidden', 'true');
    cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:170';
    document.body.appendChild(cv); ctx = cv.getContext('2d'); size(); addEventListener('resize', size);
  }
  function size() { r = Math.min(window.devicePixelRatio || 1, 2); W = cv.width = innerWidth * r; H = cv.height = innerHeight * r; }

  function loop() {
    raf = 0; ctx.clearRect(0, 0, W, H);
    parts = parts.filter(function (p) { return p.y < H + 60 && p.life > 0; });
    parts.forEach(function (p) {
      p.vy += (p.shape === 2 ? .1 : .16) * r; p.vx *= .992; p.vy *= (p.shape === 2 ? .985 : .992);
      p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 1; p.tilt += (p.shape === 2 ? .12 : .15);
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.min(1, p.life / 40);
      if (p.shape === 2) {                       // serpentina: cinta ondulada
        ctx.strokeStyle = p.c; ctx.lineWidth = p.w; ctx.lineCap = 'round';
        var L = p.h, a = Math.sin(p.tilt) * L * .38;
        ctx.beginPath(); ctx.moveTo(-L / 2, 0); ctx.bezierCurveTo(-L / 5, -a, L / 5, a, L / 2, 0); ctx.stroke();
      } else {
        ctx.fillStyle = p.c;
        if (p.shape === 0) ctx.fillRect(-p.w / 2, -p.h / 2 * Math.abs(Math.cos(p.tilt)), p.w, p.h * Math.abs(Math.cos(p.tilt)) + 1);
        else { ctx.beginPath(); ctx.arc(0, 0, p.w / 2.2, 0, 7); ctx.fill(); }
      }
      ctx.restore();
    });
    if (parts.length) raf = requestAnimationFrame(loop); else ctx.clearRect(0, 0, W, H);
  }

  function spawn(x, y, n, colors, kind) {
    if (App.reduceMotion) return; ensure();
    colors = colors || MIX; x = (x == null ? innerWidth / 2 : x) * r; y = (y == null ? innerHeight * .4 : y) * r;
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, s = (Math.random() * (kind === 2 ? 11 : 9) + 4) * r;
      parts.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6 * r,
        w: kind === 2 ? (Math.random() * 2 + 3) * r : (Math.random() * 7 + 5) * r,
        h: kind === 2 ? (Math.random() * 30 + 38) * r : (Math.random() * 5 + 8) * r,
        rot: Math.random() * 6, vr: (Math.random() - .5) * (kind === 2 ? .12 : .3), c: colors[(Math.random() * colors.length) | 0],
        life: (kind === 2 ? 230 : 170) + Math.random() * 90, tilt: Math.random() * 6,
        shape: kind === 2 ? 2 : (Math.random() < .3 ? 1 : 0) });
    }
    if (!raf) raf = requestAnimationFrame(loop);
  }

  window.Confetti = {
    colors: { pink: PINK, blue: BLUE, mix: MIX },
    fire: function (x, y, n, colors) { spawn(x, y, n || 140, colors, 0); },
    streamers: function (x, y, n, colors) { spawn(x, y, n || 40, colors, 2); },
    both: function (x, y, colors) { spawn(x, y, 70, colors, 0); spawn(x, y, 34, colors, 2); }
  };
})();

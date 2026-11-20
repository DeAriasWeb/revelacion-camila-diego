/* EFECTO 3 · Globos que revientan: al tocar un globo explota con confeti y aparece la foto escondida. */
(function () {
  var TONES = ['pink', 'blue', 'butter', 'pink', 'blue', 'butter'];
  App.register(function (ev) {
    var box = App.$('#pops'), btn = App.$('#popBtn'); if (!box) return;
    var items = ((ev.sets && ev.sets.globos) || ev.gallery).slice(0, 6), tiles = [];
    items.forEach(function (it, i) {
      var tone = TONES[i % TONES.length];
      var t = document.createElement('button'); t.type = 'button'; t.className = 'pop pop--' + tone; t.setAttribute('aria-label', 'Reventar globo');
      t.style.setProperty('--d', (-i * .9) + 's');
      t.innerHTML = '<span class="pop__photo"></span><span class="pop__cap"></span><span class="pop__balloon" aria-hidden="true"><i class="pop__shine"></i><i class="pop__knot"></i><i class="pop__string"></i></span>';
      t.querySelector('.pop__photo').appendChild(Photos.make(Object.assign({ key: 'pop' + i }, it), { w: 500, alt: it.caption || '' }));
      t.querySelector('.pop__cap').textContent = it.caption || '';
      t.addEventListener('click', function () {
        if (t.classList.contains('is-pop')) return;
        t.classList.add('is-pop'); t.setAttribute('aria-label', it.caption || 'Foto');
        var r = t.getBoundingClientRect(), pal = tone === 'butter' ? Confetti.colors.mix : Confetti.colors[tone];
        Confetti.fire(r.left + r.width / 2, r.top + r.height * .42, 46, pal);
      });
      box.appendChild(t); tiles.push(t);
    });
    if (btn) btn.addEventListener('click', function () {
      tiles.forEach(function (t, i) { setTimeout(function () { t.classList.remove('is-pop'); t.setAttribute('aria-label', 'Reventar globo'); }, i * 80); });
    });
  });
})();

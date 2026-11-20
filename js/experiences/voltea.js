/* EFECTO 2 · Cartas que voltean: toca una carta para descubrir la foto. */
(function () {
  App.register(function (ev) {
    var box = App.$('#flips'), btn = App.$('#flipBtn'); if (!box) return;
    var items = ((ev.sets && ev.sets.voltea) || ev.gallery).slice(0, 6), cards = [];
    items.forEach(function (it, i) {
      var tone = i % 2 ? 'blue' : 'pink';
      var b = document.createElement('button'); b.type = 'button'; b.className = 'flip flip--' + tone; b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<span class="flip__in"><span class="flip__f"><i>?</i></span><span class="flip__b"><span class="flip__ph"></span><em></em></span></span>';
      b.querySelector('.flip__ph').appendChild(Photos.make(Object.assign({ key: 'flip' + i }, it), { w: 500, alt: it.caption || '' }));
      b.querySelector('em').textContent = it.caption || '';
      b.addEventListener('click', function () {
        var on = b.classList.toggle('is-flipped'); b.setAttribute('aria-pressed', String(on));
        if (on) { var r = b.getBoundingClientRect(); Confetti.fire(r.left + r.width / 2, r.top + r.height / 2, 26, Confetti.colors[tone]); }
      });
      box.appendChild(b); cards.push(b);
    });
    if (btn) btn.addEventListener('click', function () {
      cards.forEach(function (c, i) { setTimeout(function () { c.classList.remove('is-flipped'); c.setAttribute('aria-pressed', 'false'); }, i * 70); });
    });
  });
})();

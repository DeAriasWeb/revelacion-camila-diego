/* EFECTO 5 · Cinta infinita: dos filas de fotos que corren en sentidos opuestos. Al tocar se detienen. */
(function () {
  App.register(function (ev) {
    var box = App.$('#belt'); if (!box) return;
    var items = ((ev.sets && ev.sets.cinta) || ev.gallery).slice(0, 10);
    [0, 1].forEach(function (row) {
      var r = document.createElement('div'); r.className = 'belt__row' + (row ? ' belt__row--rev' : '');
      var tr = document.createElement('div'); tr.className = 'belt__track';
      var list = row ? items.slice().reverse() : items;
      for (var rep = 0; rep < 2; rep++) {
        list.forEach(function (it, i) {
          var c = document.createElement('div'); c.className = 'bi bi--' + ((i + row) % 2 ? 'blue' : 'pink') + (i % 3 === 1 ? ' bi--tall' : '');
          if (rep) c.setAttribute('aria-hidden', 'true');
          c.appendChild(Photos.make(Object.assign({ key: 'belt' + row + i }, it), { w: 420, alt: rep ? '' : (it.caption || '') }));
          tr.appendChild(c);
        });
      }
      r.appendChild(tr); box.appendChild(r);
    });
    function hold(on) { box.classList.toggle('is-held', on); }
    box.addEventListener('pointerdown', function () { hold(true); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (n) { box.addEventListener(n, function () { hold(false); }); });
  });
})();

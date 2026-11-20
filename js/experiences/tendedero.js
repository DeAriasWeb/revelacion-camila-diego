/* EFECTO 1 · Tendedero: fotos tipo polaroid colgadas de un cordel que se mecen. Se desliza hacia los lados. */
(function () {
  App.register(function (ev) {
    var track = App.$('#lineTrack'); if (!track) return;
    var items = ((ev.sets && ev.sets.tendedero) || ev.gallery).slice(0, 8);
    var tilts = [-4, 3, -2, 4, -3, 2, -4, 3];
    items.forEach(function (it, i) {
      var f = document.createElement('figure'); f.className = 'pol'; f.style.setProperty('--r', tilts[i % tilts.length] + 'deg');
      f.style.setProperty('--d', (-i * 0.7) + 's'); f.style.setProperty('--tone', i % 2 ? 'var(--blue)' : 'var(--pink)');
      var pin = document.createElement('span'); pin.className = 'pol__pin'; pin.setAttribute('aria-hidden', 'true');
      var ph = document.createElement('div'); ph.className = 'pol__ph';
      ph.appendChild(Photos.make(Object.assign({ key: 'ten' + i }, it), { w: 600, alt: it.caption || '' }));
      var cap = document.createElement('figcaption'); cap.textContent = it.caption || '';
      f.appendChild(pin); f.appendChild(ph); f.appendChild(cap);
      f.addEventListener('click', function () {
        f.classList.remove('is-swing'); void f.offsetWidth; f.classList.add('is-swing');
      });
      track.appendChild(f);
    });
  });
})();

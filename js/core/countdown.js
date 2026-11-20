/* Cuenta regresiva + descarga de evento de calendario (.ics) */
(function () {
  function pad(n) { return String(n).padStart(2, '0'); }

  App.register(function (ev) {
    var target = new Date(ev.date.iso).getTime();
    var d = App.$('#cdD'), h = App.$('#cdH'), m = App.$('#cdM'), s = App.$('#cdS');
    var box = App.$('#cd'), title = App.$('#cdTitle');
    var done = false;

    function tick() {
      var diff = Math.max(0, target - Date.now());
      var dd = Math.floor(diff / 864e5), hh = Math.floor(diff % 864e5 / 36e5),
          mm = Math.floor(diff % 36e5 / 6e4), ss = Math.floor(diff % 6e4 / 1e3);
      d.textContent = dd < 100 ? pad(dd) : dd; h.textContent = pad(hh); m.textContent = pad(mm); s.textContent = pad(ss);
      if (diff === 0 && !done) { done = true; title.textContent = ev.texts.countdownDone; box.classList.add('is-done'); }
    }
    tick(); setInterval(tick, 1000);

    // Agregar al calendario (archivo .ics generado en el navegador)
    var btn = App.$('#icsBtn');
    btn.addEventListener('click', function () {
      var start = new Date(ev.date.iso), end = new Date(start.getTime() + 6 * 36e5);
      var f = function (t) { return t.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
      var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Invitaciones//ES', 'BEGIN:VEVENT',
        'UID:' + App.slug + '@invitacion', 'DTSTAMP:' + f(new Date()), 'DTSTART:' + f(start), 'DTEND:' + f(end),
        'SUMMARY:' + (ev.og.title || ev.names.together), 'LOCATION:' + ev.location.name + ', ' + ev.location.address,
        'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
      a.download = App.slug + '.ics';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    });
  });
})();

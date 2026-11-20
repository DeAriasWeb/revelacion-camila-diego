/* Punto de entrada: arranca la invitación */
(function () {
  function start() {
    App.init();
    var ev = App.ev;
    Reveal.init();
    Music.init(ev.music);
    if (!App.reduceMotion && App.$('#heroSpark')) Sparkle(App.$('#heroSpark'), { count: 46, colors: ['245,143,179', '110,178,242', '255,196,92'] });
    App.experiences.forEach(function (fn) { try { fn(ev); } catch (e) { console.warn('[experiencia]', e); } });

    // Programa (línea de tiempo)
    var tl = App.$('#timeline');
    ev.texts.schedule.forEach(function (s) {
      var li = document.createElement('li'); li.className = 'tl reveal';
      li.innerHTML = '<div class="tl__time"><b></b><span></span></div><span class="tl__dot" aria-hidden="true"></span><div class="tl__body"><h3></h3><p></p></div>';
      li.querySelector('b').textContent = s.time; li.querySelector('.tl__time span').textContent = s.ampm;
      li.querySelector('h3').textContent = s.title; li.querySelector('p').textContent = s.text;
      tl.appendChild(li);
    });
    Reveal.init();

    // RSVP → WhatsApp
    var form = App.$('#rsvpForm'), n = 1, out = App.$('#gOut');
    App.$('#gMinus').onclick = function () { n = Math.max(1, n - 1); out.textContent = n; };
    App.$('#gPlus').onclick = function () { n = Math.min(10, n + 1); out.textContent = n; };
    // Apuesta: dos círculos grandes (niña / niño)
    var guess = '', G = (ev.texts && ev.texts.guess) || {}, say = App.$('#guessSay');
    App.$$('.guess__btn').forEach(function (b) {
      b.addEventListener('click', function () {
        guess = b.getAttribute('data-guess');
        var girl = guess === 'Niña';
        App.$$('.guess__btn').forEach(function (o) { var on = o === b; o.classList.toggle('is-on', on); o.classList.toggle('is-off', !on); o.setAttribute('aria-pressed', String(on)); });
        say.classList.remove('in'); void say.offsetWidth; say.textContent = girl ? G.girlSay : G.boySay; say.classList.add('in');
        var r = b.getBoundingClientRect(), pal = girl ? Confetti.colors.pink : Confetti.colors.blue;
        Confetti.both(r.left + r.width / 2, r.top + r.height / 2, pal);
      });
    });
    function resetGuess() {
      guess = ''; App.$$('.guess__btn').forEach(function (o) { o.classList.remove('is-on', 'is-off'); o.setAttribute('aria-pressed', 'false'); });
      say.classList.remove('in'); say.textContent = G.pick || '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = App.$('#rsvpName').value.trim(), att = (form.att.value || ''), ok = true;
      App.$('#errName').textContent = name ? '' : ev.texts.rsvpErrorName; if (!name) ok = false;
      App.$('#errChoice').textContent = att ? '' : ev.texts.rsvpErrorChoice; if (!att) ok = false;
      if (!ok) return;
      var msg = App.$('#rsvpMsg').value.trim();
      var yes = att === 'yes';
      var status = App.$('#rsvpStatus'), btn = App.$('#rsvpSubmit');
      var url = ev.sheets && ev.sheets.url;

      function whatsapp() {
        var text = 'Hola, soy ' + name + '. ' + (yes ? 'Confirmo mi asistencia (' + n + (n > 1 ? ' personas' : ' persona') + ')' : 'Lamentablemente no podré asistir') + ' a la revelación de ' + ev.names.together + '.' + (guess ? ' Apuesto a que es ' + guess.toLowerCase() + '.' : '') + (msg ? ' ' + msg : '');
        window.open('https://wa.me/' + ev.rsvp.whatsapp + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      }

      if (!(url && /^https:\/\/script\.google\.com\//.test(url))) { whatsapp(); return; }

      btn.disabled = true; status.textContent = ev.texts.rsvpSending;
      fetch(url, { method: 'POST', body: JSON.stringify({ action: 'rsvp', slug: App.slug, name: name, attending: yes, guests: yes ? n : 0, message: msg, guess: guess }) })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (!r.ok) throw new Error(r.error || 'error');
          status.textContent = ev.texts.rsvpThanks; form.reset(); n = 1; out.textContent = 1; resetGuess();
          if (ev.rsvp.whatsappToo) whatsapp();
        })
        .catch(function () { status.textContent = ev.texts.rsvpFail; })
        .then(function () { btn.disabled = false; });
    });

    Envelope.init(ev, function () {
      var inv = App.$('#invitacion'); inv.classList.add('is-on'); inv.removeAttribute('aria-hidden');
      setTimeout(function () { Confetti.both(innerWidth / 2, innerHeight * .42); }, 700);   // sorpresa al abrir
      setTimeout(function () { document.body.classList.remove('is-locked'); scrollTo(0, 0); }, 1300);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

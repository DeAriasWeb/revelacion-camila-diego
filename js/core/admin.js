/* ==========================================================================
   Acceso de organizadores
   Doble toque en la última foto → PIN de 4 dígitos → panel de invitados.
   El PIN se verifica en Google Apps Script (no en este archivo), con límite
   de 3 intentos y bloqueo de 30 segundos.
   ========================================================================== */
(function () {
  App.register(function (ev) {
    var cfg = ev.sheets || {}, T = (ev.texts && ev.texts.admin) || {};
    var sec = App.$('#gracias'), pin = App.$('#pin'), msg = App.$('#pinMsg'), admin = App.$('#admin');
    var inputs = App.$$('#pinDigits input'), LOCK_KEY = 'pinlock_' + App.slug;
    var ready = cfg.url && /^https:\/\/script\.google\.com\//.test(cfg.url);
    var okPin = '', timer = 0, memLock = 0, last = { t: 0, x: 0, y: 0 };

    /* ---- Doble toque (o doble clic) en cualquier parte de la última foto ---- */
    sec.addEventListener('pointerup', function (e) {
      if (e.pointerType === 'mouse' && e.button) return;
      if (e.timeStamp - last.t < 380 && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 44) { last.t = 0; openPin(); }
      else last = { t: e.timeStamp, x: e.clientX, y: e.clientY };
    });
    sec.addEventListener('dblclick', function (e) { e.preventDefault(); });

    /* ---- Bloqueo de 30 s (se recuerda aunque recargue la página) ---- */
    function getLock() { try { return +localStorage.getItem(LOCK_KEY) || memLock; } catch (e) { return memLock; } }
    function setLock(sec) { var t = Date.now() + sec * 1000; memLock = t; try { localStorage.setItem(LOCK_KEY, String(t)); } catch (e) {} }

    function tickLock() {
      clearInterval(timer);
      function paint() {
        var left = Math.ceil((getLock() - Date.now()) / 1000);
        if (left <= 0) { clearInterval(timer); msg.textContent = ''; msg.classList.remove('is-err'); inputs.forEach(function (i) { i.disabled = false; }); inputs[0].focus(); return; }
        inputs.forEach(function (i) { i.disabled = true; i.value = ''; });
        msg.classList.add('is-err'); msg.textContent = T.locked + left + ' s';
      }
      paint(); timer = setInterval(paint, 500);
    }

    /* ---- Modal ---- */
    var openedAt = 0;
    function openPin() {
      openedAt = Date.now(); clear(); pin.hidden = false; document.body.classList.add('is-modal');
      requestAnimationFrame(function () { pin.classList.add('is-on'); });
      if (getLock() > Date.now()) tickLock(); else { msg.textContent = ''; setTimeout(function () { inputs[0].focus(); }, 200); }
    }
    function closePin() {
      if (Date.now() - openedAt < 900) return;   // el toque que abre el cuadro no debe cerrarlo
      pin.classList.remove('is-on'); clearInterval(timer);
      setTimeout(function () { pin.hidden = true; if (admin.hidden) document.body.classList.remove('is-modal'); }, 350);
    }
    function clear() { inputs.forEach(function (i) { i.value = ''; i.disabled = false; }); msg.classList.remove('is-err'); }
    App.$$('[data-close]', pin).forEach(function (b) { b.addEventListener('click', closePin); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pin.hidden) closePin(); });

    /* ---- Entrada de dígitos ---- */
    inputs.forEach(function (inp, i) {
      inp.addEventListener('input', function () {
        inp.value = inp.value.replace(/\D/g, '').slice(-1);
        if (inp.value && i < 3) inputs[i + 1].focus();
        var code = inputs.map(function (x) { return x.value; }).join('');
        if (code.length === 4) submit(code);
      });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Backspace' && !inp.value && i > 0) { inputs[i - 1].value = ''; inputs[i - 1].focus(); } });
      inp.addEventListener('focus', function () { inp.select(); });
      inp.addEventListener('paste', function (e) {
        var d = ((e.clipboardData || window.clipboardData).getData('text') || '').replace(/\D/g, '').slice(0, 4);
        if (!d) return; e.preventDefault();
        d.split('').forEach(function (c, k) { inputs[k].value = c; });
        if (d.length === 4) submit(d); else inputs[d.length].focus();
      });
    });

    /* ---- Verificación contra Apps Script ---- */
    function call(code) {
      return fetch(cfg.url, { method: 'POST', body: JSON.stringify({ action: 'list', slug: App.slug, pin: code }) }).then(function (r) { return r.json(); });
    }
    function submit(code) {
      if (!ready) { msg.classList.add('is-err'); msg.textContent = T.notReady; return; }
      inputs.forEach(function (i) { i.disabled = true; }); msg.classList.remove('is-err'); msg.textContent = T.checking;
      call(code).then(function (r) {
        if (r.ok) { okPin = code; closePin(); showAdmin(r); return; }
        if (r.locked) { setLock(r.wait || 30); tickLock(); return; }
        inputs.forEach(function (i) { i.disabled = false; i.value = ''; });
        pin.querySelector('.pin__box').classList.remove('shake'); void pin.offsetWidth; pin.querySelector('.pin__box').classList.add('shake');
        msg.classList.add('is-err'); msg.textContent = T.wrong + (r.left != null ? r.left : '');
        inputs[0].focus();
      }).catch(function () {
        inputs.forEach(function (i) { i.disabled = false; });
        msg.classList.add('is-err'); msg.textContent = T.offline;
      });
    }

    /* ---- Panel de invitados ---- */
    function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
    function confirmBtn(label, fn) {
      var b = el('button', 'link-btn link-btn--light admin__del', label), armed = false, t = 0;
      b.type = 'button';
      b.addEventListener('click', function () {
        if (!armed) {
          armed = true; b.textContent = T.sure || '¿Seguro? Toca otra vez'; b.classList.add('is-armed');
          t = setTimeout(function () { armed = false; b.textContent = label; b.classList.remove('is-armed'); }, 3500); return;
        }
        clearTimeout(t); b.disabled = true; b.textContent = '…';
        fn().catch(function () { b.disabled = false; armed = false; b.classList.remove('is-armed'); b.textContent = T.offline || 'Error'; });
      });
      return b;
    }
    function act(extra) {
      return fetch(cfg.url, { method: 'POST', body: JSON.stringify(Object.assign({ slug: App.slug, pin: okPin }, extra)) })
        .then(function (r) { return r.json(); })
        .then(function (r) { if (!r.ok) throw new Error(r.error || 'error'); return call(okPin); })
        .then(function (r) { if (r.ok) showAdmin(r); });
    }
    var clearAll = null;
    function showAdmin(r) {
      var g = r.guests || [], yes = g.filter(function (x) { return x.attending; });
      var people = yes.reduce(function (s, x) { return s + (+x.guests || 0); }, 0);
      var stats = App.$('#adminStats'); stats.textContent = '';
      var girls = g.filter(function (x) { return x.guess === 'Niña'; }).length, boys = g.filter(function (x) { return x.guess === 'Niño'; }).length;
      var rows = [[people, T.confirmed, ''], [g.length, T.answers, ''], [g.length - yes.length, T.declined, '']];
      if (girls + boys) rows.push([girls, T.votesGirl || 'Creen niña', 'stat--girl'], [boys, T.votesBoy || 'Creen niño', 'stat--boy']);
      stats.style.gridTemplateColumns = rows.length > 3 ? 'repeat(6, 1fr)' : '';
      rows.forEach(function (s, i) {
        var c = el('div', 'stat ' + s[2]); c.appendChild(el('b', '', s[0])); c.appendChild(el('span', '', s[1]));
        if (rows.length > 3) c.style.gridColumn = i < 3 ? 'span 2' : 'span 3';
        stats.appendChild(c);
      });
      var list = App.$('#adminList'); list.textContent = '';
      if (!g.length) list.appendChild(el('li', 'admin__empty', T.empty));
      g.forEach(function (x) {
        var li = el('li', 'guest' + (x.attending ? '' : ' is-no'));
        var top = el('div', 'guest__top'); top.appendChild(el('span', 'guest__name', x.name));
        top.appendChild(el('span', 'guest__badge', x.attending ? T.yes + ' · ' + x.guests : T.no)); li.appendChild(top);
        if (x.message) li.appendChild(el('p', 'guest__msg', '“' + x.message + '”'));
        var foot = el('div', 'guest__foot'); var meta = el('span', 'guest__meta'); meta.appendChild(el('span', 'guest__date', x.date));
        if (x.guess) meta.appendChild(el('span', 'guest__guess ' + (x.guess === 'Niña' ? 'guest__guess--girl' : 'guest__guess--boy'), (x.guess === 'Niña' ? T.girl : T.boy) || x.guess));
        foot.appendChild(meta);
        foot.appendChild(confirmBtn(T.del || 'Eliminar', function () { return act({ action: 'delete', row: x.row, name: x.name }); }));
        li.appendChild(foot); list.appendChild(li);
      });
      var box = App.$('.admin__actions');
      if (clearAll) clearAll.remove();
      if (g.length) { clearAll = confirmBtn(T.clearAll || 'Vaciar lista', function () { return act({ action: 'clear' }); }); box.insertBefore(clearAll, App.$('#adminExit')); } else clearAll = null;
      admin.hidden = false; admin.scrollTop = 0; document.body.classList.add('is-modal');
      requestAnimationFrame(function () { admin.classList.add('is-on'); });
    }
    App.$('#adminRefresh').addEventListener('click', function () { call(okPin).then(function (r) { if (r.ok) showAdmin(r); }); });
    App.$('#adminExit').addEventListener('click', function () {
      okPin = ''; admin.classList.remove('is-on'); setTimeout(function () { admin.hidden = true; document.body.classList.remove('is-modal'); }, 400);
    });
  });
})();

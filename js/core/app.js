/* ==========================================================================
   App · selección de invitación, tema, textos y utilidades comunes
   ========================================================================== */
(function () {
  var App = { ev: null, slug: null, experiences: [] };

  App.$ = function (sel, root) { return (root || document).querySelector(sel); };
  App.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  App.get = function (path, obj) {
    return String(path).split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, obj || App.ev);
  };

  /** Identifica la invitación: /i/<slug>, ?e=<slug> o la predeterminada */
  App.resolveSlug = function () {
    var events = window.EVENTS || {};
    var m = location.pathname.match(/\/i\/([^\/?#]+)/);
    var q = new URLSearchParams(location.search).get('e');
    var s = (window.__SLUG__ || (m && decodeURIComponent(m[1])) || q || window.DEFAULT_EVENT);
    return events[s] ? s : (window.DEFAULT_EVENT || Object.keys(events)[0]);
  };

  App.applyTheme = function (theme) {
    var map = { ink: '--ink', ink2: '--ink-2', paper: '--paper', paper2: '--paper-2', gold: '--gold', goldLight: '--gold-light', blush: '--blush', seal: '--seal', sealLight: '--seal-light', pink: '--pink', pinkSoft: '--pink-soft', blue: '--blue', blueSoft: '--blue-soft', butter: '--butter' };
    var root = document.documentElement;
    Object.keys(map).forEach(function (k) { if (theme && theme[k]) root.style.setProperty(map[k], theme[k]); });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta && theme && theme.ink) meta.setAttribute('content', theme.ink);
  };

  App.bindText = function (root) {
    App.$$('[data-t]', root).forEach(function (el) {
      var v = App.get(el.getAttribute('data-t'));
      if (v != null) el.textContent = v;
    });
  };

  App.bindImages = function (root) {
    App.$$('[data-img]', root).forEach(function (img) {
      var name = img.getAttribute('data-img');
      var slot = App.ev.photos[name];
      if (!slot) return;
      slot = Object.assign({ key: name }, slot);
      Photos.bind(img, slot, { w: parseInt(img.getAttribute('data-w'), 10) || 1000, alt: slot.alt || '' });
    });
  };

  App.register = function (fn) { App.experiences.push(fn); };

  /** Ejecuta fn solo mientras el elemento está visible (ahorra batería) */
  App.whenVisible = function (el, onChange, threshold) {
    if (!('IntersectionObserver' in window)) { onChange(true); return; }
    new IntersectionObserver(function (es) { onChange(es[0].isIntersecting); }, { threshold: threshold || 0.15 }).observe(el);
  };

  App.reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  App.init = function () {
    App.slug = App.resolveSlug();
    App.ev = window.EVENTS[App.slug];
    var ev = App.ev;
    document.documentElement.lang = ev.lang || 'es';
    if (ev.og && ev.og.title) document.title = ev.og.title;
    App.applyTheme(ev.theme);
    App.bindText();
    App.bindImages();
    var map = App.$('#mapBtn');
    if (map) map.href = ev.location.mapsUrl;
  };

  window.App = App;
})();

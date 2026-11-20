/* Pantalla completa: siempre dentro de un gesto del invitado; nunca muestra errores */
(function () {
  window.Fullscreen = {
    request: function () {
      try {
        var el = document.documentElement;
        var fn = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
        if (!fn) return;
        var r = fn.call(el, { navigationUI: 'hide' });
        if (r && typeof r.catch === 'function') r.catch(function () {});
      } catch (e) { /* el navegador no lo permite: se continúa normalmente */ }
    }
  };
})();

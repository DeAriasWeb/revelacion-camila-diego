/* ==========================================================================
   Photos · resuelve rutas de fotografías, aplica tamaño y respaldo
   ========================================================================== */
(function () {
  var RESPALDOS = 6;

  function hash(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  var Photos = {
    /** URL final de una foto: archivo propio (src) o Unsplash (id) con ancho solicitado */
    url: function (p, w) {
      if (!p) return this.fallback('x');
      if (p.src) return p.src;
      if (p.id) return 'https://images.unsplash.com/photo-' + p.id + '?auto=format&fit=crop&w=' + (w || 1000) + '&q=72';
      return this.fallback(p.key || 'x');
    },

    /** Imagen de respaldo elegante (local) cuando una foto no puede cargarse */
    fallback: function (key) {
      var n = (hash(String(key)) % RESPALDOS) + 1;
      return 'assets/images/respaldo/respaldo-0' + n + '.jpg';
    },

    /** Prepara un <img>: carga diferida, aparición suave y respaldo automático */
    bind: function (img, p, opts) {
      opts = opts || {};
      var key = (p && (p.key || p.id || p.src)) || 'x';
      var tried = false;
      if (opts.eager) { img.loading = 'eager'; }
      else if (!img.hasAttribute('fetchpriority')) { img.loading = 'lazy'; }
      img.decoding = 'async';
      img.alt = opts.alt != null ? opts.alt : (p && p.alt) || '';
      img.addEventListener('load', function () { img.classList.add('is-loaded'); });
      img.addEventListener('error', function () {
        if (tried) { img.classList.add('is-loaded'); return; }
        tried = true;
        img.src = Photos.fallback(key);
      });
      // Seguridad: si algo se retrasa, nunca dejamos la foto invisible
      setTimeout(function () { img.classList.add('is-loaded'); }, 7000);
      img.src = this.url(p, opts.w);
      return img;
    },

    /** Crea un <img> listo para insertar */
    make: function (p, opts) {
      return this.bind(document.createElement('img'), p, opts);
    },

    /** Carga una foto y devuelve (promesa) la URL que realmente funcionó */
    load: function (p, w) {
      var key = (p && (p.key || p.id || p.src)) || 'x';
      return new Promise(function (resolve) {
        var im = new Image();
        im.onload = function () { resolve(im.src); };
        im.onerror = function () {
          var fb = new Image();
          fb.onload = function () { resolve(fb.src); };
          fb.onerror = function () { resolve(Photos.fallback(key)); };
          fb.src = Photos.fallback(key);
        };
        im.src = Photos.url(p, w);
      });
    }
  };

  window.Photos = Photos;
})();

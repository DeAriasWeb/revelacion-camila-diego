/* Aparición suave de elementos al hacer scroll */
(function () {
  window.Reveal = {
    init: function () {
      var els = App.$$('.reveal');
      if (!('IntersectionObserver' in window) || App.reduceMotion) { els.forEach(function (e) { e.classList.add('in'); }); return; }
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
      els.forEach(function (e, i) { e.style.transitionDelay = ''; io.observe(e); });
    }
  };
})();

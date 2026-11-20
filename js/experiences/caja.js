/* Caja sorpresa final: se abre la tapa y aparece el mensaje. */
(function () {
  App.register(function (ev) {
    var gift = App.$('#gift'), hint = App.$('#giftHint'); if (!gift) return;
    var T = ev.texts;
    gift.addEventListener('click', function () {
      var on = gift.classList.toggle('is-open'); gift.setAttribute('aria-expanded', String(on));
      if (hint) hint.querySelector('span').textContent = on ? T.boxClose : T.boxHint;
      if (on) { var r = gift.getBoundingClientRect(); Confetti.both(r.left + r.width / 2, r.top + r.height * .35, Confetti.colors.mix); }
    });
  });
})();

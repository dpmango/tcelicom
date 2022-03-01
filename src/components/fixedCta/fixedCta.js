//////////
// FIXED CTA
//////////
(function ($, APP) {
  APP.Components.FixedCta = {
    init: function (fromPjax) {
      this.eventListeners();

      if (!fromPjax) {
        this.listenScroll();
      }
    },

    eventListeners: function () {
      var _this = this;

      _document.on('click', '.js-page-up', function () {
        TweenLite.to(window, 0.3, {
          scrollTo: { y: 0, autoKill: false },
        });
      });
    },
    listenScroll: function () {
      _window.on('scroll', throttle(this.animateOnScroll.bind(this), 250));
    },
    animateOnScroll: function () {
      // get scroll params from blocker function
      var scroll = APP.Plugins.ScrollBlock.getData();
      if (scroll.blocked) return;

      var $container = $('.js-fixedCta');
      if (scroll.y > 100) {
        $container.addClass('is-visible');
        if (scroll.y > 500) {
          $container.addClass('is-top-visible');
        } else {
          $container.removeClass('is-top-visible');
        }
      } else {
        $container.removeClass('is-visible');
      }
      //
    },
  };
})(jQuery, window.APP);

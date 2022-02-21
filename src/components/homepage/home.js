//////////
// QUEST
//////////
(function ($, APP) {
  APP.Components.Home = {
    init: function (fromPjax) {
      this.homeScrollListener();
    },

    homeScrollListener: function () {


      function throttle (callee, timeout) {
        let timer = null;
        return function perform(...args) {
          if (timer) return;

          timer = setTimeout(() => {
            callee(...args);
            clearTimeout(timer);
            timer = null;
          }, timeout);
        };
      }

      const scrollListener = throttle(scroll, 50)

      function scroll() {
        const pageHeight = $('body').innerHeight()
        const sectionHeight = pageHeight / 5


        const el = Math.round($(window).scrollTop() / sectionHeight)
        console.log(el);
        $(`.home__screen:eq(${el})`).addClass('is-active')

      }

      $(window).on('scroll', scrollListener)

    },
  };
})(jQuery, window.APP);

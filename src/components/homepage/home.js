//////////
// HOME
//////////
(function ($, APP) {
  APP.Components.Home = {
    data: {
      parallaxInstances: [],
      container: null,
      pageHeight: 0,
      sectionHeight: 0,
      sections: [],
    },
    init: function (fromPjax) {
      this.getData();
      this.initParallax();
      if (!fromPjax) {
        this.listenScroll();
        this.listenResize();
      }
    },
    initParallax: function () {
      const $elements = $('.js-parallax-scene');
      if ($elements.length === 0) return;

      this.data.parallaxInstances = [];
      let instnces = [];

      $elements.each((i, el) => {
        const inst = new Parallax(el, {
          relativeInput: true,
        });

        instnces.push(inst);
      });

      this.data.parallaxInstances = instnces;
    },
    eventListeners: function () {},
    getData: function () {
      const $container = $('.js-home-animation');
      if ($container.length === 0) return;

      const $sections = $container.find('.js-home-section');

      this.data.sections = [];
      const pageHeight = $container.innerHeight();
      const sectionsCount = $sections.length;
      const sectionHeight = pageHeight / sectionsCount;

      $sections.each((idx, section) => {
        const $section = $(section);

        this.data.sections.push({
          $el: $section,
          top: Math.floor(sectionHeight * idx),
          bottom: Math.floor(sectionHeight * (idx + 1)),
        });
      });

      this.data.container = $container;
      this.data.pageHeight = pageHeight;
      this.data.sectionHeight = sectionHeight;

      this.handleScroll();
    },
    listenScroll: function () {
      _window.on('scroll', throttle(this.handleScroll.bind(this), 100));
    },
    listenResize: function () {
      _window.on('resize', debounce(this.getData.bind(this), 100));
    },
    handleScroll: function () {
      const scrollY = _window.scrollTop();
      const scrollYBottom = scrollY + _window.height();
      const scrollTrigger = Math.round(scrollYBottom - this.data.sectionHeight / 1.3);

      if (this.data.sections && this.data.sections.length === 0) return;

      $.each(this.data.sections, (idx, section) => {
        if (scrollTrigger >= section.top && scrollTrigger <= section.bottom) {
          section.$el.addClass('is-active');
        } else {
          section.$el.removeClass('is-active');
        }
      });
    },
  };
})(jQuery, window.APP);

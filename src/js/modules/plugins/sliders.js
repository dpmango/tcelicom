//////////
// SLIDERS
//////////
(function ($, APP) {
  APP.Plugins.Sliders = {
    data: {
      swipers: {
        hero: undefined,
        team: undefined,
      },
    },
    init: function (fromPjax) {
      this.initSwipers();

      // if (!fromPjax) {
      //   this.listenResize();
      // }
    },
    initSwipers: function () {
      var _this = this;

      // hero
      this.data.swipers.hero = _this.utils.buildSwiper(
        'hero',
        {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 200,
          on: {
            slideChange: function (swiper) {
              // $('.js-hero-background [data-slide-id]').removeClass('is-active');
              // $('.js-hero-background')
              //   .find('[data-slide-id="' + (swiper.realIndex + 1) + '"]')
              //   .addClass('is-active');
            },
          },
        },
        { pagination: true }
      );
      // Team
      this.data.swipers.hero = _this.utils.buildSwiper(
        'team',
        {
          loop: true,
          slidesPerView: 1,
          // spaceBetween: 200,
          on: {
            slideChange: function (swiper) {
              console.log($('.js-team-background').addClass(swiper.realIndex,'is-acttive'));
              $('.js-team-background[data-slide-id]').removeClass('is-active');
              $('.js-team-background').addClass(function( index ) {
                let addedClass;
                if (  swiper.realIndex === index ) {
                  addedClass = 'is-active';
                }
                return addedClass;
              })
              // .find('[data-slide-id="' + (swiper.realIndex + 1) + '"]')
            },
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
          },
          navigation: {
            nextEl: '.swiper-nav-next',
            prevEl: '.swiper-nav-prev',
          },
        }
      );
    },
    // utils
    utils: {
      // builder helpers
      buildProps: function (name, options, $dom) {
        const defaultProps = {
          watchOverflow: true,
          setWrapperSize: false,
          slidesPerView: 'auto',
          normalizeSlideIndex: true,
          slideToClickedSlide: true,
          touchEventsTarget: 'wrapper',
          threshold: 10,
        };

        // optional props
        let oProps = {};
        if (options && options.pagination) {
          oProps = {
            pagination: {
              el: `.swiper-${name}-pagination`,
              type: 'bullets',
              clickable: true,
            },
          };
        }

        if (options && options.navigation) {
          oProps = {
            ...oProps,
            navigation: {
              nextEl: `.swiper-${name}-next`,
              prevEl: `.swiper-${name}-prev`,
            },
          };
        }

        // build props from data-
        let domProps = {};
        const dataBefore = $dom.data('offset-before');
        const dataAfter = $dom.data('offset-after');
        const dataSpaceBetween = $dom.data('space-between');

        if (dataBefore) {
          domProps = {
            slidesOffsetBefore: dataBefore,
          };
        }
        if (dataAfter) {
          domProps = {
            ...domProps,
            slidesOffsetAfter: dataAfter,
          };
        }
        if (dataSpaceBetween) {
          domProps = {
            spaceBetween: dataSpaceBetween,
          };
        }

        return {
          ...defaultProps,
          ...oProps,
          ...domProps,
        };
      },
      buildSwiper: function (name, eProps, options) {
        const $page = $('.page').last();
        const $dom = $page.find(`.js-swiper-${name}`);

        if ($dom.length === 0) return;

        let props = APP.Plugins.Sliders.utils.buildProps(name, options, $dom);
        let swiper = new Swiper(`.js-swiper-${name}:not(.swiper-container-initialized)`, {
          ...props,
          ...eProps,
        });
        return swiper;
      },
    },
    update: function (selector) {
      var $swiper;
      // if selector passed - update only with selector
      if (selector) {
        $swiper = $(`${selector}.swiper-container-initialized`);
      } else {
        $swiper = $('.swiper-container-initialized');
      }

      if ($swiper.length > 0) {
        $swiper.each(function (i, swiper) {
          // $(swiper)[0].swiper.updateSize();
          $(swiper)[0].swiper.update();
        });
      }
    },
    // listenResize: function () {
    //   _window.on('resize', debounce(this.initResponsiveSwipers.bind(this), 200));
    // },
  };
})(jQuery, window.APP);

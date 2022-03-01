//////////
// QUEST
//////////
(function ($, APP) {
  APP.Components.Quest = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.questionsClickListener();
      }
    },
    questionsClickListener: function () {
      _document.on('click', '.quest__item', function () {
        $(this).siblings().removeClass('is-active');
        $(this).toggleClass('is-active');
        let index = $(this).closest('.quest__item').index('.quest__item');
        for (let i = 0; i < 8; i++) {
          if (i !== index) {
            $(`.quest__item:eq(${i})`).removeClass('is-open');
            $(`.quest__item-text:eq(${i})`).slideUp(250);
          }
        }
        $(`.quest__item:eq(${index})`).toggleClass('is-open');
        $(`.quest__item-text:eq(${index})`).slideToggle(250);
      });
    },
  };
})(jQuery, window.APP);

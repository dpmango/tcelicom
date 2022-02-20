//////////
// Input
//////////
(function ($, APP) {
  APP.Plugins.Input = {
    init: function () {
      $('.ui-input-plus > .ui-input').on('focusout', function() {
        if(this.value) {
          $(this).addClass('has-value')
        } else {
          $(this).removeClass('has-value')
        }
      })
    },
  };
})(jQuery, window.APP);

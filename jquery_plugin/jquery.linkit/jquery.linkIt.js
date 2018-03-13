// Name: LinkIt
// Author: Brad Traversy (Cathleen Wright via Udemy)
// Version: 0.1.0
// License: MIT

(function($) {
  $.fn.linkIt = function(options) {
    //Default Settings
    var settings = $.extend({
      href: null,
      text: null,
      target: '_self'
    }, options);

    //Validation
    if(settings.href == null){
      console.log('An href option is needed for LinkIt to work');
      return this;
    }
    return this.each(function() {
      var object = $(this);
      if(settings.text == null) {
        settings.text = object.text();
      }
      //Programming
      object.wrap('<a target=' + settings.target + ' href=' + settings.href + '></a>').text(settings.text);
    });
  };
}(jQuery));

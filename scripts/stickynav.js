(function(module){
  var sticky = {};

  var scroll = $(window).scrollTop();

  sticky.stickToDoc = function (){
    var $stickyHeader = $('header');
    console.log('here');
    $(window).on('scroll', function(){
      console.log('here here');
      $stickyHeader.addClass('.sticky');
    })
  }
  sticky.stickToDoc();
  module.sticky = sticky;
})(window);

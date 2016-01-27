(function(module){
  var pageView = {};

  pageView.initPage = function(activePage){
    $('nav').show();
    $('#' + activePage).show().siblings().hide();
    $('.icon-menu3').click(function(e){
      $('#menu li').toggle();
    })
  };

  module.pageView = pageView;
}(window));

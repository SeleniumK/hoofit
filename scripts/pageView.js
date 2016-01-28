(function(module){
  var pageView = {};

  pageView.initPage = function(activePage){
    $('nav').show();
    $('#' + activePage).show().siblings().hide();
    $('.icon-menu').click(function(e){
      $('#menu li').toggle();
    })
  };

  module.pageView = pageView;
}(window));

(function(module){
  var pageView = {};

  pageView.initPage = function(activePage){
    $('header h3').show();
    $('nav').show();
    $('#' + activePage).show().siblings().hide();
  };

  module.pageView = pageView;
}(window));

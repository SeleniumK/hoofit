(function(module){
  var pageView = {};

  pageView.initPage = function(activePage){
    $('nav').show();
    $('#' + activePage).show().siblings().hide();
  };

  module.pageView = pageView;
}(window));

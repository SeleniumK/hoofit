(function(module){
  var pageView = {};

  pageView.initPage = function(activePage){
    $('header').show();
    $('#' + activePage).show().siblings().hide();
  };

  module.pageView = pageView;
}(window));

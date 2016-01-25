(function(module){
  var pageView = {};

  pageView.initPage = function(activePage){
    $('#' + activePage).show().siblings().hide();
  };

  module.pageView = pageView;
}(window));

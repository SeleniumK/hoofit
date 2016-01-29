(function(module){
  var pageController = {};

  pageController.index = function(activePage){
    pageView.initPage(activePage);
  };

  module.pageController = pageController;
}(window));

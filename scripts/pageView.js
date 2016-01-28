(function(module){

  var pageView = {};

  pageView.hamburgerClick = function(){
    var hamIcon = $('.icon-menu3');
    hamIcon.click(function(e){
      $('#menu li').toggle();
    });
  };

  pageView.highlightTab = function(){
    var tab = $('#menu a');
    tab.click(function(e){
      tab.removeClass('currentpage');
      $(this).addClass('currentpage');
    });
  };

  pageView.viewSection = function(activePage){
    $('nav').show();
    $('#' + activePage).show().siblings().hide();
  };

  pageView.initPage = function(activePage){
    pageView.viewSection(activePage);
    pageView.hamburgerClick();
    pageView.highlightTab();
  };

  module.pageView = pageView;
}(window));

(function(module){
  var pageView = {};

  pageView.clickEvents = function(){
    var tab = $('#menu a');
    $('.icon-menu3').click(function(e){
      $('#menu li').toggle();
    });
    tab.click(function(e){
      tab.removeClass('currentpage');
      $(this).addClass('currentpage');
    });
  };

  pageView.initPage = function(activePage){
    $('nav').show();
    $('#' + activePage).show().siblings().hide();
    pageView.clickEvents();
  };

  module.pageView = pageView;
}(window));

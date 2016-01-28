(function(module){
  var pageView = {};
  pageView.clickEvents = function(){
    $('.icon-menu3').click(function(e){
      $('#menu li').toggle();
    });
    $('#menu a').click(function(e){
      $('#menu a').removeClass('currentpage');
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

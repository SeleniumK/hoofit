(function(module){
  var pageView = {};

  pageView.initPage = function(activePage){
    $('nav').show();
    $('#' + activePage).show().siblings().hide();
    $('.icon-menu3').click(function(e){
      $('#menu li').toggle();
    })
    pageView.showMarkers();
  };

  pageView.showMarkers = function(){
    $('#routes a').on('click', function(e){
      e.preventDefault();
      Marker.fetchAccessibleSignals(Marker.setMarkers);
    });
  };

  module.pageView = pageView;
}(window));

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
    $('.icon-menu').click(function(e){
      $('#menu li').toggle();
    })
  };

  pageView.showMarkers = function(){
    $('#routes a').on('click', function(e){
      e.preventDefault();
      Marker.fetchAccessibleSignals(Marker.setMarkers);
    });
  };

  pageView.displayWarning = function(warnArray){
    warnArray.forEach(function(warn, i){
      var j = i+1;
      if(warn.length > 0){
        $('#routeAlerts').append('There are missing sidewalks near step ' + j + ' of the route. Excersice caution.');
      }
    });
  };

  pageView.initPage = function(activePage){
    pageView.viewSection(activePage);
    pageView.hamburgerClick();
    pageView.highlightTab();
    pageView.showMarkers();
  };

  module.pageView = pageView;
}(window));

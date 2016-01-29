(function(module){

  var pageView = {};

  var render = function(template){
    return Handlebars.compile(template.text())
  };

  pageView.appendResults = function(results, temp, domEl){
    var template = render(temp);
    domEl.append(results.map(function(r){
      return template(r);
    }));
  };

  pageView.hamburgerClick = function(){
    var hamIcon = $('.icon-menu');
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

  pageView.showMarkers = function(){
    $('#routes a').on('click', function(e){
      e.preventDefault();
      Marker.fetchAccessibleSignals(Marker.setMarkers);
    });
  };

  pageView.displayWarning = function(warnArray){
<<<<<<< HEAD
    var template = render($('#warn-template'));
=======
    var $routeAlerts = $('#routeAlerts');
    $routeAlerts.empty();
>>>>>>> 948d2e86902244dcf4e1095c03bf7c41a6c162c2
    warnArray.forEach(function(warn, i){
      if(warn.length > 0){
<<<<<<< HEAD
        $('.adp-directions data-step-index['+ i +']').append(template());
=======
        $routeAlerts.append('There are missing sidewalks near step ' + j + ' of the route. Exercise caution.');
>>>>>>> 948d2e86902244dcf4e1095c03bf7c41a6c162c2
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

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
    var template = render($('#warn-template'));
    warnArray.forEach(function(warn, i){
      if(warn.length > 0){
        $('.adp-directions data-step-index['+ i +']').append(template());
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

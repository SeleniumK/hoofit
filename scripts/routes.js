page.base('/');

page('', landing);
page('es', landing);
page('(es/)?:id', function(ctx){
  var activePage = ctx.params.id;
  pageController.index(activePage);
});

function landing(){
  $('#home').show().siblings().hide();
  $('nav').hide();
}

function googleCall(){
  map.initMap();
  dest.initPage();
  $('#loading').hide();
}

page();

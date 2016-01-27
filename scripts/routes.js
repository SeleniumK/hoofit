page.base('/');

page('', landing);
page(':id', function(ctx){
  var activePage = ctx.params.id;
  pageController.index(activePage);
});

function landing(){
  $('#home').show().siblings().hide();
  $('header').hide();
}

function googleCall(){
  map.initMap();
  destInfo.initPage();
}

page();

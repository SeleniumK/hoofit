page.base('/');

page('', landing);
page(':id', function(ctx){
  var activePage = ctx.params.id;
  pageController.index(activePage);
});

function landing(){
  $('#home').show().siblings().hide();
  $('header h3').hide();
  $('nav').hide();
}

page();

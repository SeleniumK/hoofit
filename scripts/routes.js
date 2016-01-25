page.base('/');

page(':id', function(ctx){
  var activePage = ctx.params.id;
  pageController.index(activePage);
});

page();

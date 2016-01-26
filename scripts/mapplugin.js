(function(module){
  var DirectionsService = {};
  DirectionsService.route = function (callback){
  var userStart = document.getElementById('startpoint').value;
  var userEnd = document.getElementById('endpoint').value;
  console.log(userStart);
  console.log(userEnd);
  };

  module.DirectionsService = DirectionsService;
})(window);

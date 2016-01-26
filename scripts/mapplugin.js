(function(module){
  var DirectionsService = {};
  DirectionsService.route = function (callback){
    var submitButton = document.getElementById('submitinfo');
    submitButton.addEventListener('click', function(event){
      event.preventDefault();
      var userStart = document.getElementById('startpoint').value;
      var userEnd = document.getElementById('endpoint').value;
      console.log(userStart);
      console.log(userEnd);
    })
  };
  DirectionsService.route();
  module.DirectionsService = DirectionsService;
})(window);

(function(module){
  //DirectionsService object
  var DirectionsService = {};

  DirectionsService.route = function (callback){
    //submit button with click eventlistener
    var submitButton = document.getElementById('submitinfo');
    submitButton.addEventListener('click', function(event){
      event.preventDefault();

      //user request object
      var request = {
        origin: '',
        destination: '',
        travelMode: ''
      }
      //grabing user input and pushing data to request object (to line 10-14)
      request.origin = document.getElementById('startpoint').value;
      request.destination = document.getElementById('endpoint').value;
      request.travelMode = 'walking';
      console.log(request);
      var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
      });
      var directionsService = new google.maps.DirectionsService();
      directionsService.route(request, function(response, status){
        if(status == google.maps.DirectionStatus.OK){
          directionsDisplay.setDirections(response);
        }
      });
    })
  };
  //just for now twsting purpose
  DirectionsService.route();

  //module
  module.DirectionsService = DirectionsService;
})(window);

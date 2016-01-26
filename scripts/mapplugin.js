(function(module){
  //DirectionsService object
  var DirectionsService = {};

  DirectionsService.route = function (){
    //submit button with click eventlistener
    var submitButton = document.getElementById('submitinfo');
    var gmapUrl = document.getElementById('gmapUrl');
    submitButton.addEventListener('click', function(event){
      event.preventDefault();

      //user request object
      var request = {
        origin: '',
        destination: '',
        travelMode: ''
      };
      //grabing user input and pushing data to request object (to line 10-14)
      request.origin = document.getElementById('startpoint').value;
      request.destination = document.getElementById('endpoint').value;
      request.travelMode = 'walking';
      console.log(request);

      $.ajax({
        url: '"https://maps.googleapis.com/maps/api/directions/json?origin=' + request.origin + '&destination=' + request.destination + '&mode=walking&key=AIzaSyDVQphyrzeP4Ban8JSt8RY4NpZzKUwJ01I"',
        type: 'GET',
        success: function(data, message, xhr){
          console.log(xhr);
          console.log(message);
          console.log(data);
          console.log(url);
        }
      });//end of ajax call
      //replacing initializing gmap url in index.htlm to new url with directions
      // gmapUrl.src = '"https://maps.googleapis.com/maps/api/directions/json?origin=' + request.origin + '&destination=' + request.destination + '&avoid=highways&mode=walking&key=AIzaSyDVQphyrzeP4Ban8JSt8RY4NpZzKUwJ01I"';
      // var directionsDisplay = new google.maps.DirectionsRenderer({
      //   map: map
      // });
      // var directionsService = new google.maps.DirectionsService();
      // directionsService.route(request, function(response, status){
      //   if(status == google.maps.DirectionStatus.OK){
      //     directionsDisplay.setDirections(response);
      //   }
      // });
    }); //closing of eventlistener
  };
  //just for now twsting purpose
  DirectionsService.route();

  //module
  module.DirectionsService = DirectionsService;
})(window);

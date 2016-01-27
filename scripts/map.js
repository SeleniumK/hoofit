(function(module){
  var map = {};
  var GmapDirections = {};
  var submitButton = document.getElementById('submitinfo');
  var gmapUrl = document.getElementById('gmapUrl');

  map.gMap = {};

  map.initMap = function (){
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 12,
      center: {lat: 47.6097, lng: -122.3331}
    });
    directionsDisplay.setMap(map);
    
    var onClickHandler = function(){
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };//end of onchange handler
    submitButton.addEventListener('click',onClickHandler);
  };

  function calculateAndDisplayRoute(directionsService, directionsDisplay){
    directionsService.route({
      origin: document.getElementById('startpoint').value,
      destination: document.getElementById('endpoint').value,
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status){
      if(status === google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  };

  module.map = map;
  module.GmapDirections = GmapDirections;

})(window);

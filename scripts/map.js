(function(module){
  var map = {};
  var GmapDirections = {};
  var submitButton = document.getElementById('submitinfo');
  var gmapUrl = document.getElementById('gmapUrl');

  map.gMap = {};

  map.initMap = function (){
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map.gMap = new google.maps.Map(document.getElementById('map'),{
      zoom: 12,
      center: {lat: 47.6097, lng: -122.3331}
    });

    directionsDisplay.setMap(map.gMap);

    var onClickHandler = function(){
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };//end of onchange handler
    submitButton.addEventListener('click',onClickHandler);

    //fetch the missing sidewalks data
    Sidewalk.fetchMissingSidewalks(map.drawSidewalks);
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

  map.drawSidewalks = function(){
    Sidewalk.missing.forEach(function(sw){
      map.drawLine(sw.paths);
    });
  };

  map.drawLine = function(points){
    line = new google.maps.Polyline({
      path: points,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 5
    });

    line.setMap(map.gMap);
  };

  module.map = map;
  module.GmapDirections = GmapDirections;

})(window);

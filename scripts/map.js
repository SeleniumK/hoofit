(function(module){
  var map = {};
  var GmapDirections = {};
  var submitButton = document.getElementById('submitinfo');
  var gmapUrl = document.getElementById('gmapUrl');

  map.gMap = {};

  map.calculateAndDisplayRoute = function(directionsService, directionsDisplay){
    directionsService.route(
      {
        origin: document.getElementById('startpoint').value,
        destination: document.getElementById('endpoint').value,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true
      },
      function(response, status){
        if(status === google.maps.DirectionsStatus.OK){
          directionsDisplay.setDirections(response);
          map.checkAllSteps(response);
          elevation.getRouteElevations(response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
  };

  map.initMap = function (){
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map.gMap = new google.maps.Map(document.getElementById('map'),{
      zoom: 14,
      center: {lat: 47.6097, lng: -122.3331}
    });

    directionsDisplay.setMap(map.gMap);
    elevation.initElevator();
    $('#maploading').hide();

    var directionClick = function(){
      map.calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    submitButton.addEventListener('click', directionClick);
    Sidewalk.fetchMissingSidewalks(map.drawSidewalks);
    Marker.fetchAccessibleSignals();
  };

  map.resizeMap = function(){
    google.maps.event.trigger(map.gMap, 'resize');
  };

  //Math to calculate if a given point (C, the start point of the missing sidewalk or signal) is on the line AB (the Google route step)
  map.checkPoint = function(ax, ay, bx, by, cx, cy){
      var pointOnLine = false;
        // ax = step.start_point.lat(),
        // ay = step.start_point.lng(),
        // bx = step.end_point.lat(),
        // by = step.end_point.lng(),
        // cx = sidewalk.latlng.lat,
        // cy = sidewalk.latlng.lng;

      var theta1 = Math.atan2((by - ay), (bx - ax));
      var theta2 = Math.atan2((cy - ay), (cx - ax));

      var abs = Math.abs((theta2 - theta1));
      var threshold = Math.PI/10;

      var acLength = Math.pow((cx - ax), 2) + Math.pow((cy - ay), 2);
      var abLength = Math.pow((bx - ax), 2) + Math.pow((by - ay), 2);

      if(abs < threshold ||
         ((abs + 2*Math.PI) < threshold) ||
         (Math.abs(abs - 2*Math.PI) < threshold)){
        if(acLength < abLength){
          return pointOnLine = true;
        }
      }
    }

  //Refactor to add in accessible signals: carve out the middle into a new function we can call with a, b, and c as arguments?
  map.checkStepSidewalks = function(step){
    var missing = Sidewalk.missing.filter(function(sidewalk){
     return map.checkPoint(step.start_point.lat(), step.start_point.lng(),
                     step.end_point.lat(), step.end_point.lng(),
                     sidewalk.latlng.lat, sidewalk.latlng.lng);
  });
    //using a ternary operator to return true or false based on if the calculated array has items in it
    return missing.length > 0 ? true : false;
  };

  map.checkAccessibleMarkers = function(step){
    var markArray = Marker.all.filter(function(mark){
      return map.checkPoint(step.start_point.lat(), step.start_point.lng(),
                     step.end_point.lat(), step.end_point.lng(),
                     mark.position.lat(), mark.position.lng());
    });
    return markArray;
  };

  map.checkAllSteps = function(response){
    var steps = response.routes[0].legs[0].steps;
    var renderArray = [];

    steps.forEach(function(step, i){
      renderArray.push({
        stepNo: i+1,
        isMissingSidewalk: map.checkStepSidewalks(step),
        isMarker: map.checkAccessibleMarkers(step),
        instruction: step.instructions
      });
      //load in accessible signals as well
    });
    //display the warnings and instructions
    pageView.displayWarning(renderArray);
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

(function(module){
  var map = {};
  var GmapDirections = {};
  var submitButton = document.getElementById('submitinfo');
  var gmapUrl = document.getElementById('gmapUrl');

  map.gMap = {};

  map.calculateAndDisplayRoute = function(directionsService, directionsDisplay){
    directionsService.route({
      origin: document.getElementById('startpoint').value,
      destination: document.getElementById('endpoint').value,
      travelMode: google.maps.TravelMode.WALKING,
      provideRouteAlternatives: true
    }, function(response, status){
      if(status === google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);
        map.testSteps(response);
      } else {
        window.alert('Directions request failed due to ' + status);
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
    directionsDisplay.setPanel(document.getElementById('writtenDirections'));
    $('#maploading').hide();

    var directionClick = function(){
      map.calculateAndDisplayRoute(directionsService, directionsDisplay);
    };//end of onchange handler

    submitButton.addEventListener('click', directionClick);
    //fetch the missing sidewalks data
    Sidewalk.fetchMissingSidewalks(map.drawSidewalks);
  };


  map.testSteps = function(response){
    var steps = response.routes[0].legs[0].steps;

    function checkStep(step){
    //need step and sidewalk
      return Sidewalk.missing.filter(function(sidewalk){
        var missingSidewalk = false,
          ax = step.start_point.lat(),
          ay = step.start_point.lng(),
          bx = step.end_point.lat(),
          by = step.end_point.lng(),
          cx = sidewalk.latlng.lat,
          cy = sidewalk.latlng.lng;

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
            return missingSidewalk = true;
          }
        }
      });
    }


    var checkAllSteps = function(){
      var filteredArray = [];

      steps.forEach(function(step){
        filteredArray.push(checkStep(step));
      });

      pageView.displayWarning(filteredArray);
    };

    checkAllSteps();

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

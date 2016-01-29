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
      zoom: 14,
      center: {lat: 47.6097, lng: -122.3331}
    });

    directionsDisplay.setMap(map.gMap);
    directionsDisplay.setPanel(document.getElementById('writtenDirections'));
    $('#maploading').hide();

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
      travelMode: google.maps.TravelMode.WALKING,
      provideRouteAlternatives: true
    }, function(response, status){
      if(status === google.maps.DirectionsStatus.OK){
        //if there are any warnings from Google, put them in the warning box
        var warn = document.getElementById('warnings');
        warn.innerHTML = '' + response.routes[0].warnings + '';

        //response object notes:
        //routes are the main object. We may get more than one of these and have to process them
        //legs are seperate chunks. I think it only matters with paypoints
        //steps are what we are probably going to care about, those are the single instructions (turn left and go .5 miles)
        //response.routes[0].legs[0].steps[0] is the first route, the first leg, the first step.
        directionsDisplay.setDirections(response);
        //test the steps
        map.testSteps(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  };

  //test each step of the route to find out if there are missing sidewalks near there
  map.testSteps = function(response){
    var steps = response.routes[0].legs[0].steps;

    //MATH
    //Basically, we find out if the start point of the missing sidewalks is near the line formed by the start and end points
    function checkStep(step){
      return Sidewalk.missing.filter(function(sidewalk){
        var missingSidewalk = false,
          ax = step.start_point.lat(),
          ay = step.start_point.lng(),
          bx = step.end_point.lat(),
          by = step.end_point.lng(),
          cx = sidewalk.latlng.lat,
          cy = sidewalk.latlng.lng;

        var theta1 = Math.atan2((by - ay), (bx - ax));
        theta2 = Math.atan2((cy - ay), (cx - ax));

        var abs = Math.abs((theta2 - theta1)),
          threshold = Math.PI/30;

        var acLength = Math.pow((cx - ax), 2) + Math.pow((cy - ay), 2),
          abLength = Math.pow((bx - ax), 2) + Math.pow((by - ay), 2);

        if(abs < threshold ||
         ((abs + 2*Math.PI) < threshold) ||
         (Math.abs(abs - 2*Math.PI) < threshold)){
          if(acLength < abLength){
            return missingSidewalk = true;
          }
        }
      });
    }

    //check each step of the route
    var checkAllSteps = function(){
      var filteredArray = [];

      steps.forEach(function(step){
        //we want an array of arrays we can loop over later
        filteredArray.push(checkStep(step));
        //render instructions in here, along with warnings? No need for filteredArray
      });

      //display the warnings and instructions
      pageView.displayWarning(filteredArray);
    };

    //call the functions
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

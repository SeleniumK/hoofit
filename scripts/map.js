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
        var warn = document.getElementById("warnings");
        warn.innerHTML = "" + response.routes[0].warnings + "";

        //response object notes:
        //routes are the main object. We may get more than one of these and have to process them
        //legs are seperate chunks. I think it only matters with paypoints
        //steps are what we are probably going to care about, those are the single instructions (turn left and go .5 miles)
        //response.routes[0].legs[0].steps[0] is the first route, the first leg, the first step.
        directionsDisplay.setDirections(response);
        map.testSteps(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  };

  map.testSteps = function(response){
    var steps = response.routes[0].legs[0].steps;
    //start_point.lat(), start_point.lng()
    //find if missing sidewalk start is between start_point and end_point for each step of the trip
    var stepArray = [];
    var isMissing = false;
    var sideLat, sideLng;

    var makeSteps = function(direction){
      //only tests on lat
      return steps.map(function(step){
        dircTestStart = step.start_point[direction];
        direcTestEnd = step.end_point[direction];

        var max = Math.max(dircTestStart(), direcTestEnd());
        var min = Math.min(dircTestStart(), direcTestEnd());

        return [max, min];
      });
    };

    var stepFilter = function(direction){
      //return true if overlaps missing sidewalk
      stepArray = makeSteps(direction);

      var k = Sidewalk.missing.filter(function(sidewalk){
        var latlng = sidewalk.latlng[direction];
        var l = stepArray[0] > latlng || stepArray[1] < latlng;
        console.log(l);
        return l;
      });

      return k;

      // var i, sideLength = Sidewalk.missing.length;
      // for(i=0; i<sideLength;i++){
      //   var latlng = Sidewalk.missing[i].latlng[direction];
      //    if(step[0] > latlng || step[1] < latlng){
      //      isMissing = true;
      //      break;
      //    };
      // }
    };

    function checkStep(direction){

      var returnArray = [];

     returnArray = stepFilter('lat').filter(function(filterArray){
       stepFilter( 'lng');
     });
        // if(isMissing) break;

      return returnArray;
  }



  var checkAllSteps = function(){
    var isMissingArray = checkStep('lat');
    console.log(isMissingArray);
    // stepArray = makeSteps('lng');
    // if(isMissing) checkStep('lng');
    // console.log(isMissing);
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

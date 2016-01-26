(function(module){
  var elevation = {};
  var elevator;

  //get the elevator, call whatever we need to call with it
  elevation.initElevator = function(callback){
    elevator = new google.maps.ElevationService;
  };

  elevation.getPointElevation = function(point){
    elevator.getElevationForLocations({'locations': [point]}, function(results, status){
      //check if the request returned
      if (status === google.maps.ElevationStatus.OK){
        //check if we have results
        if(results[0]){
          //if all that, then do...stuff.
          console.log(results);
        }else{
          console.log('No elevations found. Possibly you are on the moon.');
        }
      }else{
        console.log('Elevation service fail. Blame Google.');
      }
    });
  };

  module.elevation = elevation;
})(window);

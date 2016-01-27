(function(module){
  var elevation = {};
  var elevator;

  //get the elevator, call whatever we need to call with it
  elevation.initElevator = function(callback){
    elevator = new google.maps.ElevationService;
  };

  elevation.getPointElevation = function(point){
    elevator.getElevationForLocations({'locations': [point]},
      function(results, status){
         //check if the request returned
         if (status === google.maps.ElevationStatus.OK){
           //check if we have results
           if(results[0]){
             //if all that, then do...stuff.
             //Okay. This should return, but does not. So instead we set a global variable and have to read that after each return
             elevation.result = results[0].elevation;
           }else{
             console.log('No elevations found. Possibly you are on the moon.');
           }
         }else{
           console.log('Elevation service fail. Blame Google.');
         }
       });
     };

  //get the difference between two points
  elevation.getDifference = function(point1, point2){
    return  point1 - point2;
  };

  module.elevation = elevation;
})(window);

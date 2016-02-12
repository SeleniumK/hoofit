(function(module){
  var elevation = {};
  var elevator;
  elevation.result = [];

  //get the elevator, call whatever we need to call with it
  elevation.initElevator = function(callback){
    elevator = new google.maps.ElevationService;
  };

  elevation.getStepElevations = function(step){

    elevation.getPointElevation(step);

    // points.map(function(point){
    //   point.forEach(function(pntPart, steps){
    //     elevation.getPointElevation(pntPart);
    //   })
    // });   
  };

   elevation.getPointElevation = function(step){
    elevator.getElevationForLocations({'locations': step.lat_lngs},
    function(results, status){
       //check if the request returned
       if (status === google.maps.ElevationStatus.OK){
         //check if we have results
         if(results[0]){
           //if all that, then do...stuff.
           // results.map(function(result){
            //call something in elevationView maybe?
            elevationView.displayElevation(step, results);
           // }); 
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

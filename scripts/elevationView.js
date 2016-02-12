(function(module){
  var elevationView = {};

  //take in an elevation, throw it into the document
  //elevationPoint is assumed to be a number, which we are going to cast to an int because who needs floats?
  elevationView.displayElevation = function(step, results){
    //get step, results. Call displayDifference on the results array.
    //we actually want to derive the run from the lat lngs 
    elevationView.getDifference(results);
    $('#writtenDirections ol>li:nth-child(' + step.stepNo + ')').append(' This is the ' + step.stepNo + 'th step');
  };

  //display the difference between two elevations
  elevationView.getDifference = function(results){
    //have results, which is an array of objects that have elevation in them.
    //want to go over the array and compare each elevation to the next elevation to get the difference
    //want to return an array we can go over and check the run 
    var rise = results.map(function(result, i, results){
      if(i > 0) return results[i-1].elevation - result.elevation;
    });

    rise.shift();

    //everything I want to do is math math math
    //This is the Haversine Formula, NASA says it's good for calculating distances
    run = results.map(function(result, i, results){
      if(i > 0){
        var R = 6371000, //radius of the Earth in meters
            dlat = result.location.lat() - results[i-1].location.lat(),
            dlng = result.location.lng() - results[i-1].location.lng(),
            a = Math.pow(Math.sin(dlat/2), 2) + 
                (Math.cos(results[i-1].location.lat()) * Math.cos(result.location.lat())) *
                Math.pow(Math.sin(dlng/2), 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
            d = R * c;             

        return d;
      }
    });

    //now we should have two arrays, rise and run. We want to compare each rise to each run. 
    //this isn't how to do it.
    var diff = rise.map(function(riseStep){
      return (riseStep/step.distance.value)*100;
    });

    //obviously, this is to be taken out.
    if(diff > 2) console.log("Warning! A huge hill " + diff + " is approaching fast!");

    //
    // //warn for change over 2%, display change
    // $('.routeLeg').append("Percent difference in elevation over this leg: " + parseInt(diff, 10) + if(Math.abs(diff) > ){});
  };

  module.elevationView = elevationView;
})(window);

(function(module){
  var elevationView = {};

  //take in an elevation, throw it into the document
  //I have no idea what any DOM is going to look like
  //elevationPoint is assumed to be a number, which we are going to cast to an int because who needs floats?
  elevationView.displayElevation = function(elevationPoint){
    $('.routeLeg').append("Elevation: " + parseInt(elevationPoint, 10) + " meters, " + parseInt((elevationPoint*3.28084), 10) + " feet.");
  };

  //display the difference between two elevations
  elevationView.displayDifference = function(point1, point2){
    eleDiff = elevation.getDifference(point1.elevation, point2.elevation); //rise
    //this is awful. Get proper distance off Google when we have the routes set up. This is testing only.
    latDiff = point1.lat - point2.lat;
    lngDiff = point1.lgn = point2.lng;
    //runDiff = rows.duration.value;

    percentLat = (eleDiff/latDiff)*100;
    percentLng = (eleDiff/lngDiff)*100;

    //obviously, this is to be taken out.
    if((percentLat || percentLng) > 2) console.log("Warning! A huge hill " + Math.max(percentLat,percentLng) + " is approaching fast!")

    //
    // //warn for change over 2%, display change
    // $('.routeLeg').append("Percent difference in elevation over this leg: " + parseInt(diff, 10) + if(Math.abs(diff) > ){});
  };

  module.elevationView = elevationView;
})(window);

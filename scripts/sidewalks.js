(function(module){
  var Sidewalk = {};

  Sidewalk.missing = [];
  Sidewalk.markers = {};

  Sidewalk.loadSidewalks = function(sws){
    //refactor this to work with real sidewalks too
    Sidewalk.missing = sws.map(function(sw){
      //grab only the data we care about
      if(sw[9][5].paths) return sw[9][5].paths[0];
    }).filter(function(sw){
      //if the data we care about is undefined, skip it
      if(sw != undefined) return sw;
    }).map(function(sw){
      //reverse the points to match Google notcation
      //I really hope this makes things easier at some point
      sw.forEach(function(point){
         point.reverse();
      });
      return sw;
    });
  };

  //convert the sidewalk data points into markers. All of them.
  //load up each Sidewalk, which is an array of arrays. Get out the array, then turn the points in that array
  //into objects with lat and long.
  Sidewalk.convertToMarker = function(sw){

  }

  Sidewalk.fetchMissingSidewalks = function(){
    $.ajax('/data/missing_sidewalks.json', {
      method: 'GET',
      success: function(data, msg, xhr){
        Sidewalk.loadSidewalks(data);
      }
    });
  };

  // Marker.setMarkers = function(){
  //   Marker.all.forEach(function(marker){
  //     marker.setMap(map.gMap);
  //   });
  // };

  module.Sidewalk = Sidewalk;
})(window);

(function(module){
  var Sidewalk = {};

  Sidewalk.missing = [];
  Sidewalk.markers = [];

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
      return sw.map(function(point){
        return Sidewalk.convertToMarker(point.reverse());
      });
    });
  };

  //convert sidewalk points into markers
  Sidewalk.convertToMarker = function(point){
    return {position: {lat: point[0], lng: point[1]}};
  };

  //create markers from the sidewalk points. Not necesserily useful (you will get Too Many Markers), but you can do it.
  Sidewalk.createMarkers = function(){
    Sidewalk.missing.forEach(function(sw){
      sw.forEach(function(point){
        Marker.loadMarker(point);
      });
    });
  };

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

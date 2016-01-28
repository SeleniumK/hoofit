(function(module){
  var Sidewalk = {};

  Sidewalk.missing = [];

  Sidewalk.loadSidewalks = function(sws){
    //refactor this to work with real sidewalks too
    Sidewalk.missing = sws.map(function(sw){
      //reverse the points to match Google notation
      //I really hope this makes things easier at some point
      sw.paths = sw.paths.map(function(point){
        return Sidewalk.convertToMarker(point.reverse());
      });

      return sw;
    });
  };

  //convert sidewalk points into markers
  Sidewalk.convertToMarker = function(point){
    return {lat: point[0], lng: point[1]};
  };

  //create markers from the sidewalk points. Not necesserily useful (you will get Too Many Markers), but you can do it.
  Sidewalk.createMarkers = function(){
    Sidewalk.missing.forEach(function(sw){
      sw.forEach(function(point){
        Marker.loadMarker(point);
      });
    });
  };

  Sidewalk.fetchMissingSidewalks = function(callback){
    $.ajax('/data/sidewalk.json', {
      method: 'GET',
      success: function(data, msg, xhr){
        Sidewalk.loadSidewalks(data);
        callback();
      }
    });
  };

  module.Sidewalk = Sidewalk;
})(window);

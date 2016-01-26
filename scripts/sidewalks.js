(function(module){
  var Sidewalk = {};

  Sidewalk.missing = [];
  Sidewalk.returnedData;

  function Sidewalk(args){
  //updating to the less-hacky way to do it
  Object.keys(args).forEach(function(k, index, keys){
    this[k] = args[k];
  },this);
};

  Sidewalk.loadSidewalk = function(sws){
    Sidewalk.missing = sws.map(function(sw){
      return sw[9][5].paths;
    });
  };

  Sidewalk.fetchSidewalk = function(){
    $.ajax('/data/missing_sidewalks.json', {
      method: 'GET',
      success: function(data, msg, xhr){
        Sidewalk.loadSidewalk(data);
      }
    });
  };
  //
  // Marker.setMarkers = function(){
  //   Marker.all.forEach(function(marker){
  //     marker.setMap(map.gMap);
  //   });
  // };

  module.Sidewalk = Sidewalk;
})(window);

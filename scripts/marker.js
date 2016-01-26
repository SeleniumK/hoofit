(function(module){
  var Marker = {};

  Marker.all = [];

  //this just pushes to Marker.all. You will need to call clearMakers before using this
  Marker.loadMarker = function(mark){
    Marker.all.push(new google.maps.Marker(mark));
  };

  //this needs refactoring, since it only works for these accessible markers
  Marker.fetchMarkers = function(){
    $.ajax('/data/accessible_signals.json', {
      method: 'GET',
      success: function(data, msg, xhr){
        data.forEach(function(mark){
          Marker.loadMarker(mark);
        });
      }
    });
  };

  Marker.setMarkers = function(){
    Marker.all.forEach(function(marker){
      marker.setMap(map.gMap);
    });
  };

  //clear out the already set markers
  Marker.clearMarkers = function(){
    Marker.all = [];
  };

  module.Marker = Marker;
})(window);

(function(module){
  var Marker = {};

  Marker.all = [];


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

  module.Marker = Marker;
})(window);

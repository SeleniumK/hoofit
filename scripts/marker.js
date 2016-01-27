(function(module){
  var Marker = {};

  Marker.all = [];

  Marker.loadMarkers = function(marks){
    Marker.all = marks.map(function(mark){
      return new google.maps.Marker(mark);
    });
  };

  Marker.fetchMarkers = function(){
    $.ajax('/data/accessible_signals.json', {
      method: 'GET',
      success: function(data, msg, xhr){
        Marker.loadMarkers(data);
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

(function(module){
  var Marker = {};

  Marker.all = [];

  //this just pushes to Marker.all. You will need to call clearMakers before using this
  Marker.loadMarker = function(mark){
    Marker.all.push(new google.maps.Marker({
      position: mark.position,
      title: mark.title,
      icon:mark.image
    }));
  };

  //this needs refactoring, since it only works for these accessible markers
  Marker.fetchAccessibleSignals = function(callback){
    $.ajax('/data/accessible_signals.json', {
      method: 'GET',
      success: function(data, msg, xhr){
        data.forEach(function(mark){
          Marker.loadMarker(mark);
        });
        callback();
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
    //unset them from the map
    Marker.all.forEach(function(mark){
      mark.setMap(null);
    });

    //and clear the array
    Marker.all = [];
  };

  module.Marker = Marker;
})(window);

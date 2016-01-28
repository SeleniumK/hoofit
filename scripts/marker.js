(function(module){
  var Marker = {};

  Marker.all = [];

  //this just pushes to Marker.all. You will need to call clearMakers before using this
  Marker.loadMarker = function(mark){
    var image;

    //or I could put an extra field in the JSON. I don't know.
    if(mark.type.length < 2){
      image = 'images/audible_logo.png';
    }else if(mark.type.length == 3){
      image = 'images/audible_vibrate_tactile_logo.png';
    }else if(mark.type[1] == 'vibrate'){
      image = 'images/audible_vibrate_logo.png';
    }else if(mark.type[1] == 'tactile'){
      image: 'images/audible_tactile_logo.png';
    }

    Marker.all.push(new google.maps.Marker({
      position: mark.position,
      title: mark.title,
      icon:image
    }));
  };

  //this needs refactoring, since it only works for these accessible markers
  Marker.fetchAccessibleSignals = function(){
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
    //unset them from the map
    Marker.all.forEach(function(mark){
      mark.setMap(null);
    });

    //and clear the array
    Marker.all = [];
  };

  module.Marker = Marker;
})(window);

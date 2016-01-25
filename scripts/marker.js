(function(module){
  var marker = {};

  marker.setMarker = function(){
    var mark = new google.maps.Marker({
      position: {lat: 47.5798175, lng: -122.3268311},
      map: gMap,
      title: '5th Ave S & S Jackson St'
    });

    mark.setMap(map.gMap);
  };

  module.marker = marker;
})(window);

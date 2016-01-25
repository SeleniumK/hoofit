(function(module){
  var map = {};
  var gMap;

  map.initMap = function(){
    gMap = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6097, lng: -122.3331},
      zoom: 12
    });

    // return gMap;
  };


  map.setMarker = function(){
    var mark = new google.maps.Marker({
      position: {lat: 47.5798175, lng: -122.3268311},
      map: gMap,
      title: '5th Ave S & S Jackson St'
    });

    mark.setMap(gMap);
  };

  module.map = map;
})(window);

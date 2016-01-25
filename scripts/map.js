(function(module){
  var map = {};

  map.gMap = {};

  map.initMap = function(){
    map.gMap = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6097, lng: -122.3331},
      zoom: 12
    });
  };

  module.map = map;
})(window);

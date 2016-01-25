(function(module){
  var map = {};

  map.initMap = function(){
   var gMap = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6097, lng: -122.3331},
      zoom: 12
    });

    // return gMap;
  };



  module.map = map;
})(window);

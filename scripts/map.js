(function(module){
  var map = {};

  map.initMap = function(){
   var gMap = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });

    return gMap;
  };



  module.map = map;
})(window);

(function(module){
  var elevation = {};
  var elevator;

  elevation.initElevator = function(){
    elevator = new google.maps.ElevationService;
  };

  module.elevation = elevation;
})(window);

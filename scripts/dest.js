(function(module){
  var destView = {
    info: $('#destInfo'),
    mapInfo: document.getElementById('destInfo'),
    template: $('#dest-template'),
    formButton: $('#destInput'),
    error: $('#errormessage')
  };

  var dest = {};
  var request = {};

  var getGeoCode = function(address, callback){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address' : address}, callback);
  };

  var searchLocation = function(results, status){
    request.location = results[0].geometry.location;
    dest.initSearch();
  };

    //Google Maps 'OK' = google.maps.places.PlacesServiceStatus.OK. Seems to be
    //working with just a string, though...
  dest.populate = function(results, status){
    if(status == 'OK'){
      destView.error.hide();
      pageView.appendResults(results, destView.template, destView.info);
    }else{
      destView.error.show();
    }
  };

  dest.initSearch = function(){
    var service = new google.maps.places.PlacesService(destView.mapInfo);
    service.nearbySearch(request, dest.populate);
  };

  dest.initPage = function(){
    destView.formButton.submit(function(e){
      e.preventDefault();
      var address = $('#address').val();
      request.keyword = $('#keyword').val();
      request.radius = parseInt($('#miles').val());

      getGeoCode(address, searchLocation);
    });
  }

  module.dest = dest;
}(window));

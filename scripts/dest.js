(function(module){
  var request = {};

  var render = function(template){
    return Handlebars.compile($('#' + template).text())
  };

  var getGeoCode = function(address, callback){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address' : address}, callback);
  };

  var searchLocation = function(results, status){
    request.location = results[0].geometry.location;
    destInfo.initSearch();
  };

  var popDestinations = function(results, status){
    if(status == google.maps.places.PlacesServiceStatus.OK){
      var template = render('dest-template');
      $('#destInfo').append(results.map(function(dest){
        return template(dest);
      }));
    }else{
      console.log('error retrieving places');
    }
  };


  var destInfo = {};

 destInfo.initSearch = function(){
    var service = new google.maps.places.PlacesService(document.getElementById('destInfo'));
    service.nearbySearch(request, popDestinations);
  };

  destInfo.initPage = function(){
    $('#destInput').submit(function(e){
      e.preventDefault();
      var address = $('#address').val();
      request.keyword = $('#keyword').val();
      request.radius = parseInt($('#miles').val());
      getGeoCode(address, searchLocation);
    });
  }

  module.destInfo = destInfo;
}(window));

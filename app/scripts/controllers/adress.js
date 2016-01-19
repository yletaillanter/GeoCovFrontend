'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the geocovApp
 */
geocovApp
  //The name params Adress is the same on controller function just bellow
  .factory('Adress', function($resource) {
    return $resource('http://localhost\:8080/adresse/:id', {id:'@id'})
  })
  //Add adress controller, used to split correcly each controller
  .controller('AdressAddCtrl', function ($scope, $routeParams, Adress) {
    // Add Function used to add new adress in the server
    //TODO Get Lat & Long parameters with getLatLong function
    //TODO Complete this function
    $scope.add = function(adress) {
            var newAdress = new Adress;
            newAdress.numero = adress.numero;
            newAdress.rue = adress.rue;
            newAdress.cp = adress.cp;
            newAdress.ville = adress.ville;
            newAdress.$save();
    };

    // Reset function used to reset form
    $scope.reset = function() {
        $scope.device = angular.copy({});
    };

    // Function used to collect geodata from adress
    $scope.getLatLong = function(address) {
      console.log(address);
      var geo = new google.maps.Geocoder;
      geo.geocode({'address':address},function(results, status){
        if (status == google.maps.GeocoderStatus.OK) {
          $scope.setLatLong(results[0].geometry.location);
        } else {
          console.log("Geocode was not successful for the following reason: " + status);
        }
      });
    };

    // Function used to set geodata
    //TODO Complete this function
    $scope.setLatLong = function(data) {
      return data;
    }
  });

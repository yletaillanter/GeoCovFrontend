'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:AddressAddCtrl
 * @description
 * # AboutCtrl
 * Controller of the geocovApp
 */
angular.module('geocovApp')
  //The name params adresse is the same on controller function just bellow
  .factory('Adresse', function($resource) {
    return $resource('http://localhost\:8080/adresse/:id', {id:'@id'});
  })
  //Add address controller, used to split correcly each controller
  .controller('AdresseAddCtrl', function ($scope, $routeParams, $location, Adresse) {

    $scope.lati = null;
    $scope.longi = null;

    // if(!sessionStorage.loggedIn) {
    //   $location.path('/compte/auth');
    // } else {
      // Add Function used to add new adress in the server
      //TODO Get Lat & Long parameters with getLatLong function
      //TODO Complete this function
      $scope.add = function(adresse) {
  
              var newAddress = new Adresse();
              newAddress.numero = adresse.numero;
              newAddress.rue = adresse.rue;
              newAddress.cp = adresse.cp;
              newAddress.ville = adresse.ville;
              newAddress.end = false;
              newAddress.clients = [JSON.parse(sessionStorage.contact)];

              $scope.getLatLong(adresse.numero+" "+adresse.rue+" "+adresse.cp+" "+adresse.ville, newAddress);
      };

      // Reset function used to reset form
      $scope.reset = function() {
          $scope.adresse = angular.copy({});
      };

      $scope.getLatLongBis = function(lat, lng, client){
        console.log(lat);
        console.log(lng);
        client.latitude = lat;
        client.longitude = lng; 

        console.log(client);

        client.$save();
      }

      // Function used to collect geodata from address
      $scope.getLatLong = function(adresse, client) {
        console.log(adresse);
        var geo = new google.maps.Geocoder();
        geo.geocode({'address':adresse},function(results, status){
          if (status === google.maps.GeocoderStatus.OK) {
            $scope.getLatLongBis(results[0].geometry.location.lat(),results[0].geometry.location.lng(), client);
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });
      };

      // Function used to set geodata
      //TODO Complete this function
      $scope.setLatLong = function (geocoder, resultsMap) {
         var ville = document.getElementById('ville').value;
         var rue = document.getElementById('rue').value;
         var numero = document.getElementById('numero').value;
         
         var address = ville+", "+rue+", "+numero;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
      });
    }

   // TO CALL THIS FUNCTION - USE THE FOLLOWING SYNTAX:
  // document.getElementById('submit').addEventListener('click', function() {
  //   setLatLong(geocoder, map);
  // });
  });

'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:CarteCtrl
 * @description
 * # CarteCtrl
 * Controller of the geocovApp
 */
angular.module('geocovApp')
  // Factory Groupe permettant de récupérer tous les groupes
  .factory('Groupe', function($resource) {
    return $resource('http://localhost\:8080/groupe/:id', {id:'@id'});
  })
  .controller('CarteCtrl', function ($scope, $location, Groupe) {
    // Affiche la carte avec pour centre Rennes
    var carte = {
      center: new google.maps.LatLng(48.1154358,-1.6415069),
      zoom:12,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), carte);

    // Fonction utilisé pour initialiser la carte
    $scope.initMap = function() {
      // Récupére tous les groupes de la base de données
      $scope.groupes = Groupe.query();
      $scope.groupes.$promise.then(
        // Fonction utilisé quand la récupération marche
        function(groupes) {
          // On parcourt la liste de groupes
          for (var itGroupe = 0; itGroupe < groupes.length; itGroupe++) {
            // On attribut une couleur random pour un groupe
            var color = getRandomColor();
            // On parcourt la liste des clients
            for (var itClient = 0; itClient < groupes[itGroupe].clients.length; itClient++) {
              // Récupére la latitude du client
              var lat = groupes[itGroupe].clients[itClient].adresses[0].latitude;
              // Récupére la longitude du client
              var long = groupes[itGroupe].clients[itClient].adresses[0].longitude;
              // Créer une position google à partir de la latitude et de la longitude
              var position = new google.maps.LatLng(lat, long);
              // Créer un marqueur à partir de la position et de la couleur sur la map données.
              createMarker(position, map, color);
            }
          }
        }
      );
    };

    // Fonction utilisé pour créer un marqueur
    function createMarker(position, map, color) {
      // Création d'un marqueur google map à partir de la position données
      var marqueur = new google.maps.Marker({
        position: position,
        map: map
      });

      // Création d'une icone utilisé pour représenter le marqueur
      var pinIcon = new google.maps.MarkerImage(
        "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(21, 34)
      );
      marqueur.setIcon(pinIcon);
    };

    // Fonction utilisé pour générer une couleur aléatoirement
    function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
  })

  'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:GroupeCtrl
 * @description
 * # GroupeCtrl
 * Controller of the geocovApp
 */
angular.module('geocovApp')
  // Factory utilisé pour la connexion
  .factory('Groupe', function($resource) {
    return $resource('http://localhost\:8080/groupe/:id', {id:'@id'});
  })
  // Factory utilisé pour la connexion
  .factory('GroupeByUser', function($resource) {
    return $resource('http://localhost\:8080/groupe/getByClient/:id', {id:'@id'});
  })
  .controller('GroupeCtrl', function ($scope, $location, Groupe, GroupeByUser) {
    if(!sessionStorage.loggedIn) {
      $location.path('/compte/auth');
    }
    
    $scope.contact = JSON.parse(sessionStorage.contact);

    $scope.initMapGroupe = function() {
      // On set la map avec comme position central celle du centre des différentes personne du groupe
      var carte = {
        center: new google.maps.LatLng(48.1154358,-1.6415069),
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("mapGroupe"),carte);
      // Récupère le groupe du client à partir de son ID pour l'afficher
      $scope.groupe = GroupeByUser.get({ id:$scope.contact.id });
      console.log($scope.groupe);
      // Vue qu'on fait de l'ajax on récupère des données asynchrone il faut donc faire une fonction qui sera executer au moment ou on recevra le resultat
      $scope.groupe.$promise.then(
        // Si on reçoit le résultat alors on place les marqueur
        function(groupe) {
          // Pour chaque personne du groupe
          for (var it = 0; it < groupe.clients.length; it++) {
            // Récupére la latitude du client
            var lat = groupe.clients[it].adresses[0].latitude;
            // Récupére la longitude du client
            var long = groupe.clients[it].adresses[0].longitude;
            // Récupére le nom du client
            var clientName = groupe.clients[it].name+ ' '+ groupe.clients[it].lastname;
            // On créer un position google à partir de sa latitude et longitude
            var position = new google.maps.LatLng(lat, long);
            // On créer un marqueur à partir de la position , de la map et du texte donnée qui sera affiché dans le popup
            createMarker(position, map, clientName);
          }
          // Récupération du midPoint entre les différents membre du groupe
          var centre = new google.maps.LatLng(groupe.latMidPoint,groupe.longMidPoint);
          // Récupération de la destination du groupe
          var destination = new google.maps.LatLng(groupe.latDest, groupe.longDest);
          //création de la route à partir du centre et de la destination indiqué
          createRoute(centre, destination, map);
        }
      );
    };

    // Fonction permettant de créer un marqueur sur la carte Google Map
    function createMarker(position, map, nom){
      var marqueur = new google.maps.Marker({
        position: position,
        map: map
      });

      var pinIcon = new google.maps.MarkerImage(
        "/images/bleu_pers.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(50, 50)
      );
      marqueur.setIcon(pinIcon);

      var contenuInfoBulle = '<p>' + nom +'</p>';
      var infoBulle = new google.maps.InfoWindow({
        content: contenuInfoBulle
      });

      google.maps.event.addListener(marqueur, 'click', function() {
        infoBulle.open(map, marqueur);
      });
    };

    // Fonction permettant de traver un trajet sur la carte Google Map
    function createRoute(centre, destination, map){
      var directionsDisplay = new google.maps.DirectionsRenderer({
        map   : map,
        panel : document.getElementById("mapTrace")
      });

      var request = {
        origin:centre,
        destination:destination,
        travelMode: google.maps.TravelMode.DRIVING
      };
      // Service de calcul d'itinéraire
      var directionsService = new google.maps.DirectionsService();
      // Envoie de la requête pour calculer le parcours
      directionsService.route(request, function(response, status){
        if(status == google.maps.DirectionsStatus.OK){
          // Trace l'itinéraire sur la carte et les différentes étapes du parcours
          directionsDisplay.setDirections(response);
        }
      });
    };
  });

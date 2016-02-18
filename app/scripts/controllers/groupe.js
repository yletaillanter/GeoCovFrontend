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

    $scope.initAffichage = function() {
      if (false) {
        document.getElementById("chat").style.display = 'none';
        document.getElementById("info_importante").style.display = 'none';
        document.getElementById("btn_verrouiller").style.display = 'none';
        document.getElementById("btn_quitter").style.display = 'none';
      }
      else if (true){
        document.getElementById("btn_adherer").style.display = 'none';
      };
    }

    $scope.initChat = function() {
      //Récupération des anciens messages
      var messages =[
        ["Julie G.","01/02/2015", "Hey ! Salut tout le monde !"],
        ["Léon P.","02/02/2015", "TG ! Mais je t'aime bien quand même <3"],
        ["Julie G.","03/02/2015", "Grrrrr..."],
        ["Julie G.","01/02/2015", "Hey ! Salut tout le monde !"],
        ["Léon P.","02/02/2015", "TG ! Mais je t'aime bien quand même <3"],
        ["Julie G.","03/02/2015", "Grrrrr..."],
        ["Julie G.","01/02/2015", "Hey ! Salut tout le monde !"],
        ["Léon P.","02/02/2015", "TG ! Mais je t'aime bien quand même <3"],
        ["Julie G.","03/02/2015", "Grrrrr..."]
      ];

      for(var it = 0; it < messages.length; it++) {
        $('#mess_prec').append('[' + messages[it][1] +']' +' > <span class="membre" style="text-decoration: underline;">' + messages[it][0] + '</span> ' + messages[it][2] + '<br/>');
      }

      //Mettre le scroll en bas
      //element = document.getElementById('conversation');
      document.getElementById("conversation").scrollTop=document.getElementById("conversation").scrollHeight;
    };

    $scope.chatbox = function() {
      var mess = document.getElementById("message");
      var nom = "Julie G.";
      var date = new Date();
      var dateDetail = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':'+ date.getMinutes();

      $('#mess_prec').append('['+dateDetail+']' + ' > <span class="membre" style="text-decoration: underline;">' + nom + '</span> ' + mess.value + '<br/>');
      //enregistrement du message (?)
      mess.value="";

      //Mettre le scroll en bas
      document.getElementById("conversation").scrollTop=document.getElementById("conversation").scrollHeight;
    };

    $scope.initMapGroupe = function() {
      // Récupère le groupe du client à partir de son ID pour l'afficher
      $scope.groupe = GroupeByUser.get({ id:$scope.contact.id });
      // Vue qu'on fait de l'ajax on récupère des données asynchrone il faut donc faire une fonction qui sera executer au moment ou on recevra le resultat
      $scope.groupe.$promise.then(
        // Si on reçoit le résultat alors on place les marqueur
        function(groupe) {
          // Pour chaque personne du groupe
          for (var it = 0; it < groupe.clients.length; it++) {
            // On créer un position google à partir de sa latitude et longitude
            var position = new google.maps.LatLng(groupe.clients[it].adresses[0].latitude,groupe.clients[it].adresses[0].longitude);
            // On créer un marqueur à partir de la position , de la map et du texte donnée qui sera affiché dans le popup
            createMarker(position, map, groupe.clients[it].name+ ' '+ groupe.clients[it].lastname);
          }

        }
      );
      // TODO calculer le centre à partir des différents points
      var centre = new google.maps.LatLng(48.106752,-1.669667);
      // TODO fixer la destination
      // On prend la destination de la première personne et on part sur le fait que la destination est la même pour chaque ?
      // Ou on decide de donner un destination directement a l'object groupe ?
      var destination = new google.maps.LatLng(48.136619,-1.620522);
      // On set la map avec comme position central celle du centre des différentes personne du groupe
      var carte = {
        center:centre,
        zoom:13,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("mapGroupe"),carte);
      //création de la route à partir du centre et de la destination indiqué
      createRoute(centre, destination, map);
    };

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

      var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
      directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
        if(status == google.maps.DirectionsStatus.OK){
          directionsDisplay.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
        }
      });
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:GroupeCtrl
 * @description
 * # GroupeCtrl
 * Controller of the geocovApp
 */
angular.module('geocovApp')
  .controller('GroupeCtrl', function ($scope, $location) {

    if(!sessionStorage.loggedIn) {
      $location.path('/compte/auth');
    } else {

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
      var centre = new google.maps.LatLng(48.106752,-1.669667);
      var destination = new google.maps.LatLng(48.136619,-1.620522);
      var myArray = [[48.110081,-1.677181,'Julie G.'],[48.110092,-1.667953,'Mariia I.'],[48.100900,-1.667973,'Léon P.']];

      var carte = {
        center:centre,
        zoom:13,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("mapGroupe"),carte);

      //création des autres marqueurs
      for (var it = 0; it < myArray.length; it++) {
        var position = new google.maps.LatLng(myArray[it][0],myArray[it][1]);
        createMarker(position, map, myArray[it][2]);
      }

      createRoute(centre, destination, map);
    };
  }

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

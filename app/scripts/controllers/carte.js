'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:ClusterCtrl
 * @description
 * # ClusterCtrl
 * Controller of the geocovApp
 */
angular.module('geocovApp')
  .controller('CarteCtrl', function ($scope, $location) {

    if(!sessionStorage.loggedIn) {
      $location.path('/compte/auth');
    } else {

    /*
    Solution 2 - déroulement :

    Clique sur bouton de recherche
    Récupération dans la base de données des personnes et des groupes < 4 personnes et non vérouillé
    */
      $scope.initMap = function() {

      // On recupère le contact dans la variable de session
      var contact = JSON.parse(sessionStorage.contact);

      // On créer un marqueur avec l'adresse de départ de la personne
      var centre = new google.maps.LatLng(contact.adresses[0].latitude,contact.adresses[0].longitude);
      //var centre = new google.maps.LatLng(48.115798,-1.706017);
      var distance_max = 1500;
      var myArray = [
        [48.110081,-1.677181,'nom1',3],
        [48.110092,-1.667953,'nom2',4],
        [48.100900,-1.667973,'nom3',3],
        [48.107853,-1.701493,'nom4',3],
        [48.118129,-1.707957,'nom5',4],
        [48.118809,-1.706444,'nom6',1],
        [48.120506,-1.709652,'nom7',2],
        [48.115973,-1.648463,'nom8',1],
        [48.119898,-1.646596,'nom9',3],
        [48.125907,-1.641596,'nom10',4]
      ];

        var carte = {
          center:centre,
          zoom:13,
          mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("map"),carte);

        //création du marqueur centrale
        var marqueurCentre = new google.maps.Marker({
          position: centre,
          map: map
        });

        var contenuInfoBulleCentre = '<h1>Vous êtes ici</h1>';

        var infoBulleCentre = new google.maps.InfoWindow({
          content: contenuInfoBulleCentre
        });

        google.maps.event.addListener(marqueurCentre, 'click', function() {
          infoBulleCentre.open(map, marqueurCentre);
        });

        //création des autres marqueurs
        for (var it = 0; it < myArray.length; it++) {
          var position = new google.maps.LatLng(myArray[it][0],myArray[it][1]);
          var distance = google.maps.geometry.spherical.computeDistanceBetween(centre, position);

	  if ((distance <= distance_max) && (myArray[it][3] < 4)){
            createMarker(position, map, myArray[it][2], myArray[it][3]);
          }
        }
      };
    }

  function createMarker(position, map, nom, nb){
    var marqueur = new google.maps.Marker({
      position: position,
      map: map
    });

    var contenuInfoBulle = '<h1>Informations du groupe</h1>' +
      '<ul><li>Nom du groupe : '+ nom +'</li>' +
      '<li>Nombre de personne : '+ nb +'</li>' +
      '<li>Nom des personnes : Leon P., Yoann L.</li>' +
      '</ul>'+
      '<button type="button">Adhérer</button>';

    var infoBulle = new google.maps.InfoWindow({
      content: contenuInfoBulle
    });

    google.maps.event.addListener(marqueur, 'click', function() {
      infoBulle.open(map, marqueur);
    });
  }

});

/*
Pour réaliser la mise en cluster 2 solutions !

--------------------------------------------------------------------

1er solution :

Utilisation de 2 algorithmes. Un premier servant à regrouper de façon logique les personnes proches l'une de l'autre sans limite de nombre de place dans un cluster (DBSCAN) mais avec un minimum de 2 dans un cluster. Les personnes trop éloignées ne sont pas mise en cluster. Le second algorithme va être appliqué plusieurs fois pour diviser chaque cluster en 2 jusqu'à obtenir des cluster de 4 personnes maximum. C'est l'algorithme de la classification ascendante hiérarchique (CAH). La division se fait aussi de façon logique les plus proche forme un groupe ensemble. (Faut faire attention que personne ne se retrouve tout seul.

DBSCAN : L'algorithme est très simple et ne nécessite pas qu'on lui précise le nombre de clusters à trouver.
Il est capable de gérer les données aberrantes en les éliminant du processus de partitionnement.

CAH : C'est une méthode de classification automatique utilisée en analyse des données ; à partir d'un ensemble \Omega de n individus, son but est de répartir ces individus dans un certain nombre de classes.

--------------------------------------------------------------------

2e solution :

Sachant que les personnes arrivent au compte goutte, on leur propose directement d'intégrer des cluster autour d'eux.
Si sélection groupe : adhésion au groupe
Si personne seul : demande de formation de groupe.

evenement de la carte:
google.maps.event.addListener(marqueur,'mouseover', function() {
  alert("Je suis dessus");
});

google.maps.event.addListener(marqueur,'mouseout', function() {
  code qui doit s'executer lors de l'evenement
});

google.maps.event.addListener(marqueur, 'click', function() {
  infoBulle.open(map, marqueur);
});
--------------------------------------------------------------------
*/

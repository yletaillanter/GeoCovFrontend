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
      var arrive = new google.maps.LatLng(contact.adresses[1].latitude,contact.adresses[1].longitude);
      //var arrive = new google.maps.LatLng(48.136721,-1.622180);
      //var centre = new google.maps.LatLng(48.115798,-1.706017);
      var distance_max = 1500;
      var myArray = [
        [48.110081,-1.677181,48.136721,-1.622180,'nom1',3],
        [48.110092,-1.667953,48.106828,-1.731601,'nom2',4],
        [48.100900,-1.667973,48.136721,-1.622180,'nom3',3],
        [48.107853,-1.701493,48.106828,-1.731601,'nom4',3],
        [48.118129,-1.707957,48.102624,-1.672220,'nom5',4],
        [48.118809,-1.706444,48.106828,-1.731601,'nom6',1],
        [48.120506,-1.709652,48.136721,-1.622180,'nom7',2],
        [48.115973,-1.648463,48.106828,-1.731601,'nom8',1],
        [48.119898,-1.646596,48.136721,-1.622180,'nom9',3],
        [48.125907,-1.641596,48.136721,-1.622180,'nom10',4]
      ];

      var persSeul = [
        [48.110081,-1.671181,48.136721,-1.622180,'nomPers1'],
        [48.110092,-1.663953,48.106828,-1.731601,'nomPers2'],
        [48.100900,-1.662273,48.106828,-1.731601,'nomPers3'],
        [48.107853,-1.701993,48.136721,-1.622180,'nomPers4'],
        [48.118129,-1.707157,48.136721,-1.622180,'nomPers5'],
        [48.118809,-1.705144,48.102624,-1.672220,'nomPers6'],
        [48.120506,-1.709752,48.106828,-1.731601,'nomPers7'],
        [48.115973,-1.648963,48.102624,-1.672220,'nomPers8'],
        [48.119898,-1.646296,48.106828,-1.731601,'nomPers9'],
        [48.125907,-1.641996,48.106828,-1.731601,'nomPers10']
      ];

        var carte = {
          center:centre,
          zoom:13,
          mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("map"),carte);

        //création des marqueurs de la personne
        createMarker("centre", centre, map, []);
        createMarker("arrive", arrive, map, []);

        //création des autres marqueurs
        var max = 0;
        if (myArray.length < persSeul.length)
          max = persSeul.length;
        else
          max = myArray.length;

        var positionDepart = "";
        var positionArrive = "";
        var distanceDepart = "";
        var distanceArrive = "";

        for (var it = 0; it < max; it++) {
          if(it < myArray.length){
            positionDepart = new google.maps.LatLng(myArray[it][0],myArray[it][1]);
            positionArrive = new google.maps.LatLng(myArray[it][2],myArray[it][3]);
            distanceDepart = google.maps.geometry.spherical.computeDistanceBetween(centre, positionDepart);
            distanceArrive = google.maps.geometry.spherical.computeDistanceBetween(arrive, positionArrive);

            if ((distanceDepart <= distance_max && distanceArrive <= distance_max) && (myArray[it][5] < 4)){
              createMarker("groupe", positionDepart, map, myArray[it]);
            }
          }

          if(it < persSeul.length){
            positionDepart = new google.maps.LatLng(persSeul[it][0],persSeul[it][1]);
            positionArrive = new google.maps.LatLng(persSeul[it][2],persSeul[it][3]);
            distanceDepart = google.maps.geometry.spherical.computeDistanceBetween(centre, positionDepart);
            distanceArrive = google.maps.geometry.spherical.computeDistanceBetween(arrive, positionArrive);

            if (distanceDepart <= distance_max && distanceArrive <= distance_max){
              createMarker("personne", positionDepart, map, persSeul[it]);
            }
          }

         
        };
      };
    }

  function createMarker(type, position, map, array){
    var marqueur = new google.maps.Marker({
      position: position,
      map: map
    });

    var contenuInfoBulle = "";
    var pinIcon = "";

    if (type == "groupe"){
      pinIcon = new google.maps.MarkerImage(
        "/images/vert_groupe.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(60, 60)
      );
      marqueur.setIcon(pinIcon);

      contenuInfoBulle = '<h1>Informations du groupe</h1>' +
      '<ul><li>Nom du groupe : '+ array[4] +'</li>' +
      '<li>Nombre de personne : '+ array[5] +'</li>' +
      '<li>Nom des personnes : Leon P., Yoann L.</li>' +
      '</ul>'+
      '<button type="button">Adhérer</button>'+
      '<button type="button">Voir le groupe</button>';
    }

    else if (type == "personne"){
      pinIcon = new google.maps.MarkerImage(
        "/images/bleu_pers.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(60, 60)
      );
      marqueur.setIcon(pinIcon);

      contenuInfoBulle = "<h1>Informations sur l'utilisateur</h1>" +
      "<ul><li>Prénom de la personne : "+ array[4] +"</li>" +
      "</ul>"+
      "<button type='button'>Faire un groupe</button>";
    }

    else if (type == "centre" || type == "arrive"){
      pinIcon = new google.maps.MarkerImage(
        "/images/maison.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(60, 60)
      );
      marqueur.setIcon(pinIcon);

      if (type == "centre")
        contenuInfoBulle = "<h1>Vous êtes ici</h1>";
      else
        contenuInfoBulle = "<h1>Votre point d'arrivée</h1>";
    }

    var infoBulle = new google.maps.InfoWindow({
      content: contenuInfoBulle
    });

    google.maps.event.addListener(marqueur, 'click', function() {
      infoBulle.open(map, marqueur);
    });
  };
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

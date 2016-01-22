'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:ClusterCtrl
 * @description
 * # ClusterCtrl
 * Controller of the geocovApp
 */
angular.module('geocovApp')
  .controller('CarteCtrl', function ($scope) {
    /*
    Solution 2 - déroulement :

    Clique sur bouton de recherche
    Récupération dans la base de données des personnes et des groupes < 4 personnes et non vérouillé
    */

    $scope.initMap = function() {
      var carte = {
        center:new google.maps.LatLng(48.110992,-1.667973),
        zoom:13,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("map"),carte);

      //création du marqueur
      var marqueur = new google.maps.Marker({
        position: new google.maps.LatLng(48.110992,-1.667973),
        map: map
      });

      var contenuInfoBulle = '<h1>Informations du groupe</h1>' +
        '<ul><li>Nom du groupe : Koujoukoujoukou</li>' +
        '<li>Nombre de personne : 2</li>' +
        '<li>Nom des personnes : Leon P., Yoann L.</li>' +
        '</ul>';

      var infoBulle = new google.maps.InfoWindow({
        content: contenuInfoBulle
      });

      //google.maps.event.addListener(marqueur,'mouseover', function() {
        //alert("Je suis dessus");
      //});

      //google.maps.event.addListener(marqueur,'mouseout', function() {
	/*code qui doit s'executer lors de l'evenement*/
      //});

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

--------------------------------------------------------------------
*/

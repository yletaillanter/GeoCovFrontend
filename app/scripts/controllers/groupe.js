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
/*
    if(!sessionStorage.loggedIn) {
      $location.path('/compte/auth');
    } else {
*/

/*
  //If user submits the form
  $("#submitmsg").click(function(){	
    var clientmsg = $("#usermsg").val();
    $.post("post.php", {text: clientmsg});				
    $("#usermsg").attr("value", "");
    return false;
  });
*/

/*
    $scope.initChat = function() {
      var mess = $("#message").val();

    };
*/

    $scope.initMapGroupe = function() {
      var centre = new google.maps.LatLng(48.110992,-1.667973);
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
        createMarker(position, map, myArray[it][2])
      }

    };

    function createMarker(position, map, nom){
      var marqueur = new google.maps.Marker({
        position: position,
        map: map
      });

      var contenuInfoBulle = '<p>' + nom +'</p>';

      var infoBulle = new google.maps.InfoWindow({
        content: contenuInfoBulle
      });
          
      google.maps.event.addListener(marqueur, 'click', function() {
        infoBulle.open(map, marqueur);
      });
    }


 // }
});


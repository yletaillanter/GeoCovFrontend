'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:ClusterCtrl
 * @description
 * # ClusterCtrl
 * Controller of the geocovApp
 */
angular.module('geocovApp')
	//TODO j'ai remis la factory ici car sa permet d'avoir la factory lié au controller directement dans le même fichier
	.factory('Contact', function($resource) {
		return $resource('http://localhost\:8080/client/:id', {id:'@id'});
	})
	.factory('ContactAuth', function($resource) {
		return $resource('http://localhost\:8080/client/auth');
	})
	.controller('CompteCtrl', function ($scope, $routeParams, Contact) {

	})
	.controller('CompteCtrlAuth', function ($scope, $routeParams, ContactAuth, $cookieStore) {
	  $scope.log = function(contact) {
			// Comment récupérer une valeur au cookie
			// console.log($cookieStore.get(sessionStorage.loggedIn));
			var newContact = new ContactAuth();
			newContact.email = contact.email;
			newContact.password = contact.password;
			newContact.$save().then(
				function(responseOk) {
					console.log(contact);
					sessionStorage.loggedIn = true;
					sessionStorage.contact = JSON.stringify(responseOk);
					if(contact.remember) {
						//Comment insérer une valeur au cookie
						$cookieStore.put("loggedIn", true);
						$cookieStore.put("contact", responseOk);
					}
				},
				function(error) {
					alert("error");
				}
			)
		};

		$scope.reset = function() {
				$scope.contact = angular.copy({});
		};

	})
	.controller('CompteCtrlEnre', function ($scope, $routeParams, Contact) {
		$scope.add = function(contact) {
			var newContact = new Contact();
			newContact.name = contact.name;
			newContact.lastname = contact.lastname;
			newContact.username = contact.username;

			// TODO Manque le champs cpassword du coup pas de verification possible est plantage directement
			// if(contact.password!==contact.cpassword){
			// 	return false;
			// }

			newContact.password = contact.password;
			//newContact.cpassword = contact.cpassword;
			newContact.email = contact.email;
			newContact.phone = contact.phone;
			newContact.city = contact.city;
			newContact.street = contact.street;
			newContact.street = contact.street;
			//TODO normalement pas d'id ici car client pas encore créé
			//du coup le $routeParams ne vas rien récupérer dans l'url
			// newContact.contactId = $routeParams.contactId;

			console.log(newContact);

			newContact.$save();
		};

		$scope.reset = function() {
				$scope.contact = angular.copy({});
		};
	});

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
	.controller('CompteCtrl', function ($scope, $routeParams, Contact) {

	})
	.controller('CompteCtrlAuth', function ($scope, $routeParams) {
		$scope.reset = function() {
				$scope.contact = angular.copy({});
		};
	})
	.controller('CompteCtrlEnre', function ($scope, $routeParams, Contact) {
		$scope.add = function(contact) {
							var newContact = new Contact;
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

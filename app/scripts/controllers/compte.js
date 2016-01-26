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
	//Factory utilisé pour la connexion
	.factory('Auth', function($resource) {
		return $resource('http://localhost\:8080/client/auth');
	})
	.controller('CompteCtrl', function ($scope, $routeParams, $location, Contact) {
		//Si on est pas connecté, alors redirection vers le formulaire de connexion
		if(!sessionStorage.loggedIn) {
			$location.path('/compte/auth');
		}

	})
	.controller('CompteCtrlAuth', function ($scope, $routeParams, $location, Auth, $cookieStore) {
		//Si connecté alors impossible de se connecter à nouveau
		if(sessionStorage.loggedIn) {
			$location.path('/compte');
		}

	  $scope.log = function(contact) {
			// Comment récupérer une valeur au cookie
			// console.log($cookieStore.get(sessionStorage.loggedIn));
			var newContact = new Auth();
			newContact.email = contact.email;
			newContact.password = contact.password;
			newContact.$save().then(
				function(responseOk) {
					sessionStorage.loggedIn = true;
					sessionStorage.contact = JSON.stringify(responseOk);
					if(contact.remember) {
						//Comment insérer une valeur au cookie
						$cookieStore.put("loggedIn", true);
						$cookieStore.put("contact", responseOk);
					}
					$location.path('/compte');
				},
				function(error) {
					alert(error);
				}
			);
		};

		$scope.reset = function() {
				$scope.contact = angular.copy({});
		};

	})
	.controller('CompteCtrlEnre', function ($scope, $location, $routeParams, Contact) {
		//Si connecté alors impossible de se connecter à nouveau
		if(sessionStorage.loggedIn) {
			$location.path('/compte');
		}

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

			//Connexion de l'utilisateur si son inscription est ok
			newContact.$save()
				function(responseOk) {
					sessionStorage.loggedIn = true;
					sessionStorage.contact = JSON.stringify(responseOk);
					if(contact.remember) {
						//Comment insérer une valeur au cookie
						$cookieStore.put("loggedIn", true);
						$cookieStore.put("contact", responseOk);
					}
					$location.path('/compte');
				},
				function(error) {
					alert(error);
				}
			);
		};

		$scope.reset = function() {
				$scope.contact = angular.copy({});
		};
	})
	.controller('CompteCtrlDeco', function ($scope, $location) {
		//Si on est pas connecté, alors redirection vers le formulaire de connexion
		console.log('coucou');
		sessionStorage.clear();
		$location.path('/compte/auth');
	});

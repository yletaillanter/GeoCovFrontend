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

		$scope.contact = JSON.parse(sessionStorage.contact);

	})
	.controller('CompteCtrlAuth', function ($scope, $routeParams, $location, $cookies, Auth) {
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
						$cookies.put("loggedIn", true);
						$cookies.putObject("contact", responseOk.toJSON());
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
	.controller('CompteCtrlEnre', function ($scope, $location, $routeParams, $cookies, Contact) {
		//Si connecté alors impossible de se connecter à nouveau
		if(sessionStorage.loggedIn) {
			$location.path('/compte');
		}

		$scope.add = function(contact) {
			var newContact = new Contact();
			if(contact.password!==contact.cpassword){
				return false;
			}
			newContact.name = contact.name;
			newContact.lastname = contact.lastname;
			newContact.password = contact.password;
			newContact.email = contact.email;
			newContact.phone = contact.phone;

			//Connexion de l'utilisateur si son inscription est ok
			newContact.$save().then(
				function(responseOk) {
					sessionStorage.loggedIn = true;
					sessionStorage.contact = JSON.stringify(responseOk);
					if(contact.remember) {
						//Comment insérer une valeur au cookie
						$cookies.put("loggedIn", true);
						$cookies.putObject("contact", responseOk.toJSON());
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
		sessionStorage.clear();
		$location.path('/compte/auth');
	});

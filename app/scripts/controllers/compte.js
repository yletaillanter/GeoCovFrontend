'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:CompteCtrl
 * @description
 * # CompteCtrl
 * Ensemble des controllers permettant la gestion du compte utilisateur
 */
angular.module('geocovApp')

	// Factory utilisé pour les requêtes global d'un crud : GET, POST, PUT, DELETE
	.factory('Contact', function($resource) {
		return $resource('http://localhost\:8080/client/:id', {id:'@id'}, {
			'update': { method:'PUT' }}
		);
	})
	// Factory utilisé pour la connexion
	.factory('Auth', function($resource) {
		return $resource('http://localhost\:8080/client/auth');
	})

	/**
	 * Controller utilisé pour l'affichage de données de la page 'Mon Compte'
	 * Ses données sont récupérer depuis la session de l'utilisateur.
	 */
	.controller('CompteCtrl', function ($scope, $location) {
		//Si on est pas connecté, alors redirection vers le formulaire de connexion
		if(!sessionStorage.loggedIn) {
			$location.path('/compte/auth');
		}
		/*
			Récupére l'objet contact de la session
			L'objet est stocké sous forme JSON il est donc nécessaire de le parser pour le retransformer en objet
		*/
		$scope.contact = JSON.parse(sessionStorage.contact);

	})
	/**
	 * Controller utilisé pour le formulaire de connexion
	 */
	.controller('CompteCtrlAuth', function ($scope, $location, $cookies, Auth) {
		//Si connecté alors impossible de se connecter à nouveau
		if(sessionStorage.loggedIn) {
			$location.path('/compte');
		}

		/**
		 * Fonction permettant de récupérer les données du formulaire de connexion
		 * Puis de lancer l'étape d'authentification avec le serveur.
		 */
	  $scope.log = function(contact) {
			// On instancie notre factory Auth permettant de lancer une requête d'authentification au serveur.
			var newContact = new Auth();
			newContact.email = contact.email;
			newContact.password = contact.password;
			// On lance la requête post d'authentification et on traite le résultat.
			newContact.$save().then(
				// La première fonction sert pour la réponse positive du serveur.
				function(data) {
					// On instancie la session en lui indiquant l'étât.
					sessionStorage.loggedIn = true;
					sessionStorage.contact = JSON.stringify(data);
					// Si la case se souvenir de moi est coché, alors on instancie les cookies en plus des sessions.
					if(contact.remember) {
						//Comment insérer une valeur au cookie
						$cookies.put("loggedIn", true);
						$cookies.putObject("contact", data.toJSON());
					}
					// On redirige à la suite de la connexion sur la page 'Mon compte'
					$location.path('/compte');
				},
				// La seconde fonction pour la réponse négative du serveur.
				function(error) {
					console.log(error);
				}
			);
		};

		/**
		 * Fonction permettant de réinitialiser le formulaire de connexion
		 */
		$scope.reset = function() {
				$scope.contact = angular.copy({});
		};
	})
	/**
	 * Controller utilisé pour le formulaire d'inscription
	 */
	.controller('CompteCtrlEnre', function ($scope, $location, $cookies, Contact) {
		//Si connecté alors impossible de se connecter à nouveau
		if(sessionStorage.loggedIn) {
			$location.path('/compte');
		}

		/**
		 * Fonction permettant de récupérer les données du formulaire d'inscription
		 * Puis de lancer l'étape d'inscription avec le serveur.
		 */
		$scope.add = function(contact) {
			var newContact = new Contact();
			// Vérification de la conformité des deux mots de passe
			if(contact.password!==contact.cpassword){
				return false;
			}
			newContact.name = contact.name;
			newContact.lastname = contact.lastname;
			newContact.password = contact.password;
			newContact.email = contact.email;
			newContact.phone = contact.phone;

			// Envoie de la requête d'inscription au serveur
			newContact.$save().then(
				// Si la réponse est ok, alors on connect l'utilisateur
				function(data) {
					sessionStorage.loggedIn = true;
					sessionStorage.contact = JSON.stringify(data);
					// Si la case se souvenir de moi est coché alors on stock le client en cookies
					if(contact.remember) {
						//Comment insérer une valeur au cookie
						$cookies.put("loggedIn", true);
						$cookies.putObject("contact", data.toJSON());
					}
					// Redirection vers la page 'Mon compte'
					$location.path('/compte');
				},
				function(error) {
					console.log(error);
				}
			);
		};

		// Fonction permettant de réinitialiser le formulaire d'inscription
		$scope.reset = function() {
				$scope.contact = angular.copy({});
		};
	})
	/**
	 * Controller utilisé pour la modification des données personnel
	 */
	.controller('CompteCtrlUpdate', function ($scope, $location, $cookies, Contact) {
		if(!sessionStorage.loggedIn) {
			$location.path('/compte/auth');
		}

		// On récupére les données du contact stocké dans la session pour pouvoir l'afficher dans le formulaire
		$scope.contact = JSON.parse(sessionStorage.contact);

		/**
		 * Fonction permettant de récupérer les données du formulaire de mise à jour
		 * Puis de lancer l'étape de mise à jour avec le serveur.
		 */
		$scope.update = function(contact) {
			var updateContact = new Contact();
			// On récupére l'ID de l'utilisateur afin de pouvoir le retrouver par la suite.
			updateContact.id = $scope.contact.id;
			updateContact.name = contact.name;
			updateContact.lastname = contact.lastname;
			updateContact.email = contact.email;
			updateContact.phone = contact.phone;
			if (contact.password === contact.cpassword) {
				updateContact.password = contact.password;
			}

			// Envoie de la requête de mise à jour au serveur
			updateContact.$update().then(
				function(data) {
					sessionStorage.contact = JSON.stringify(data);
					if ($cookies.get("loggedIn")) {
						$cookies.putObject("contact", data.toJSON());
					}
					// Redirection vers la page 'Mon compte'
					$location.path('/compte');
				},
				function(error) {
						console.log(error);
				}
			);
		};

		// Fonction permettant de réinitialiser le formulaire de mise à jours des informations personnels
		$scope.reset = function() {
				$scope.contact = angular.copy({});
		};
	})
	/**
	 * Controller utilisé pour la modification d'une adresse
	 */
	.controller('CompteCtrlAdresse', function ($scope, $location, $cookies, Contact) {
		if(!sessionStorage.loggedIn) {
			$location.path('/compte/auth');
		}

		// On récupére les données du contact stocké dans la session pour l'id du client
		$scope.contact = JSON.parse(sessionStorage.contact);

		/**
		 * Fonction permettant de récupérer les données du formulaire d'ajout d'adresse
		 */
		$scope.updateAd = function(adresse) {
			var updateContact = new Contact();
			// On récupére l'ID de l'utilisateur afin de pouvoir le retrouver par la suite.
			updateContact.id = $scope.contact.id;
			// On concatène toute l'adresse pour requêter les coordonnées GPS à Google
			var adresseConcat = adresse.numero+" "+adresse.rue+" "+adresse.cp+" "+adresse.ville;
			// On effectue la requête à Google
			var geo = new google.maps.Geocoder();
			geo.geocode({'address':adresseConcat},function(results, status){
				// Si google nous renvois de bon résultat.
				if (status === google.maps.GeocoderStatus.OK) {
					// On envoie les données a une fonction permettant de faire l'ajout
					// quand on reçoit les données et pas à un autre moment
					// Voir requête ajax asynchrone
					$scope.setLatLong(results[0].geometry.location.lat(),results[0].geometry.location.lng(), updateContact, adresse);
				}
				// Sinon on print l'erreur dans la console
				else {
					console.log('Geocode was not successful for the following reason: ' + status);
				}
			});
		};

		/**
		 * Fonction permettant de lancer l'étape de mise à jour pour une adresse avec le serveur.
		 */
		$scope.setLatLong = function(lat, lng, client, adresse){
			adresse.latitude = lat;
			adresse.longitude = lng;
			client.adresses = [adresse];
			//Permet d'effectuer la requête au serveur
			client.$update().then(
				// Si la réponse du serveur est positive alors on met à jours nos informations stocké en session
				function(data) {
					sessionStorage.contact = JSON.stringify(data);
					if ($cookies.get("loggedIn")) {
						$cookies.putObject("contact", data.toJSON());
					}
					// Redirection vers la page 'Mon compte'
					$location.path('/compte');
				},
				function(error) {
						console.log(error);
				}
			);;
		};

		// Fonction permettant de réinitialiser le formulaire de mise à jours des informations personnels
		$scope.reset = function() {
				$scope.contact = angular.copy({});
		};
	})
	/**
	 * Controller utilisé pour la deconnexion à notre session
	 */
	.controller('CompteCtrlDeco', function ($scope, $location) {
		//Si on est pas connecté, alors redirection vers le formulaire de connexion
		sessionStorage.clear();
		$location.path('/compte/auth');
	});

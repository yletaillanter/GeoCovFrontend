'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geocovApp
 */
geocovApp
	//TODO j'ai remis la factory ici car sa permet d'avoir la factory lié au controller directement dans le même fichier
	.factory('Contact', function($resource) {
		return $resource('http://localhost\:8080/client/:id', {id:'@id'});
	})
	.controller('MainCtrl', function ($scope, $routeParams, Contact) {
    // Using factory app/scripts/services/auth.js we store user data from app/data/auth.json to variable called users
    // auth.success(function(data){
	//   $scope.users = data;
	// });

	//TODO la fonction doit être mise dans un controller à pars sinon il essaye de lancer sans l'initialiser
	//il peut y avoir plusieurs controller dans le même fichier, il suffit juste de faire à la suite un .controller à nouveau
	// get all contacts
	// $scope.contacts = Contact.query();

	//TODO même chose que pour le Contact.query()
	// get one contact by this id
	// $scope.contact = Contact.get({ id:$routeParams.contactId });

	// to add a contact
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

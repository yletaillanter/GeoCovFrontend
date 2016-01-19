'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geocovApp
 */
geocovApp.controller('MainCtrl', ['$scope', '$routeParams', 'Contact', function ($scope, $routeParams, Contact) {
    // Using factory app/scripts/services/auth.js we store user data from app/data/auth.json to variable called users
    // auth.success(function(data){
	//   $scope.users = data;
	// });

	// get all contacts
	$scope.contacts = Contact.query();

	// get one contact by this id
	$scope.contact = Contact.get({ id:$routeParams.contactId });

	// to add a contact
	$scope.add = function(contact) {
            var newContact = new Contact;
            newContact.name = contact.name;
            newContact.lastname = contact.lastname;
            newContact.username = contact.username;

            if(contact.password!==contact.cpassword){
            	return false;
            }

            newContact.password = contact.password;
            newContact.cpassword = contact.cpassword;
            newContact.email = contact.email;
            newContact.phone = contact.phone;
            newContact.city = contact.city;
            newContact.street = contact.street;
            newContact.street = contact.street;
            newContact.contactId = $routeParams.contactId;

            console.log(newContact);
            
            newContact.$save();
        };

    $scope.reset = function() {
        $scope.contact = angular.copy({});
    };
  }]);

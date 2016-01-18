'use strict';

/**
 * @ngdoc function
 * @name geocovApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geocovApp
 */
geocovApp.controller('MainCtrl', ['$scope', 'auth', function ($scope, auth) {
    // Using factory app/scripts/services/auth.js we store user data from app/data/auth.json to variable called users
    auth.success(function(data){
	  $scope.users = data;
	});
  }]);

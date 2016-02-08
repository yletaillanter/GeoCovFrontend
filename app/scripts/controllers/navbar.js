'use strict'

angular.module('geocovApp')
  //Add address controller, used to split correcly each controller
  .controller('HeaderController', function ($scope, $location) {
  	console.log('test')
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  });
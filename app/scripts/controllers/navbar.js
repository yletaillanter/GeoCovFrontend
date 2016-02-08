'use strict'

angular.module('geocovApp')
  //Add address controller, used to split correcly each controller
  .controller('HeaderController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      if ($location.path() === '/' && viewLocation === '/home') {
        return true;
      } else if ($location.path() !== '/') {
        return ($location.path().indexOf(viewLocation) > -1);
      }
    };
  });

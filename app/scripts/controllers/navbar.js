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

    $scope.$watch(function () { return sessionStorage.loggedIn },
      function (value) {
        if(!value) {
          $scope.hash = "auth"
          $scope.sign = "Se connecter"
        } else {
          $scope.hash = "loggout"
          $scope.sign = "Se déconnecter"
        }
      }
    );
  });

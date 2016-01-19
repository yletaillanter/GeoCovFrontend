"use strict"
/*
geocovApp.factory('auth', ['$http', function($http){
	// User data temporary stored in data/auth.json . Modify this file, when you'll connect with DB

	return $http.get('data/auth.json').success(function(data){
		    return data;
		  }).error(function(err){
		    return err;
  });
}]);
*/

//Factory device to use $resource instead $http for the rest request
geocovApp.factory('Contact', function($resource) {
    return $resource('http://localhost\:8080/client/:id', {id:'@id'});
});
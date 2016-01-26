'use strict';

/**
 * @ngdoc overview
 * @name geocovApp
 * @description
 * # geocovApp
 *
 * Main module of the application.
 */
var geocovApp = angular.module('geocovApp', ['ngAnimate','ngCookies','ngResource','ngRoute','ngSanitize','ngTouch']);

geocovApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/compte', {
        templateUrl: 'views/compte.html',
        controller: 'CompteCtrl',
        controllerAs: 'compte'
      })
      .when('/compte/auth', {
        templateUrl: 'views/auth.html',
        controller: 'CompteCtrlAuth',
        controllerAs: 'compteAuth'
      })
      .when('/compte/register', {
        templateUrl: 'views/register.html',
        controller: 'CompteCtrlEnre',
        controllerAs: 'compteEnre'
      })
      .when('/compte/loggout', {
        //TODO Soit trouvé une methode ou il est possible de ne pas indiqué de templateURL car inutile pour la déconnexion
        //Soit trouvé une autre methode plus prore
        //Soit créer une vue vide juste pour ça ? ...
        templateUrl: 'views/auth.html',
        controller: 'CompteCtrlDeco',
        controllerAs: 'compteDeco'
      })
      .when('/carte', {
        templateUrl: 'views/carte.html',
        controller: 'CarteCtrl',
        controllerAs: 'carte'
      })
      .when('/adresse', {
        templateUrl: 'views/adresse.html',
        controller: 'AdresseAddCtrl',
        controllerAs: 'adresse'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$cookieStore', function($cookieStore) {
    //Si un cookie existe alors on log la personne automatiquement
    if($cookieStore.get('loggedIn')) {
      sessionStorage.loggedIn = $cookieStore.get('loggedIn');
      sessionStorage.contact = $cookieStore.get('contact');
    }
  }]);

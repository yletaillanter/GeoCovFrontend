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
      .when('/compte/update', {
        templateUrl: 'views/update.html',
        controller: 'CompteCtrlUpdate',
        controllerAs: 'compteUpdate'
      })
      .when('/compte/updateAd', {
        templateUrl: 'views/adresse.html',
        controller: 'CompteCtrlAdresse',
        controllerAs: 'compteAdresse'
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
     .when('/groupe', {
        templateUrl: 'views/groupe.html',
        controller: 'GroupeCtrl',
        controllerAs: 'groupe'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$cookies', function($cookies) {
    //Si un cookie existe alors on log la personne automatiquement
    if($cookies.get('loggedIn')) {
      sessionStorage.loggedIn = $cookies.get('loggedIn');
      sessionStorage.contact = JSON.stringify($cookies.getObject('contact'));
    }
  }]);

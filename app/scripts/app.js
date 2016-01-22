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
        controllerAs: 'main'
      })
      .when('/compte/register', {
        templateUrl: 'views/register.html',
        controller: 'CompteCtrlEnre',
        controllerAs: 'main'
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
  }]);

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
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/cluster', {
        templateUrl: 'views/cluster.html',
        controller: 'ClusterCtrl',
        controllerAs: 'cluster'
      })
      .when('/address', {
        templateUrl: 'views/address.html',
        controller: 'AddressAddCtrl',
        controllerAs: 'address'
      }) 
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

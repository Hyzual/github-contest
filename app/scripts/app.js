'use strict';

/**
 * @ngdoc overview
 * @name githubContestApp
 * @description
 * # githubContestApp
 *
 * Main module of the application.
 */
angular
  .module('githubContestApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

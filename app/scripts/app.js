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

      .otherwise({
        redirectTo: '/'
      });
  });

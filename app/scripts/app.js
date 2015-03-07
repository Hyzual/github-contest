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
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/scores", {
        templateUrl: "views/scores.html"
      })
      .otherwise({
        redirectTo: '/'
      });
  });

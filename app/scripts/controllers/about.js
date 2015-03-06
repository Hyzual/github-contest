'use strict';

/**
 * @ngdoc function
 * @name githubContestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the githubContestApp
 */
angular.module('githubContestApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

angular.module('githubContestApp')
.controller('MainController', ['$scope', 'Github', function($scope, Github){
  $scope.contestants = [];

  $scope.battle = function () {
    Github.getUserInfo();
  };
}]);

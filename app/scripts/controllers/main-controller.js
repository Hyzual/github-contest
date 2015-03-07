'use strict';

angular.module('githubContestApp')
.controller('MainController', ['$scope', '$location', 'Score', function($scope, $location, Score) {

  $scope.contestants = [];

  var search = $location.search();
  if (search.contestant) {
    $scope.contestants.push({username: search.contestant});
  }
  if (search.rival) {
    $scope.contestants.push({username: search.rival});
  }


  $scope.battle = function () {
    Score.computeAll($scope.contestants).then(function (contestants) {
      $scope.contestants = contestants;
      $location.url("/scores?contestant="+contestants[0].username+"&rival="+contestants[1].username);
    });
  };

  $scope.max = function (contestants, criteria) {
    var maxCriteria = _(contestants).max(function (contestant) {
      return contestant[criteria];
    });
    return maxCriteria[criteria];
  };
}]);

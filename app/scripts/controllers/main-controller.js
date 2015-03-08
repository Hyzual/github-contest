'use strict';

angular.module('githubContestApp')
.controller('MainController', ['$scope', '$location', '$window', 'Score', function($scope, $location, $window, Score) {

  $scope.battle = function () {
    var contestants = $scope.usernames;
    Score.computeAll(contestants).then(function (ratedContestants) {
      $scope.contestant = ratedContestants[0];
      $scope.rival = ratedContestants[1];
      $scope.contestants = ratedContestants;
      $location.url("/scores?contestant="+$scope.contestant.username+"&rival="+$scope.rival.username);
      $scope.share.url = encodeURIComponent($location.absUrl());
    }, function (error) {
      $window.alert(error);
    });
  };

  $scope.validUsernames = function () {
    return _($scope.usernames).every(function (obj) {
      return obj.username !== undefined && obj.username !== "";
    });
  };

  $scope.max = function (contestants, criteria) {
    var maxObj = _(contestants).max(function (contestant) {
      return contestant[criteria];
    });
    return maxObj[criteria];
  };

  $scope.atMax = function(contestant, criteria) {
    var atmax = angular.equals(contestant[criteria], $scope.max($scope.contestants, criteria));
    return (atmax) ? "warning" : "";
  };

  $scope.winner = function(contestants) {
    var winner = _(contestants).max(function (contestant) {
      return contestant.score;
    });
    return winner;
  };

  // At startup
  $scope.contestant = {};
  $scope.rival = {};
  $scope.usernames = [{}, {}];
  $scope.share = {
    url: encodeURIComponent($location.absUrl())
  };

  var search = $location.search();
  $scope.usernames[0].username = (search.contestant) ? search.contestant : "";
  $scope.usernames[1].username = (search.rival) ? search.rival : "";
  $scope.contestants = [$scope.contestant, $scope.rival];
  if(search.contestant && search.rival) {
    $scope.battle();
  }

}]);

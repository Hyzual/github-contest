'use strict';

/**
 * @ngdoc service
 * @name githubContestApp.github
 * @description
 * # github
 * Service in the githubContestApp.
 */
angular.module("githubContestApp")
.service("Github", ["$http", function($http){

  this.getUserInfo = function () {
    return $http.get("https://api.github.com/users/hyzual", {
      params: {

      }
    }).then(function (userInfo) {
      console.log("userInfo", userInfo);
    }, function (error) {
      console.log("error", error);
    });
  };
}]);

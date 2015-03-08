'use strict';

angular.module("githubContestApp")
.service("Github", ["$http", "$q", function($http, $q){

  this.getUserInfo = function (username) {
    if (username !== undefined && username !== "") {
      return $http.get("https://api.github.com/users/" + username, {
        cache: true
      }).then(function (result) {
        if(result.data !== undefined) {
          return {
            "username": username,
            "avatarUrl": result.data.avatar_url,
            "publicRepos": result.data.public_repos,
            "publicGists": result.data.public_gists,
            "followers": result.data.followers,
            "following": result.data.following
          };
        }
      });
    } else {
      $q.reject({reason: "Error: username is empty"});
    }
  };
}]);

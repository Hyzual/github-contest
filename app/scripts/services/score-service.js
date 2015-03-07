"use strict";

angular.module('githubContestApp')
.factory('Score', ['$q', 'Github', function($q, Github){

  var scores = {
    publicRepos: 10,
    publicGists: 3,
    followers: 2,
    following: 1
  };

  var ScoreService = {
    computeAll: function(contestants) {
      var deferred = $q.defer();
      var ratedContestants = [];

      // Get contestant info from Github
      for (var i = 0; i < contestants.length; i++) {
        var contestant = {
          username: contestants[i].username,
          publicRepos: 33,
          publicGists: 56,
          followers: 69,
          following: 29
        };

        contestant.score = ScoreService.computeFor(contestant);
        ratedContestants.push(contestant);
      }
      deferred.resolve(ratedContestants);
      return deferred.promise;
    },

    computeFor: function(contestant) {
      var score = 0;
      score += (contestant.publicRepos) ? (contestant.publicRepos * scores.publicRepos) : 0;
      score += (contestant.publicGists) ? (contestant.publicGists * scores.publicGists) : 0;
      score += (contestant.followers) ? (contestant.followers * scores.followers) : 0;
      score += (contestant.following) ? (contestant.following * scores.following) : 0;

      return score;
    }
  };
  return ScoreService;
}]);

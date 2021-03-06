angular.module('githubcontest.score.service', ['githubcontest.github.service'])
.factory('Score', ['$q', 'Github', function($q, Github){
  "use strict";

  var scores = {
    publicRepos: 10,
    publicGists: 3,
    followers: 2,
    following: 1
  };

  var ScoreService = {
    computeAll: function(contestants) {
      var ratedContestants = [];

      // Get contestant info from Github
      for (var i = 0; i < contestants.length; i++) {
        var contestant = contestants[i];
        var promise = Github.getUserInfo(contestant.username).then(function (userInfo) {
          userInfo.score = ScoreService.computeFor(userInfo);
          return userInfo;
        }, function (error) {
          var message = "";
          if(error.status) {
            message = error.status + " " + error.statusText;
          } else if (error.reason) {
            message = error.reason;
          }
          return $q.reject(message);
        });
        ratedContestants.push(promise);
      }
      return $q.all(ratedContestants);
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

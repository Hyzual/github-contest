"use strict";angular.module("githubContestApp",["ngRoute","ui.bootstrap","githubcontest.controller"]).config(["$routeProvider",function(a){a.when("/scores",{templateUrl:"views/scores.html"}).otherwise({redirectTo:"/"})}]),angular.module("githubcontest.github.service",[]).service("Github",["$http","$q",function(a,b){this.getUserInfo=function(c){return void 0!==c&&""!==c?a.get("https://api.github.com/users/"+c,{cache:!0}).then(function(a){return void 0!==a.data?{username:c,avatarUrl:a.data.avatar_url,publicRepos:a.data.public_repos,publicGists:a.data.public_gists,followers:a.data.followers,following:a.data.following}:void 0}):void b.reject({reason:"Error: username is empty"})}}]),angular.module("githubcontest.score.service",["githubcontest.github.service"]).factory("Score",["$q","Github",function(a,b){var c={publicRepos:10,publicGists:3,followers:2,following:1},d={computeAll:function(c){for(var e=[],f=0;f<c.length;f++){var g=c[f],h=b.getUserInfo(g.username).then(function(a){return a.score=d.computeFor(a),a},function(b){var c="";return b.status?c=b.status+" "+b.statusText:b.reason&&(c=b.reason),a.reject(c)});e.push(h)}return a.all(e)},computeFor:function(a){var b=0;return b+=a.publicRepos?a.publicRepos*c.publicRepos:0,b+=a.publicGists?a.publicGists*c.publicGists:0,b+=a.followers?a.followers*c.followers:0,b+=a.following?a.following*c.following:0}};return d}]),angular.module("githubcontest.controller",["githubcontest.score.service","angular-underscore/utils"]).controller("MainController",["$scope","$location","$window","Score",function(a,b,c,d){a.battle=function(){var e=a.usernames;d.computeAll(e).then(function(c){a.contestant=c[0],a.rival=c[1],a.contestants=c,b.url("/scores?contestant="+a.contestant.username+"&rival="+a.rival.username),a.share.url=encodeURIComponent(b.absUrl())},function(a){c.alert(a)})},a.validUsernames=function(){return _(a.usernames).every(function(a){return void 0!==a.username&&""!==a.username})},a.max=function(a,b){var c=_(a).max(function(a){return a[b]});return c[b]},a.atMax=function(b,c){var d=angular.equals(b[c],a.max(a.contestants,c));return d?"warning":""},a.winner=function(a){var b=_(a).max(function(a){return a.score});return b},a.contestant={},a.rival={},a.usernames=[{},{}],a.share={url:encodeURIComponent(b.absUrl())};var e=b.search();a.usernames[0].username=e.contestant?e.contestant:"",a.usernames[1].username=e.rival?e.rival:"",a.contestants=[a.contestant,a.rival],e.contestant&&e.rival&&a.battle()}]);
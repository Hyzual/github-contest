"use strict";

describe("score-service", function() {
  var Score, contestant, Github, deferred, scope;
  beforeEach(function() {
    module('githubcontest.score.service', function ($provide) {
      // Mock the Github service
      $provide.decorator('Github', function ($delegate, $q) {
        deferred = $q.defer();
        $delegate.getUserInfo = jasmine.createSpy("getUserInfo").and.returnValue(deferred.promise);
        return $delegate;
      });
    });

    inject(function (_Score_, _Github_, $rootScope) {
      Score = _Score_;
      Github = _Github_;
      scope = $rootScope.$new();
    });
    contestant = {};
  });

  it("Given a contestant with 1 public repo, when I compute her score, then 10 will be returned", function() {
    contestant.publicRepos = 1;
    var result = Score.computeFor(contestant);
    expect(result).toEqual(10);
  });

  it("Given a contestant with 1 public gist, when I compute her score, then 3 will be returned", function() {
    contestant.publicGists = 1;
    var result = Score.computeFor(contestant);
    expect(result).toEqual(3);
  });

  it("Given a contestant with 1 follower, when I compute her score, then 2 will be returned", function() {
    contestant.followers = 1;
    var result = Score.computeFor(contestant);
    expect(result).toEqual(2);
  });

  it("Given a contestant following 1 person, when I compute her score, then 1 will be returned", function() {
    contestant.following = 1;
    var result = Score.computeFor(contestant);
    expect(result).toEqual(1);
  });

  it("Given an array of contestant usernames, when I compute all the scores, then each contestant's score will be computed and the contestants will be returned", function() {
    spyOn(Score, 'computeFor').and.returnValue(2);
    var contestants = ["Bodo", "Loehrs"];

    var promise = Score.computeAll(contestants);
    deferred.resolve({});
    scope.$apply();

    expect(Score.computeFor.calls.count()).toEqual(2);
    expect(promise).toBeResolvedWith({
      username: "Bodo",
      score: 2
    }, {
      username: "Loehrs",
      score: 2
    });
  });
});

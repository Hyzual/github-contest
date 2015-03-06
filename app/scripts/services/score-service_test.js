"use strict";

describe("score-service", function() {
  var Score, contestant;
  beforeEach(function() {
    module('githubContestApp', function ($provide) {
      // Mock the Github service
      $provide.decorator('Github', function ($delegate) {

        return $delegate;
      });
    });

    inject(function (_Score_) {
      Score = _Score_;
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

  it("Given an array of contestant usernames, when I compute all the scores, then each contestant's score will be computed", function() {
    spyOn(Score, 'computeFor');
    var contestants = ["Bodo", "Loehrs"];

    Score.computeAll(contestants);

    expect(Score.computeFor.calls.count()).toEqual(2);
  });
});

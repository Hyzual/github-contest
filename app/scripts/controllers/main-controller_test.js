'use strict';

describe("main-controller", function() {

  var mainController, scope, Score;
  beforeEach(function() {
    module('githubContestApp');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();

      Score = jasmine.createSpyObj("Score", ["computeAll"]);

      mainController = $controller('MainController', {
        $scope: scope,
        Score: Score
      });
    });
  });

  it("Given an array of two contestants and a criteria and given that the first contestant's criteria is 3 and the second's is 5, when I compute the criteria's maximum value, then 5 will be returned", function() {
    var contestants = [
      {
        criteria: 3
      }, {
        criteria: 5
      }
    ];

    var result = scope.max(contestants, "criteria");

    expect(result).toEqual(5);
  });
});

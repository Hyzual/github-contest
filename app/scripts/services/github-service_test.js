'use strict';

describe("Github service", function() {
  var Github, mockBackend;
  beforeEach(function() {
    module("githubcontest.github.service");

    inject(function (_Github_, $httpBackend) {
      Github = _Github_;
      mockBackend = $httpBackend;
    });
  });

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
  });

  it("Given a username that is not empty, when I get this user's info, then a promise will be resolved with an object containing the user's info", function() {
    var response = {
      "login": "Shramek",
      "id": 92,
      "avatar_url": "http://sawarra.com/frigostable/corrector?a=kale&b=abscissa#thrombokinase",
      "public_repos": 51,
      "public_gists": 21,
      "followers": 73,
      "following": 7
    };
    mockBackend.expectGET('https://api.github.com/users/Shramek').respond(JSON.stringify(response));

    var promise = Github.getUserInfo("Shramek");
    mockBackend.flush();

    expect(promise).toBeResolvedWith({
      "username": "Shramek",
      "avatarUrl": "http://sawarra.com/frigostable/corrector?a=kale&b=abscissa#thrombokinase",
      "publicRepos": 51,
      "publicGists": 21,
      "followers": 73,
      "following": 7
    });
  });
});

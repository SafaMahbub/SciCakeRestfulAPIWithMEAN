
const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3001/api',
  json: true
});

describe('Users API Tests:', function () {

  let jwtToken = '';

  beforeAll(function (done) {
    api.post({
      url: '/login',
      body: {
        username: 'smahbub3',
        password: 'abcd'
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      jwtToken = body.token;
      done();
    });
  });
  
  it('User registration pass', function (done) {
    api.post({
      url: '/users',
      body: {
        "type": "USER",
        "position": "STUDENT",
        "eventOrganizer": false,
        "rewardProvider": false,
        "programs": [
            "5bff2cac7af7029baa8a45e8",
            "5bff2cac7af7029baa8a45e9"
        ],
        "firstname": "random",
        "lastname": "user",
        "username": "rUser",
        "password": "abcd",
        "email": "rUser@csula.edu"
      }
    }, function (err, res, body) {
        expect(res.statusCode).toBe(200);
        expect(res.body.firstname).toBe('random');
        expect(body.lastname).toBe('user');
      done();
    });
  });

  it('User registration fail', function (done) {
    api.post({
      url: '/users',
      body: {
        "type": "USER",
        "position": "STUDENT",
        "eventOrganizer": false,
        "rewardProvider": false,
        "programs": [
            "5bff2cac7af7029baa8a45e8",
            "5bff2cac7af7029baa8a45e9"
        ],
        "firstname": "random",
        "email": "rUser@csula.edu"
      }
    }, function (err, res, body) {
        expect(res.statusCode).toBe(200);
      done();
    });
  });

});
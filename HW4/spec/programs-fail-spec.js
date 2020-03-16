const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3001/api',
  json: true
});

describe('Program API Fail Tests:', function () {

  beforeAll(function (done) {
    api.post({
      url: '/login',
      body: {
        username: 'clagmay',
        password: 'abcd'
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      jwtToken = body.token;
      done();
    });
  });

  it('Create new program fail',  function (done) {
    api.post({
        url: '/programs',
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        },
        body: {
            "name": "hello",
            "fullname": "test add program",
            "description": "testing adding a program for rest"
        }
    },
        function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(res.body).toBe('Not ADMIN');
      done();
    });
  });



});
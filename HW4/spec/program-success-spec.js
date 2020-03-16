const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3001/api',
  json: true
});

describe('Program API Tests:', function () {

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

  it('Get All Programs', function (done) {
    api.get(
        {url: '/programs',},
        function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(res.body[0].name).toBe('ECST');
      expect(body[0].fullname).toBe('Engineering, Computer Sciecne, and Technology');
      expect(body[0].description).toBe('CS college');
      done();
    });
  });

  it('Get a Program by id', function (done) {
    api.get(
        {url: '/programs/5bff2cac7af7029baa8a45e8',},
        function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('ECST');
      expect(body.fullname).toBe('Engineering, Computer Sciecne, and Technology');
      expect(body.description).toBe('CS college');
      done();
    });
  });

  it('Create new program success',  function (done) {
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
      expect(res.body.name).toBe('hello');
      expect(body.fullname).toBe('test add program');
      expect(body.description).toBe('testing adding a program for rest');
      done();
    });
  });

  it('Edit a program success',  function (done) {
    api.post({
        url: '/programs',
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        },
        body: {
          "_id": "5bff2cac7af7029baa8a45e8",
          "name": "ECST2",
          "fullname": "test add program",
          "description": "testing adding a program to update"
        }
    },
        function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('ECST2');
      done();
    });
  });

});
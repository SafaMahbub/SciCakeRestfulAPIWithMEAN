const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3001/api',
  json: true
});

describe('Event API Tests:', function () {

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

      it('create Event success', function (done) {
        api.post({
            url: '/events',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            },
            body: {
                "attendees": [
                    "5bff2cac7af7029baa8a45eb",
                    "5bff2cac7af7029baa8a45ed"
                ],
                "tags": [
                    "5bff2cac7af7029baa8a45e7"
                ],
                "name": "Adding an Event to test the data",
                "description": "Checking Adding an Event",
                "location": "Postman",
                "organizer": "5bff2cac7af7029baa8a45ed",
                "admin": "5bff2cac7af7029baa8a45eb",
                "approved": false
            }
        },
            function (err, res, body) {
          expect(res.statusCode).toBe(200);
          expect(res.body.name).toBe("Adding an Event to test the data");
          done();
        });
      });

      it('approve Event success', function (done) {
        api.put({
            url: '/events/5bff2cac7af7029baa8a45ef',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        },
            function (err, res, body) {
          expect(res.statusCode).toBe(200);
          // expect(res.body.name).toBe("Adding an Event to test the data");
          done();
        });
      });


  it('Get Event Attenddees', function (done) {
    api.get({
        url: '/events/5bff2cac7af7029baa8a45ee/attendees',
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        },
    },
        function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body[0].attendees[0].firstname).toBe('Safa');
      expect(body[0].attendees[0].lastname).toBe('Mahbub');
      done();
    });
  });

  it('Get Event Attenddees', function (done) {
    api.put({
        url: '/events/5bff2cac7af7029baa8a45ee/attendees',
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        },
        body: {
          "_id": "5bff7e90c48ee4b500a23189"
        }
    },
        function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

});
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
            username: 'clagmay',
            password: 'abcd'
          }
        }, function (err, res, body) {
          expect(res.statusCode).toBe(200);
          jwtToken = body.token;
          done();
        });
      });

    //   it('create Event  fail', function (done) {
    //     api.post({
    //         url: '/events',
    //         headers: {
    //             'Authorization': 'Bearer ' + jwtToken
    //         },
    //         body: {
    //             "attendees": [
    //                 "5bff2cac7af7029baa8a45eb",
    //                 "5bff2cac7af7029baa8a45ed"
    //             ],
    //             "tags": [
    //                 "5bff2cac7af7029baa8a45e7"
    //             ],
    //             "description": "Checking Adding an Event",
    //             "location": "Postman",
    //             "organizer": "5bff2cac7af7029baa8a45ed",
    //             "admin": "5bff2cac7af7029baa8a45eb",
    //             "approved": false
    //         }
    //     },
    //         function (err, res, body) {
    //       expect(res.statusCode).toBe(200);
    //       done();
    //     });
    //   });

    it('approve Event fail', function (done) {
        api.put({
            url: '/events/5bff2cac7af7029baa8a45ef',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        },
            function (err, res, body) {
          expect(res.statusCode).toBe(200);
          done();
        });
      });

});
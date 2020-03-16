
const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3001/api',
  json: true
});

describe('Users API Tests:', function () {

  let jwtToken = '';
  it('User Login Success', function(done) {
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

  //   it('User Login Fail', function(done) {
//     api.post({
//         url: '/login',
//         body: {
//           username: 'smahbub3',
//         }
//       }, function (err, res, body) {
//         expect(res.statusCode).toBe(200);
//         jwtToken = body.token;
//         done();
//       });
//   });

});
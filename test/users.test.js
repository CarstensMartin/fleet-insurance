let expect = require('chai').expect;
let request = require('request');

describe('Status and content', function () {
    // describe function - groups tests together
    describe('Users page', function () {

        //It function - test only one specific behavior
        it('status', function (done) {
            request('http://localhost:3000/users',
                function (error, response, body) {
                    //Chai - Should, expect, assert
                    expect(response.statusCode).to.equal(200);
                    done();
                });
        });

        it('content', function (done) {
            request('http://localhost:3000/users',
                function (error, response, body) {
                    expect(body).to.equal('respond with a resource');
                    done();
                });
        });
    });
});
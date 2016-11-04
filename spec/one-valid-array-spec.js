var findServer = require('../index');
var serverArrays = require('./samples/sample-arrays');

describe("Module findServer(serverArray) test suite", function() {

	var testArray = serverArrays.withOneValid;
	var res = {};

	beforeEach(function(done) {

		findServer(testArray).then(function(results) {
			res = results;
			done();
		}).catch(function(error) {
			res = error;
			done();
		});

	});

	it("should return one server with valid response", function(done) {

		expect(res).toEqual({ url: 'http://google.com', priority: 4, statusCode: 200 });
		done();
	});

});

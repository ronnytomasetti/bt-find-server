var findServer = require('../index');
var serverArrays = require('./samples/sample-arrays');

describe("Module findServer(serverArray) test suite", function() {

	var testArray = serverArrays.emptyArray;
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

	it("should return no servers were online.", function(done) {

		expect(res).toEqual('Invalid server array');
		done();
	});

});

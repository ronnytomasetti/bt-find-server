/**
 * Dependencies
 */
var request = require('request');
var filter = require('lodash.filter');
var orderBy = require('lodash.orderby');

/**
 * Validates server array provided to ensure that only valid URLs are processed.
 * Priority values must also accompany URLs provided in order for this module
 * to return online server with lowest priority value.
 *
 * @method validateServerArray
 * @param  {Array} serverArray	Objects array containing urls and priority values.
 * @return {Array} validated	Filtered array of objects with urls and priorities.
 */
function validateServerArray(serverArray) {

	// Array needs to be compose of 'server' objects.
	// Each object containing url and priority key/value pair.
	// Returned ordered ascending based on value of priority.
	var containsUrls = filter(serverArray, 'url');
	var urlsWithPriority = filter(containsUrls, 'priority');
	var validated = orderBy(urlsWithPriority, ['priority']);

	// If validated is empty return false, else return validated array.
	return (validated.length === 0) ? false : validated;
}

/**
 * Wrapper Promise which resolves when GET request returns promise that is either
 * fulfilled or rejected. Contains status resolved/rejected along with parameter
 * value or error depending on final state.
 *
 * @method reflect
 * @param  {Promise} promise Takes in promise returned from request.get() calls.
 * @return {Promise} promise Resolved wrapper promise containing fulfilled params.
 */
function reflect(promise) {
	return promise.then(
		function(val) {
			return {
				status: 'resolved',
				server: val
			};
		},
		function(err) {
			return {
				status: 'rejected',
				server: err
			};
		});
}

/**
 * Creates get request with required (5) sec timeout for provided server url.
 * Returns new promise resolved if status code is between 200-299. Otherwise,
 * rejected with status code. Will reject with error message if request call
 * fails .on('error').
 *
 * @method requestServers
 * @param   {Object} server  Contains single server url and priority value.
 * @return {Promise} Promise Resolved/rejected promise based on get response.
 */
function requestServers(server) {

	var url = server.url;
	var priority = server.priority;

	return new Promise(function(resolve, reject) {

		request.get(url, {
			timeout: 5000
		}).on('response', function(response) {

			var statusCode = response.statusCode;

			if (statusCode >= 200 && statusCode < 300)
				resolve({
					url: url,
					priority: priority,
					statusCode: statusCode
				});
			else
				reject({
					url: url,
					priority: priority,
					statusCode: statusCode
				});

		}).on('error', function(error) {
			reject({
				url: url,
				priority: priority,
				error: error.message
			});
		});

	});
}

/**
 * Exported function used to find online server with lowest priority number.
 * Requires an array of server objects containing both url and priority values.
 * Function will first validate serverArray to unsure that there is at least
 * one object with url/priority. Once validated, get request called on each
 * server, succesful/failed responses are evaluated, and server with lowest
 * priority value is returned.
 *
 * @method findServer
 * @param    {Array} serverArray Objects array containing urls and priority values.
 * @return {Promise} promise 	 Resolved/rejected promise containing server details.
 */
function findServer(serverArray) {

	return new Promise(function(resolve, reject) {

		// Run serverArray variable through validation function.
		var validatedArray = validateServerArray(serverArray);

		if (!validatedArray)
			reject('Invalid server array');

		// Initialize empty array that will hold results from requestServers() calls.
		var requestResults = [];

		// Run through validated array and push returned promise to results array.
		for (var i = 0; i < validatedArray.length; i++) {
			requestResults.push(requestServers(validatedArray[i]));
		}

		// Map requestResults array to reflect() function in order to process
		// final results once all promises have been fulfilled.
		Promise.all( requestResults.map(reflect) ).then(function(results) {

			// Take only resolved results and order them by priority.
			var successful = filter(results, { status: 'resolved' });
			var orderedPriority = orderBy(successful, ['priority']);

			// Reject if none were successful, or resolve with server details.
			if (successful.length === 0)
				reject('Failed, all servers offline');
			else
				resolve(orderedPriority[0].server);

		}).catch(function(error) {
			reject('Fatal error, findserver() failed with message: \n' + error.message);
		});

	});

}

module.exports = findServer;

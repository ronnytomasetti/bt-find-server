/**
 * Author: Ronny Tomasetti <ronny.tomasetti@gmail.com>
 * 
 * Requirements:
 *
 * Create module that determines availability of a given list of servers
 *    and then returns the available server with the lowest priority number.
 * ----------------------------------------------------------------------
 * 	-> Send HTTP GET request to all servers.
 *  -> Wait for responses.
 *  -> Evaluate incoming responses
 *     	-> (200-299) Consider server as online.
 *      -> Else, reject Promise.
 *  -> Sort online servers based on priority.
 *  -> Resolve Promise with lowest priority online server.
 * ----------------------------------------------------------------------
 *
 * findServer() function should return Promise that either:
 * Resolves with the online server that has the lowest priority number.
 * Reject with an error, if no servers are online.
 *
 * All GET requests should be done simultaneously.
 * Timeout GET request after (5) seconds.
 *
 */

module.exports = require('./lib/bt-find-server');

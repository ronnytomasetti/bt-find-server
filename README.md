Find Server function.

## Installation

```bash
$ npm install bt-find-server
```
or alternatively using Yarn package manager

```bash
$ yarn add bt-find-server
```

## Usage

```javascript
// Require bt-find-server module as findServer.
var findServer = require('bt-find-server');

// Setup server array.
// Must be an array of objects containing url and priority values.
var serverArray = [{
	"url": "http://doesNotExist.boldtech.co",
	"priority": 1
}, {
	"url": "http://boldtech.co",
	"priority": 7
}, {
	"url": "http://offline.boldtech.co",
	"priority": 2
}, {
	"url": "http://npmjs.com",
	"priority": 4
}];

// Call findServer() function passing in serverArray
findServer(serverArray).then(function(results) {
	// If successful, results will be an object containing:
	// { url: 'http://npmjs.com', priority: 4, statusCode: 200 }
}).catch(function(error) {
	// If unsuccessful, error contains message:
	  // Failed, all servers offline - If no servers responded with valid status code.
	  // Invalid server array - If no valid urls/priority values were provided.
	  // Fatal error, findserver() failed with message: \n + error.message
});
```

### Options

under construction

### Testing

```bash
$ npm install
$ npm test
```

## License

ISC

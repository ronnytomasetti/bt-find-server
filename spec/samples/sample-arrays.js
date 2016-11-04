module.exports = {
	withOneValid: [{
		"url": "http://doesNotExist.boldtech.co",
		"priority": 1
	}, {
		"url": "http://boldtech.co",
		"priority": 7
	}, {
		"url": "http://offline.boldtech.co",
		"priority": 2
	}, {
		"url": "http://google.com",
		"priority": 4
	}],

	withNoneValid: [{
		"url": "http://doesNotExist.boldtech.co",
		"priority": 1
	}, {
		"url": "http://boldtech.co",
		"priority": 7
	}, {
		"url": "http://offline.boldtech.co",
		"priority": 2
	}],

	emptyArray: []
};

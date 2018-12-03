// Steam Store Alexa Demo
// ======================
'use strict';

// Uncomment to fire up local Node server
// ======================================
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Test Page\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// ======================================

// Config Alexa SDK and required libraries.
const Alexa = require('alexa-sdk');
const steamScrape = require('./steamScrape');

// Define handlers.
const handlers = {
	'LaunchRequest': function() {
		this.emit(':ask', 'What would you like to do?', 'Please say that again?');
	},
	'SessionEndedRequest': function() {
		console.log('session ended.');
		this.emit(':saveState', true);
	},
	'Unhandled': function() {
		this.emit(':ask', 'What would you like to do?', 'Please say that again?');
	},
	'demoIntent': function() {
		// Define intent and slot(s).
		let intent = this.event.request.intent;
   		let slotValue = getSlotValue(intent);

   		// Make emit method available within the scope of request.
    	var emitMethod = this.emit;

    	// Generate speech string (this will likely be in a function).
    	// Initialise speech array, which will eventually be converted to append to the speech string.
	    var speechArray = [];
    	var speechString = '';

    	// Alexa does not like ampersands.
      	speechString = speechString.replace('&', 'and');

      	// Output speech.
      	emitMethod(':tell', speechString);
	}

}

// Do the Lambda/Alexa magic.
exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = process.env.APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
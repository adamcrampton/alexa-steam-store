// Config required libraries and import parse file.
const rp = require('request-promise');
const $ = require('cheerio');
const steamParse = require('steamParse');

// Define scrape endpoint.
const url = "https://store.steampowered.com/";

// Attempt to build HTML object.
rp(url)
	.then(function(html) {
		console.log(html);
	})
	.catch(function(err) {
		console.log("There was an error:", err);
});

// Export module.
module.exports = steamScrape;
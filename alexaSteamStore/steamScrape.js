// Config required libraries and import parse file.
const rp = require('request-promise');
const $ = require('cheerio');
const steamParse = require('./steamParse');

// Export as module.
module.exports = {
	// Attempt to build HTML object.
	scrapeIndex: function(url) {
		rp(url)
			.then(function(html) {
				// Scrape and return if request was successful.
				const scrapeObject = $('#tab_specials_content .tab_item', html);
				
				// Parse data - so it's useable for building speech strings.
				const parsedSpecials = steamParse.parseSpecials(scrapeObject);

				console.log(parsedSpecials);
			})
			.catch(function(err) {
				console.log("There was an error:", err);
		});
	}
}
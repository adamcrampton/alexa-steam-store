// Config required libraries and import parse file.
const rp = require('request-promise');
const $ = require('cheerio');
const steamParse = require('./steamParse');

// Define scrape endpoint.
const url = "https://store.steampowered.com/";

// Attempt to build HTML object.
const steamScrape = function(url) {
	rp(url)
		.then(function(html) {
			const scrapeObject = $('#tab_specials_content .tab_item', html);
			for (var i = 0; i <= scrapeObject.length; i++) {
				console.log('**********************************');
				console.log($(scrapeObject[i]).find('.tab_item_name').text());
				console.log($(scrapeObject[i]).find('.discount_pct').text());
				console.log($(scrapeObject[i]).find('.discount_original_price').text());
				console.log($(scrapeObject[i]).find('.discount_final_price').text());;
			}

			
		})
		.catch(function(err) {
			console.log("There was an error:", err);
	});
}

return steamScrape(url);

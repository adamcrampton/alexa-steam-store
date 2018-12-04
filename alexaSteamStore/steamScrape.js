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
				const scrapeData = {};
				const scrapeObject = $('#tab_specials_content .tab_item', html);
				for (var i = 0; i < scrapeObject.length; i++) {
					// Add scraped data to array.
					scrapeData[i] = {};
					scrapeData[i].itemName = $(scrapeObject[i]).find('.tab_item_name').text();
					scrapeData[i].discountPercentage = $(scrapeObject[i]).find('.discount_pct').text();
					scrapeData[i].originalPrice = $(scrapeObject[i]).find('.discount_original_price').text().replace(/(A\$)\s?/gmi, '$');
					scrapeData[i].finalPrice = $(scrapeObject[i]).find('.discount_final_price').text().replace(/(A\$)\s?/gmi, '$');
				}	

				console.log(scrapeData);
			})
			.catch(function(err) {
				console.log("There was an error:", err);
		});
	}
}
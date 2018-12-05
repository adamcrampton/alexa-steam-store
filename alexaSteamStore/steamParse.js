// Import required libraries.
const $ = require('cheerio');

module.exports = {
	// Parse scraped specials data.
	parseSpecials: function(scrapeObject) {
		// Initalise object to return.
		const scrapeData = {};

		for (var i = 0; i < scrapeObject.length; i++) {
			// Add scraped data to array.
			scrapeData[i] = {};
			scrapeData[i].itemName = $(scrapeObject[i]).find('.tab_item_name').text();
			scrapeData[i].discountPercentage = $(scrapeObject[i]).find('.discount_pct').text().replace(/-/g, '');
			scrapeData[i].originalPrice = $(scrapeObject[i]).find('.discount_original_price').text().replace(/(A\$)\s?/gmi, '$');
			scrapeData[i].finalPrice = $(scrapeObject[i]).find('.discount_final_price').text().replace(/(A\$)\s?/gmi, '$');
		}

		return scrapeData;
	}
}
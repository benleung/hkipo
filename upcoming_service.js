var request = require('request');
var cheerio = require('cheerio');
var async   = require('async');
var logger = require('./lib/logger').getLogger('stocks_service');

var URL = 'http://www.aastocks.com/tc/ipo/CompanySummary.aspx?symbol=&view=0';

module.exports = {
  getUpcoming: function(cb){
    request(URL, function(error, response, html){
      var upcomings = [], retObj = {};
      retObj.upcomings = upcomings;
      if(!error){
        var $ = cheerio.load(html, {ignoreWhitespace: true});
        var ticker, company, ipoPrice, listingDate, applyDate;

        $("#rpt0 .DR, #rpt0 .ADR").each(function(i,elem){
            ticker = $(this).children().eq(1).children("a").text().trim().replace(".HK","");
            company = $(this).children().eq(2).text().trim();
            ipoPrice = $(this).children().eq(4).text().trim();
            applyDate = $(this).children().eq(8).text().trim();
            listingDate = $(this).children().eq(9).text().trim();
            if(/N\/A/.test(ipoPrice) || /N\/A/.test(applyDate) )   return; // not public offer now
            else{
              var entry = {
                ticker: ticker,
                company: company,
                applyDate: applyDate,
                listingDate: listingDate,
              };
              upcomings.push(entry);
            }
        });
        cb(retObj);
      }
    });
  }
}
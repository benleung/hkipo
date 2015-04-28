var request = require('request');
var cheerio = require('cheerio');
var async   = require('async');
var logger = require('./lib/logger').getLogger('stocks_resources');

var URLS = ['http://www.aastocks.com/tc/ipo/ListedIPO.aspx',       
    'http://www.aastocks.com/tc/ipo/ListedIPO.aspx?iid=ALL&orderby=DA&value=DESC&index=2',
    'http://www.aastocks.com/tc/ipo/ListedIPO.aspx?iid=ALL&orderby=DA&value=DESC&index=3',
    'http://www.aastocks.com/tc/ipo/ListedIPO.aspx?iid=ALL&orderby=DA&value=DESC&index=4',
    'http://www.aastocks.com/tc/ipo/ListedIPO.aspx?iid=ALL&orderby=DA&value=DESC&index=5',
    'http://www.aastocks.com/tc/ipo/ListedIPO.aspx?iid=ALL&orderby=DA&value=DESC&index=6',
    'http://www.aastocks.com/tc/ipo/ListedIPO.aspx?iid=ALL&orderby=DA&value=DESC&index=7',
    'http://www.aastocks.com/tc/ipo/ListedIPO.aspx?iid=ALL&orderby=DA&value=DESC&index=8',
    'http://www.aastocks.com/tc/ipo/ListedIPO.aspx?iid=ALL&orderby=DA&value=DESC&index=9'];
var MAX_OVERSCRIBED = 2000.0;  // high overscription cases are omitted for illustration purpose on scatter chart

module.exports = {
  middleWare: function(req, res, next){
    var entries = [];
    
    async.map(URLS, function(url, cb) {
      request(url, function(error, response, html){
          if(!error){
              var $ = cheerio.load(html, {ignoreWhitespace: true});
              var company, firstdayEarning, oversubscribed, ipoPrice;

              $('.newIPOTable .DR, .newIPOTable .ADR').each(function(i,elem){
                  company = $(this).children(".rft").eq(2).text().trim();
                  firstdayEarning = parseFloat($(this).children(".rgt").eq(5).text().trim())/100;
                  oversubscribed = $(this).children(".rgt").eq(2).text().trim();
                  ipoPrice = $(this).children(".rgt").eq(1).text().trim();
                  if(/N\/A/.test(ipoPrice) || /N\/A/.test(oversubscribed) )   return; // not public offer
                  else{
                    oversubscribed = parseFloat(oversubscribed) || null;
                    var entry = {
                      company: company,
                      firstdayEarning: firstdayEarning,
                      oversubscribed: oversubscribed
                    };
                    entries.push(entry);
                  }
              })
              cb(null,entries);
          }
      });
    },
    function(err, results){
        var mergedResults = [], retObj;
        mergedResults = mergedResults.concat.apply(mergedResults, results.reverse());
        if(req.query.type==='scatter'){
          retObj = [];
          mergedResults.forEach(function(i){
            if(i.oversubscribed < MAX_OVERSCRIBED){
              retObj.push({x:i.oversubscribed || 0, y:i.firstdayEarning, name:i.company});  // oversubscribed==0 means undersubscribed
            }
          });
        }
        if(req.query.type==='bar'){
          retObj = [];
          mergedResults.forEach(function(i){
            // TODO: bar chart
          });
        }
        res.send(retObj || mergedResults);
        logger.info("Done handling request method="+req.method+" url="+req.url);
        next();
    });
  }
}
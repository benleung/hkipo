var request = require('request');
var cheerio = require('cheerio');
var async   = require('async');
var logger = require('./lib/logger').getLogger('stocks_resources');
var upcomingService = require('./upcoming_service');

module.exports = {
  middleWare: function(req, res, next){
    upcomingService.getUpcoming(function(upcomings){
      res.send(upcomings);
      logger.info("Done handling request method="+req.method+" url="+req.url);
      next();
    });
  }
}
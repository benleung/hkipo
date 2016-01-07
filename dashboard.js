var pageBuilder = require('./lib/page_builder');
var logger = require('./lib/logger').getLogger('dashboard');
var upcomingService = require('./upcoming_service');

module.exports = {
  middleWare: function(req, res, next){
    res.setHeader('Cache-Control', 'public, max-age=86400');
    upcomingService.getUpcoming(function(upcomings){
      pageBuilder.renderLayout('dashboard',upcomings, function(layout){
        res.send(layout);
        logger.info("Done handling request method="+req.method+" url="+req.url);
        next();
      });
    });
  }
}

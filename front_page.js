var pageBuilder = require('./lib/page_builder');
var logger = require('./lib/logger').getLogger('front_page');

module.exports = {
  middleWare: function(req, res, next){
    pageBuilder.renderLayout('front_page',{}, function(layout){
      res.send(layout);
      logger.info("Done handling request method="+req.method+" url="+req.url);
      next();
    });
  }
}

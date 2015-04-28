var express = require('express');
var app     = express();
var stocksMiddleware = require('./stocks_resources').middleWare;
var frontpageMiddleware = require('./front_page').middleWare;
var logger = require('./lib/logger').getLogger('kernel');

// routing
app.get('/', frontpageMiddleware);
app.get('/stocks', stocksMiddleware)
app.use('/assets',express.static('assets'));
// End of rounting

app.listen(process.env.PORT || 8080);
logger.info('Listening to port 8080');
exports = module.exports = app;

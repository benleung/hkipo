var winston = require('winston');

var getLogger = function(label){
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        colorize: true,
        label: label
      })
    ]
  });
}

exports = module.exports = {
  getLogger: getLogger
}

var fs = require('fs');
var LAYOUT_EXTENSION = ".mu";
var LAYOUT_DIRECTORY = "layout";
var hogan = require("hogan.js");

// cb gets one arguements 'layout', which is content of mu file
var renderLayout = function(layoutname, context, cb){ 
  fs.readFile(LAYOUT_DIRECTORY+'/'+layoutname+LAYOUT_EXTENSION, function (err, layout) {
    if (err) throw err;
    var tempate = hogan.compile(layout.toString());
    
    var upcomingStocks = [];
    
    layout = tempate.render(context);
    return cb(layout);
  });
};

module.exports = {
  renderLayout: renderLayout
};

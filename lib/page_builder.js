var fs = require('fs');
var LAYOUT_EXTENSION = ".mu";
var LAYOUT_DIRECTORY = "layout";

// cb gets one arguements 'layout', which is content of mu file
var renderLayout = function(layoutname, cb){ 
  fs.readFile(LAYOUT_DIRECTORY+'/'+layoutname+LAYOUT_EXTENSION, function (err, layout) {
    if (err) throw err;
    return cb(layout.toString());
  });
};

module.exports = {
  renderLayout: renderLayout
};

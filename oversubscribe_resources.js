var request = require('request');
var cheerio = require('cheerio');
var async   = require('async');
var logger = require('./lib/logger').getLogger('stocks_resources');
var upcomingService = require('./upcoming_service');

module.exports = {
  middleWare: function(req, res, next){
    var ticker = req.query.ticker;
    request({
      uri: "http://www.infocastfn.com/fn/ajax/news/InfocastNewsJsonResult",
      method: 'POST',
      strictSSL: false,
      contentType:'application/x-www-form-urlencoded',
      form: {
        searchCriteria:'{"type":"FIN","stockCode":"'+ticker+'","grpCode":"NwsType"}',
        bSortable_0:"true",
        bSortable_1:"true",
        bSortable_2:"true",
        iColumns:"3",
        iDisplayLength:"20",
        iDisplayStart:"0",
        iSortCol_0:"0",
        iSortingCols:"1",
        jcomparatorName:"com.infocast.iweb.comparator.news.NewsJComparator",
        locale:"zh_TW",
        sColumns:"datetime,headline,id",
        sEcho:"14",
        sSortDir_0:"desc",
        numProcessingRec:""
      }}, 
      function(error, response, body){
        if(!error){
          var data = JSON.parse(body).aaData, retObjs = [];
          data.forEach(function(d){
          
            
          
            var retObj = {};
            retObj.date = new Date(d[0]).toString();
            retObj.title = d[1];
            retObj.url = "http://www.infocastfn.com/fn/ajax/news/newsDetail?newsId="+d[2];
            if(/\u5B56\u5C55\u8A8D\u8CFC\u4E00\u89BD/.test(retObj.title)) // 孖展認購一覽
              retObjs.push(retObj);
          });
          res.send(retObjs);
          logger.info("Done handling request method="+req.method+" url="+req.url);
          next();
        }
      }
    );
  }
}
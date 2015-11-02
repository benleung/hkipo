<!DOCTYPE HTML>
<html ng-app="dashboardApp">
<head>  
  <!--TODO:do some seo stuff, canonical link, description-->
  <meta name="keywords" content="香港新股,分析,Hong Kong Stocks, IPO, Analysis, Scatter Chart">
  
  <link rel="stylesheet" type="text/css" href="/assets/dashboard.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.css">
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
  <script src="/assets/dashboard.js"></script>
  <title>香港新股 - Dashboard</title>
</head>

<body>
    <div class="container" ng-controller="dashboardController as dashboard">
      <h1 class="page-header">Dashboard</h1>
      <h2>Upcoming</h2>
      <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Application Date</th>
              <th>Date of listing</th>
            </tr>
          </thead>
          <tbody>
          {{#upcomings}}
            <tr>
              <td scope="row"><a href="" ng-click="dashboard.query({{ticker}})"> {{ticker}}</a></td>
              <td>{{company}}</td>
              <td>{{applyDate}}</td>
              <td>{{listingDate}}</td>
            </tr>
          {{/upcomings}}
          </tbody>
      </table>
      <h2>Oversubscription</h2>
      <p>Please click the above links.</p>
      <table class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="oversubscribe in dashboard.oversubscribes">
              <td scope="row">{[oversubscribe.date]}</td>
              <td><a href="{[oversubscribe.url]}">{[oversubscribe.title]}</a></td>
            </tr>
          </tbody>
      </table>
      <p style="position:absolute; bottom: 10px;">股票資料取自互聯網，如有侵權請通知</p>
    </div>
</body>
</html>

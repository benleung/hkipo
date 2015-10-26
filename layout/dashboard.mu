<!DOCTYPE HTML>
<html>
<head>  
  <!--TODO:do some seo stuff, canonical link, description-->
  <meta name="keywords" content="香港新股,分析,Hong Kong Stocks, IPO, Analysis, Scatter Chart">
  
  <link rel="stylesheet" type="text/css" href="/assets/dashboard.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.css">
  <title>香港新股 - Dashboard</title>
</head>

<body>
    <div class="container">
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
              <th scope="row">{{ticker}}</th>
              <td>{{company}}</td>
              <td>{{applyDate}}</td>
              <td>{{listingDate}}</td>
            </tr>
          {{/upcomings}}
          </tbody>
      </table>
      <h2>Oversubscription</h2>
      
    </div>
</body>
</html>
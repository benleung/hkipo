angular.module('dashboardApp',[])
  .config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[').endSymbol(']}');
  })
  .controller('dashboardController', ["$http",function($http) {
    var dashboard = this;
    dashboard.oversubscribes = [];
    dashboard.hide = true;
 
    dashboard.query = function(id) {
      dashboard.hide = false;
      dashboard.oversubscribes = [];
      $http({
        method: 'GET',
        url: '/oversubscribe?ticker='+id
      }).then(function successCallback(response) {
        dashboard.hide = true;
        dashboard.oversubscribes = response && response.data;
      }, function errorCallback(response) {
        dashboard.hide = true;
        console.log(response)
      });
    };
  }]);

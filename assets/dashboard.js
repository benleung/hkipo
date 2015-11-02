angular.module('dashboardApp',[])
  .config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[').endSymbol(']}');
  })
  .controller('dashboardController', ["$http",function($http) {
    var dashboard = this;
    dashboard.oversubscribes = [];
 
    dashboard.query = function(id) {
      $http({
        method: 'GET',
        url: '/oversubscribe?ticker='+id
      }).then(function successCallback(response) {
        dashboard.oversubscribes = response && response.data;
      }, function errorCallback(response) {
        console.log(response)
      });
    };
  }]);
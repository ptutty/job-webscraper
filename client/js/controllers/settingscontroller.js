angular.module('jobsController')
  .controller('settingsController',  ['$scope','$http','AppService','Jobs','$routeParams' , function($scope, $http, AppService, Jobs, $routeParams) {

    AppService.get()
    .success(function(data) {
       $scope.appstate = data;
       console.log(data);
    })


    $scope.importJobs  = function() {
        Jobs.import()
          .success(function(data) {
              console.log("new jobs imported: " + data);
          });
    }

    $scope.tidyJobs  = function() {
        Jobs.tidy()
          .success(function(data) {
              console.log(data);
          });
    }
}]);

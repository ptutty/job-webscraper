angular.module('jobsController')

  // edit and deletes a job
  .controller('settingsController',  ['$scope','$http', 'Jobs', '$routeParams' , function($scope, $http, Jobs, $routeParams) {
      //$scope.loading = true;
      $scope.importJobs  = function() {
          Jobs.import()
          .success(function(data) {
            console.log(data);
          });
      }
}]);

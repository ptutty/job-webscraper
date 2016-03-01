angular.module('jobsController')

  // edit and deletes a job
  .controller('editJobController',  ['$scope','$http', 'Jobs', '$routeParams','$window' , function($scope, $http, Jobs, $routeParams, $window) {
      $scope.loading = true;

      Jobs.get($routeParams.id)
        .success(function(data) {
          $scope.job = data;
          $scope.loading = false;
        });


      $scope.updateJob  = function() {
        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.job.title != undefined) {
          $scope.loading = true;
          // call the update function from our service (returns a promise object)
          Jobs.update($routeParams.id , $scope.job);
          $scope.loading = false;
        }
      };

      // DELETE ==================================================================

      $scope.deleteJob = function() {
        $scope.loading = true;

        Jobs.delete($routeParams.id)
          // if successful creation, call our get function to get all the new todos
          .success(function(data) {
            $scope.loading = false;
            $scope.jobs = data; // assign our new list of todos
          });

          //redirect back to homepage
          $window.location.href = '/#';
      };
  }])

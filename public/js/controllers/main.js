angular.module('jobsController', [])

	.controller('shortListController', ['$scope','$http','Jobs', function($scope, $http, Jobs) {
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all shortlisted jobs and show them
		// use the service to get all the shortlisted jobs
		Jobs.get()
			.success(function(data) {
				$scope.jobs = data;
				$scope.loading = false;
			});



	}]);

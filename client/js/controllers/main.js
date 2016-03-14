angular.module('jobsController', [])

	.controller('jobListController', ['$scope','$http','Jobs', 'ShortlistService', function($scope, $http, Jobs, ShortlistService) {
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all shortlisted jobs and show them
		// use the service to get all the shortlisted jobs
		Jobs.get()
			.success(function(data) {
				$scope.jobs = data;
				$scope.loading = false;
			});


		// shortlisted jobs ======================================================
		 ShortlistService.get()
		 	.success(function(data) {
				 $scope.shortlist = data;
				 $scope.loading = false;
			});


	}]);
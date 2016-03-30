angular.module('jobsController', [])

	.controller('jobListController', ['$scope','$http','Jobs', 'ShortlistService', 'AppService', function($scope, $http, Jobs, ShortlistService, AppService) {
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all shortlisted jobs and show them
		// use the service to get all the shortlisted jobs
		Jobs.get()
			.success(function(data) {
				$scope.jobs = data;
				$scope.loading = false;
			});

		// last job import meta info
		AppService.get()
		.success(function(data) {
			 $scope.appstate = data;
		});


		// shortlisted jobs ======================================================
		ShortlistService.get()
			.success(function(data) {
			 $scope.shortlist = data;
			 $scope.loading = false;
		});

		// longlist sorting ++++++++++++++++++++++++++
		$scope.sortField = "deadline";
  	$scope.descending = false;

		$scope.sort = function (newSortField) {
			console.log("sort by" + newSortField);
		  if ($scope.sortField == newSortField) {
				$scope.descending = !$scope.descending;

			} else {
				$scope.sortField = newSortField;
			}
			return false;
		}
	}]);


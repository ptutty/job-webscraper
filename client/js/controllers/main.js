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

		// joblist sorting ++++++++++++++++++++++++++

		$scope.jobSortby = [
		  {
		    value: 'deadline',
		    label: 'Deadline'
		  },
		  {
		    value: 'title',
		    label: 'Title'
		  },
		  {
		    value: 'salary',
		    label: 'Salary'
		  },
		  {
		    value: 'oldest',
		    label: 'Oldest'
		  }
		  ];     




	}]);


angular.module('jobsController', [])

	.controller('jobListController', ['$scope','$http', 'Jobs', 'ShortlistService' , '$routeParams' , 'AppService', function($scope, $http, Jobs, ShortlistService, $routeParams, AppService) {
		$scope.loading = true;

		if ($routeParams.pagenumber) {
			$scope.page = $routeParams.pagenumber;
            var pagenum = parseInt($scope.page);
            $scope.nextpage = pagenum++;
            $scope.prevpage = pagenum--;
		} else {
            // initial homepage load only
			$scope.page = 1;
            Jobs.get()
                .success(function(data) {
                    $scope.totaljobs = data.length;
                    $scope.loading = false;
                });
            
		}

		// GET =====================================================================


		// first page of all jobs
		Jobs.getPaginated($scope.page)
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

		// joblist sorting ===============================================

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

		// search controller =====================================================
		$scope.formData = {};

		$scope.search = function() {

			Jobs.search($scope.formData)
				.success(function(data) {
					$scope.loading = true;
					console.log(data);
					$scope.jobs = data;
					$scope.loading = false;
					$scope.formData = ""; // clear the form so our user is ready to enter another
				});
		};





	}]);


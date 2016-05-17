angular.module('jobsController', [])

	.controller('jobListController', ['$scope','$http', 'Jobs', 'ShortlistService' , '$routeParams' , 'AppService', function($scope, $http, Jobs, ShortlistService, $routeParams, AppService) {
		$scope.loading = true;


        
        
        
        
        
        
		Jobs.get()
			.success(function(results) {
				$scope.totaljobs = results.total;
				$scope.page = results.page;
				$scope.pages = results.pages;

				// create array of page numbers
				var pageNumbers = [];
				for (var i=1; i < $scope.pages+1; i++) {
					pageNumbers.push(i);
				};
				$scope.pagenumbers = pageNumbers;
				$scope.jobs = results.docs;
				$scope.loading = false;
			});
        
        
        $scope.pageForward = function() {
            
        }
            


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


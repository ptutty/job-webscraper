angular.module('jobsController', [])

	.controller('jobListController', ['$scope','$http', 'Jobs', 'ShortlistService' , '$routeParams' , 'AppService', function($scope, $http, Jobs, ShortlistService, $routeParams, AppService) {
		$scope.loading = true;
        var pageNumbers = [];


        // show first page of jobs on initial page load
        showJobsPaginated(1);


        // create an array of page numbers based on pagination results




        function showJobsPaginated(pagenum) {
            Jobs.paginated(pagenum)
                .success(function(results) {
                    $scope.totaljobs = results.total;
                    $scope.page = results.page;
                    $scope.pages = results.pages;
                    $scope.pagenumbers = pageNumbers;
                    $scope.jobs = results.docs;
                    $scope.loading = false;

                    if (!pageNumbers.length) {
                        for (var i=1; i < $scope.pages+1; i++) {
                            pageNumbers.push(i);
                        }
                    }
                });
        }

        
        
        $scope.pageForward = function() {
            var arrlen = pageNumbers.length;
            console.log(arrlen);
            var next = parseInt($scope.page) + 1;

            if (next <= arrlen) {
                console.log(next);
                showJobsPaginated(next);
            }
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


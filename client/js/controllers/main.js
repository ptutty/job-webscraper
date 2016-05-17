angular.module('jobsController', [])

	.controller('jobListController', ['$scope','$http', 'Jobs', 'ShortlistService' , '$routeParams' , 'AppService', function($scope, $http, Jobs, ShortlistService, $routeParams, AppService) {
		$scope.loading = true;
        $scope.pageNumbers = [];
        

        // create an array of page numbers based on pagination results


        
        $scope.showJobsPaginated = function(pagenum) {
            $scope.loading = true;
            Jobs.paginated(pagenum)
                .success(function(results) {
                    $scope.totaljobs = results.total;
                    $scope.page = results.page;
                    $scope.pages = results.pages;
                    $scope.jobs = results.docs;
                    $scope.loading = false;

                    if (!$scope.pageNumbers.length) {
                        for (var i=1; i < $scope.pages+1; i++) {
                            $scope.pageNumbers.push(i);
                        }
                    }
                });
        }

        
        
        $scope.pagination = function(direction) {
            var currentpage = parseInt($scope.page);
            var gotopage;
            if (direction === 'forward') {
                gotopage = currentpage + 1;
            } else {
                gotopage = currentpage - 1;
            }
            if (gotopage <= $scope.pageNumbers.length && gotopage > 0) {
                console.log(gotopage);
                $scope.showJobsPaginated(gotopage);
            }
        };
            


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


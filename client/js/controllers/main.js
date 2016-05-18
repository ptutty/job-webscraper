angular.module('jobsController', [])

	.controller('jobListController', ['$scope','$http', 'Jobs', 'ShortlistService' , '$routeParams' , 'AppService' , '$location', function($scope, $http, Jobs, ShortlistService, $routeParams, AppService, $location) {
		$scope.loading = true;


        /* Job search results paginated */

        $scope.showJobsPaginated = function(pagenum) {
            $scope.loading = true;
            $scope.jobs = "";
            Jobs.paginated(pagenum)
                .success(function(results) {
                    $scope.totaljobs = results.total;
                    $scope.page = results.page;
                    $scope.pages = results.pages;
                    $scope.jobs = results.docs;
                    $scope.loading = false;

                    // PAGINATION CONTROLS LOGIC
                    $scope.pageNumbers = [];
                    for (var i=1; i < $scope.pages+1; i++) {
                        $scope.pageNumbers.push(i);
                    }
                    var currentpage = parseInt($scope.page);

                    // work out previous and next page
                    if (currentpage > 0 ) {
                        $scope.previouspage = currentpage - 1;
                    }
                    $scope.nextpage = currentpage + 1;
                });
        };

        if ($routeParams.pagenumber) {
            $scope.showJobsPaginated($routeParams.pagenumber);
        } else {
            $scope.showJobsPaginated(1);
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


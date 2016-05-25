angular.module('jobsController', [])

	.controller('jobListController', ['$scope','$http', 'Jobs', 'ShortlistService' , '$routeParams' , 'AppService' , '$location', function($scope, $http, Jobs, ShortlistService, $routeParams, AppService, $location) {
		$scope.loading = true;


        /* Job search results paginated */

        $scope.showJobsPaginated = function(pagenum, query) {
            $scope.loading = true;
            $scope.jobs = "";

            Jobs.paginated(pagenum, query)
                .success(function(results) {
                    $scope.totaljobs = results.total;
                    $scope.page = results.page;
                    $scope.pages = results.pages;
                    $scope.jobs = results.docs;
                    $scope.loading = false;
                    $scope.searchtitle = "Showing all " + $scope.totaljobs + " jobs in Web, Software & IT";

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

                    if (query) {
                        $scope.searchtitle = results.total + " jobs found for search: " + query;
                        $scope.query = "?search=" + query;
                    }

                });
        };

        var query = $routeParams.search;
        var pagenum = $routeParams.pagenumber;
        console.log(pagenum);
        console.log(query);

        if ($routeParams.pagenumber) {
            $scope.showJobsPaginated(pagenum, query);
        } else {
            $scope.showJobsPaginated(1 , null);
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
		$scope.searchterm = "";
		$scope.search = function() {
            $scope.showJobsPaginated(1 , $scope.searchterm );
            $location.path('/page/1', false).search({'search': $scope.searchterm});
		};
	}]);


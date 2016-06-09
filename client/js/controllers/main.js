angular.module('jobsController', [])

	.controller('jobListController', ['$scope','$http', 'Jobs', 'ShortlistService' , '$routeParams' , 'AppService' , '$location', function($scope, $http, Jobs, ShortlistService, $routeParams, AppService, $location) {


        $scope.loading = true;
        $scope.searchterm = "";
        // load query strings on page load ======================================================================
        var query = $routeParams.search;
        var pagenum = $routeParams.pagenumber;
        var sortparams = $routeParams.sort;

        // main function for creating http requests =================================================
        $scope.showJobsPaginated = function(pagenum, query, sortparams) {
            $scope.loading = true;
            $scope.jobs = "";
            Jobs.paginated(pagenum, query, sortparams)
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


        // default on page load ==================================================
        function init() {
            if (pagenum) {
                $scope.showJobsPaginated(pagenum, query, sortparams);
            } else {
                $scope.showJobsPaginated(1, null ,null);
            }
        }
        init();


        // list sorting drop down controller ========================================
        $scope.sortoptions = [{"text":"Deadline Furthest","value":"desc"}, {"text":"Deadline Nearest","value":"asc"}];
        $scope.selectedOption = $scope.sortoptions[1];

        $scope.setsortoptions = function() {
            if ($scope.searchterm) {
                $scope.showJobsPaginated(pagenum, $scope.searchterm , $scope.selectedOption.value);
            } else {
                $scope.showJobsPaginated(pagenum, null , $scope.selectedOption.value);
            }
        };



        // last job import meta info =============================================
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


		// search button controller =====================================================
		$scope.search = function() {
            $scope.showJobsPaginated(1 , $scope.searchterm , $scope.selectedOption.value );
            $location.path('/page/1', false).search({'search': $scope.searchterm});
		};





	}]);


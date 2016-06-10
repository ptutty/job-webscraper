angular.module('jobsController', [])

	.controller('jobListController', ['$scope','$http', 'Jobs', 'ShortlistService' , '$routeParams' , 'AppService' , '$location', function($scope, $http, Jobs, ShortlistService, $routeParams, AppService, $location) {


        $scope.sortoptions = [{"text":"Deadline Nearest","value":"asc"},{"text":"Deadline Furthest","value":"desc"}];
        $scope.selectedOption = $scope.sortoptions[0];
        var pagenum, query, sortby;

        // main function for creating http requests of jobs =================================================
        $scope.showJobsPaginated = function(type) {

            $scope.loading = true;
            $scope.jobs = "";
            pagenum = (typeof $routeParams.pagenumber != 'undefined') ? $routeParams.pagenumber : 1;


            /* type of search request */
            switch(type) {
                case 'citysearch': // search button press
                    query = $scope.city;
                    console.log(query);
                    //update url for bookmarking / persisitence
                    $location.path('/page/1', false).search({'search': $scope.city});
                    break;
                case 'search': // search button press
                    query = $scope.searchterm;
                    //update url for bookmarking / persisitence
                    $location.path('/page/1', false).search({'search': $scope.searchterm});
                    break;
                case 'sort': // sort by drop down change
                    query = $scope.searchterm;
                    sortby = (typeof $scope.selectedOption.value != 'undefined') ? $scope.selectedOption.value : 'asc';
                    $location.path('/page/' + pagenum , false).search({'search': $scope.searchterm, 'sortby': sortby});
                    break;
                case 'pageload': // reload of page
                    query = (typeof $routeParams.search != 'undefined') ? $routeParams.search : null;
                    $scope.searchterm = (query!= null) ? query : "";
                    break;
            }

            Jobs.paginated(pagenum, query, sortby)
                .success(function(results) {
                    $scope.totaljobs = results.total;
                    $scope.page = results.page;
                    $scope.pages = results.pages;
                    $scope.jobs = results.docs;
                    $scope.searchtitle = "Showing all " + $scope.totaljobs + " current vacancies.";
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
                    console.log(query);
                    if (query) {
                        $scope.searchtitle = results.total + " jobs found for search: " + query;
                        $scope.query = "?search=" + query;
                    }
                    $scope.loading = false;
                });
        };


        // page load
        $scope.showJobsPaginated('pageload');

        // search button
        $scope.search = function() {
            $scope.showJobsPaginated('search');
        };

        $scope.citysearch = function() {
            $scope.showJobsPaginated('citysearch');
        };

        // sort by drop down change
        $scope.setsortoptions = function() {
            $scope.showJobsPaginated('sort');
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
		})

	}])


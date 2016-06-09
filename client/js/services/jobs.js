angular.module('jobsService', [])

	// super simple service for jobs API
	// each function returns a promise object
	.factory('Jobs', ['$http', function($http) {
		return {
			get : function(id) {
				if (id) {
					return $http.get('/api/job/' + id); // single job
				} else {
					return $http.get('/api/jobs'); // all jobs
				}
			},
			paginated : function(pagenum, query, sortparam) {

				var sortoption = 'asc';
				if (sortparam){
					sortoption = sortparam;
				};

				if (query) {
					return $http.get('/api/jobs/page/' + pagenum + '?search=' + query + '&sort=' + sortoption );
				} else {
					return $http.get('/api/jobs/page/' + pagenum + '?sort=' + sortoption);
				}
			},
			create : function(jobData) {
				return $http.post('/api/jobs', jobData);
			},
			update : function(id, data) {
				return $http.put('/api/job/' + id, data);
			},
			delete : function(id) {
				return $http.delete('/api/job/' + id);
			},
			import : function() {
			 return $http.get('/api/import/');
			},
			tidy : function() {
				return $http.get('/api/jobsclean/');
			},
			search : function(searchterm) {
				// return $http.post('/api/search/');
				return $http.post('/api/search/', searchterm);
			}
		}
	}]);

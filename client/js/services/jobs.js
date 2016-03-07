angular.module('jobsService', [])

	// super simple service for jobs API
	// each function returns a promise object
	.factory('Jobs', ['$http', function($http) {
		return {
			get : function(id) {
				if (id) {
					return $http.get('/api/job/' + id); // single job
				} else {
					return $http.get('/api/jobs'); // all todos
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
			}
		}
	}]);

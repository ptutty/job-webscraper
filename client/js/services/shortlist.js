angular.module('shortlistService', [])

	.factory('ShortlistService', ['$http', function ($http) {

		// return available functions for use in the controllers
		return {
			get: get,
			add: add
		};

		// get all jobs in shortlist
		function get() {
			return $http.get('/api/shortlist');
		}

		// add job to shortlist
		function add(job_id) {
			return $http.put('/api/shortlist/' + job_id);
		}


}]);

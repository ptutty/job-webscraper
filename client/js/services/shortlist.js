angular.module('shortlistService', [])

	.factory('ShortlistService', ['$http', function ($http) {

		// return available functions for use in the controllers
		return {
			get: get,
			add: add,
			remove: remove
		};

		// get all jobs in shortlist
		function get() {
			return $http.get('/api/shortlist');
		}

		// add job to shortlist
		function add(job_id) {
			return $http.put('/api/shortlist/' + job_id);
		}

		// remove job to shortlist
		function remove(job_id) {
			console.log(job_id);
			return $http.delete('/api/shortlist/' + job_id);
		}

}]);

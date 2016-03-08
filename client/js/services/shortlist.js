angular.module('shortlistService', [])

	.factory('ShortlistService', ['$http', function ($http) {

		// shortlisted jobs
		//var shortlist = ['item one', 'item two', 'item 3'];

		// return available functions for use in the controllers
		return {
			get: get,
			add: add
		};

		function get() {
				return $http.get('/api/shortlist');
		}

		function add(job_id) {
				shortlist.push(job_id);

				//save to users shortlist in mongoDB

		}


}]);

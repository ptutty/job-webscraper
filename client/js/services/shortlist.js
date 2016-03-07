angular.module('shortlistService', [])

	.factory('ShortlistService', ['$http', function ($http) {

		// shortlisted jobs
		var shortlist = [];

		// return available functions for use in the controllers
		return {
			get: get,
			add: add
		};

		function get() {
				// get request for all users shortlised jobs
				return shortlist;

		}

		function add(job_id) {
				shortlist.push(job_id);

				//save to users shortlist in mongoDB

		}


}]);

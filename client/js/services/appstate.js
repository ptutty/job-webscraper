angular.module('appService', [])

	.factory('AppService', ['$http', function ($http) {

		// return available functions for use in the controllers
		return {
			get: get
		};

		// get all jobs in shortlist
		function get() {
			return $http.get('/api/appstate');
		}
		

}]);

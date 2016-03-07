angular.module('authService', [])
	.factory('AuthService',
	['$q', '$timeout', '$http',
	function ($q, $timeout, $http) {

		// user info
		var userLoggedIn = null;
		var userProfile = null;

		// return available functions for use in the controllers
		return ({
			isLoggedIn: isLoggedIn,
			getUserStatus: getUserStatus,
			login: login,
			logout: logout,
			register: register,
			getUserProfile: getUserProfile
		});

		function isLoggedIn() {
			if(userLoggedIn) {
				return true;
			} else {
				return false;
			}
		}

		function getUserProfile() {
			return userProfile;
		}

		function getUserStatus() {
			$http.get('/user/status')
			// handle success
			.success(function (data) {
				if(data.status){
					userLoggedIn = true;
					userProfile = data.user;
				} else {
					userLoggedIn = false;
				}
			})
			// handle error
			.error(function (data) {
				userLoggedIn = false;
			});
		}

		function login(username, password) {

			// create a new instance of deferred
			var deferred = $q.defer();

			// send a post request to the server
			$http.post('/user/login',
				{username: username, password: password})
				// handle success
				.success(function (data, status, username) {

					if(status === 200 && data.status){
						userLoggedIn = true;
						deferred.resolve();
					} else {
						userLoggedIn = false;
						deferred.reject();
					}
				})
				// handle error
				.error(function (data) {
					userLoggedIn = false;
					deferred.reject();
				});

			// return promise object
			return deferred.promise;

		}

		function logout() {

			// create a new instance of deferred
			var deferred = $q.defer();

			// send a get request to the server
			$http.get('/user/logout')
				// handle success
				.success(function (data) {
					userLoggedIn = false;
					deferred.resolve();
				})
				// handle error
				.error(function (data) {
					userLoggedIn = false;
					deferred.reject();
				});

			// return promise object
			return deferred.promise;

		}

		function register(username, password) {

			// create a new instance of deferred
			var deferred = $q.defer();

			// send a post request to the server
			$http.post('/user/register',
				{username: username, password: password})
				// handle success
				.success(function (data, status) {
					if(status === 200 && data.status){
						deferred.resolve();
					} else {
						deferred.reject();
					}
				})
				// handle error
				.error(function (data) {
					deferred.reject();
				});

			// return promise object
			return deferred.promise;

		}

}]);

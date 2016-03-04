angular.module('jobsController')

	.controller('createJobController', ['$scope','$http','Jobs', function($scope, $http, Jobs) {
		$scope.formData = {};
		$scope.loading = true;

			// CREATE ==================================================================
			// when submitting the add form, send the text to the node API
			$scope.createTodo = function() {

				// validate the formData to make sure that something is there
				// if form is empty, nothing will happen
				if ($scope.formData.title != undefined) {
					$scope.loading = true;

					// call the create function from our service (returns a promise object)
					Jobs.create($scope.formData)

						// if successful creation
						.success(function() {
							$scope.loading = false;
							$scope.formData = {}; // clear the form so our user is ready to enter another
						});
				}
			};
	}])

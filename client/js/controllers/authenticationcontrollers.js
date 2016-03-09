angular.module('jobsController')

.controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };
}])

.controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {
      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });
    };

    // logged in status
    $scope.isloggedIn = AuthService.isLoggedIn();
    $scope.$watch(function(){return AuthService.isLoggedIn();}, function (newValue) {
        $scope.isloggedIn = newValue;
    }, true);

    // logged in username
    $scope.currentuser = AuthService.getUserProfile();
    $scope.$watch(function(){return AuthService.getUserProfile()}, function (newValue) {
        $scope.currentuser = newValue;
    }, true);



  }])




  .controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);

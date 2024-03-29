

angular.module('gizzaJob', ['jobsController', 'jobsService', 'appService', 'authService', 'shortlistService' , 'ngRoute' , 'ngSanitize'])


.config(function($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider
            .when('/job/:id', {
                templateUrl : 'pages/jobfulldetails.html',
                controller: 'editJobController',
                restricted: false
            })
            .when('/job/edit/:id', {
                templateUrl : 'pages/editjob.html',
                controller: 'editJobController',
                restricted: true
            })
            .when('/page/:pagenumber', {
                templateUrl : 'pages/jobshome.html',
                controller: 'jobListController',
                restricted: false
            })
            .when('/add/', {
                templateUrl : 'pages/createjob.html',
                controller: 'createJobController',
                restricted: true
            })
            .when('/', {
                templateUrl : 'pages/jobshome.html',
                controller: 'jobListController',
                restricted: false
            })
            .when('/shortlist', {
                templateUrl : 'pages/shortlist.html',
                controller: 'jobListController',
                restricted: true
            })
            .when('/settings', {
                templateUrl : 'pages/settings.html',
                controller: 'settingsController',
                restricted: true
            })
            .when('/login', {
              templateUrl: 'partials/login.html',
              controller: 'loginController',
              restricted: false
            })
            .when('/register', {
              templateUrl: 'partials/register.html',
              controller: 'registerController',
              restricted: false
            })

          $locationProvider.html5Mode(false);
    })

// check users logged in status before route change
.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus();
      if (next.restricted && !AuthService.isLoggedIn()) {
        $location.path('/login');
        $route.reload();
      }
  });
})
    // AllOWS ANGULARJS CHANGE PATH WITHOUT RELOADING - see main.js controller
.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);
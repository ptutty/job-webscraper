

angular.module('gizzaJob', ['jobsController', 'jobsService', 'authService', 'ngRoute'])

.config(function($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider
            .when('/job/:id', {
                templateUrl : 'pages/jobdetails.html',
                controller: 'editJobController'
            })
            .when('/job/edit/:id', {
                templateUrl : 'pages/editjob.html',
                controller: 'editJobController'
            })
            .when('/add/', {
                templateUrl : 'pages/createjob.html',
                controller: 'createJobController'
            })
            .when('/', {
                templateUrl : 'pages/longlist.html',
                controller: 'jobListController'
            })
            .when('/shortlist', {
                templateUrl : 'pages/shortlist.html',
                controller: 'jobListController'
            })
            .when('/settings', {
                templateUrl : 'pages/settings.html',
                controller: 'settingsController'
            })
            .when('/login', {
              templateUrl: 'partials/login.html',
              controller: 'loginController'
            })
            .when('/register', {
              templateUrl: 'partials/register.html',
              controller: 'registerController'
            })

          $locationProvider.html5Mode(false);

    });

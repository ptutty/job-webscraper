// angular.module('scotchTodo', ['todoController', 'todoService', 'todoRoutes']);
angular.module('gizzaJob', ['jobsController', 'jobsService', 'ngRoute'])

.config(function($routeProvider, $locationProvider) {
        $routeProvider
            // route for the about page
            .when('/item/:id', {
                templateUrl : 'pages/editjob.html',
                controller: 'editJobController'
            })
            .when('/add/', {
                templateUrl : 'pages/createjob.html',
                controller: 'createJobController'
            })
            .when('/', {
                templateUrl : 'pages/shortlist.html',
                controller: 'shortListController'
            });

        $locationProvider.html5Mode(false);

    });

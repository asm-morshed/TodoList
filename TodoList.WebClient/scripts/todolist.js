angular.module('todolist', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', { templateUrl: 'views/dashboard/dashboard.tpl.html', controller: 'dashboardController' })
        .when('/dashboard', { templateUrl: 'views/dashboard/dashboard.tpl.html', controller: 'dashboardController' })
        .when('/projects', { templateUrl: 'views/project/projects.tpl.html', controller: 'projectsController' })
        .when('/projectdetail/:id', { templateUrl: 'views/project/createproject.tpl.html', controller: 'projectdetailController' })
        .when('/createproject', {templateUrl: 'views/project/createproject.tpl.html',controller:'projectController'})
        .when('/createtask', { templateUrl: 'views/task/createtask.tpl.html', controller: 'taskController' })

        .when('/tasks', { templateUrl: 'views/task/tasks.tpl.html', controller: 'tasksController' })
        .when('/taskdetail/:id', { templateUrl: 'views/task/createtask.tpl.html', controller: 'taskdetailController' })
        .otherwise({ redirectTo: '/' });
}]);
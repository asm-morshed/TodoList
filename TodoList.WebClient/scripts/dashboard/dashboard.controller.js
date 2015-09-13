angular.module('todolist').controller('dashboardController', [
    '$scope', 'dashboardService', 'projectService', 'taskService', function ($scope, dashboardService, projectService, taskService) {

        $scope.pagename = 'dashboard';

        $scope.projects = [];
        $scope.selectedProject = {};
        $scope.tasks = [];
        $scope.filterText = '';

        $scope.sortOn = 'date';
        $scope.sortBy = 'desc';

        var errorFunction = function(error) {
            console.log(error);
        };

        $scope.loadTasks = function(p) {
            $scope.tasks = [];
            $scope.selectedProject = p;
            
            //call another function to fetch tasks of this project

            taskService.getAllByProject(p.Id, $scope.sortOn, $scope.sortBy).then(function (response) {
                if (response.IsSuccess) {

                    $scope.tasks = response.Data;

                    if ($scope.tasks.length===0) {
                        alert("No task found for this project");
                    }
                } else {
                    alert(response.Message);
                }
            }, errorFunction);


        };

        $scope.loadProjects= function() {
            projectService.getAll().then(function (response) {
                if (response.IsSuccess) {
                    $scope.projects = response.Data;
                    if ($scope.projects.length > 0) {
                        
                        $scope.loadTasks($scope.projects[0]);
                    }
                } else {
                    alert(response.Message);
                }
            }, errorFunction);
        }

        $scope.complete = function (t) {
            taskService.markComplete(t).then(function (response) {

                if (response.IsSuccess) {
                    $scope.loadTasks($scope.selectedProject.Id);
                }

            },errorFunction);
        };

        function init() {
            $scope.loadProjects();
        }
        init();

    }
]);
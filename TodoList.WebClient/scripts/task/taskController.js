angular.module('todolist').controller('taskController', [
    '$scope', '$location', 'taskService', 'projectService', function ($scope, $location, taskService, projectService) {
        $scope.task = {Project:null};
        $scope.projects = [];


        $scope.save = function () {

            $scope.task.DueDate = $scope.task.DueDate.toDateString();
        $scope.task.ProjectId = $scope.task.Project.Id;
        console.log($scope.task);

        taskService.save($scope.task).then(function(response) {

            console.log(response);
            $scope.project = {};
            $location.path('/');
        }, function(error) {
            alert(error.statusText);
        });
    }

        var   loadProjects= function() {
            projectService.getAll().then(function(response) {
                if (response.IsSuccess) {
                    $scope.projects = response.Data;
                } else {
                    alert(response.Message);
                }
            }, function(error) {
                console.log(error);
            });

        }

        function init  () {

            loadProjects();

        }

        init();

    }
]);
angular.module('todolist').controller('tasksController', ['$scope', 'taskService', function ($scope, taskService) {

    var errorFunction = function (error) {
        console.log(error);
    };

    $scope.loadTasks = function () {
        taskService.getAllByProject(0).then(function (response) {
            if (response.IsSuccess) {
                $scope.tasks = response.Data;

            } else {
                alert(response.Message);
            }
        }, errorFunction);
    }

    $scope.remove = function (task) {
        //call delete function of the serever

        taskService.remove(task.Id).then(function (response) {
            if (response.IsSuccess) {
                $scope.loadTasks();
            } else {
                alert(response.Message + '\nDetail:' + response.Exception.Message);
            }
        }, errorFunction);

    }

    function init() {
        $scope.loadTasks();
    }
    init();
    }
])
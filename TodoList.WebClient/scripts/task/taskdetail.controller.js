angular.module('todolist').controller('taskdetailController', ['$scope', '$location', '$routeParams', 'taskService', 'projectService', function ($scope,$location, $routeParams, taskService, projectService) {

    var params = $routeParams.id;
    $scope.buttonName = "Update";

    $scope.task = {};
    var id = $routeParams.id;
    $scope.pagename = 'task detail';

    


    $scope.save = function () {
        $scope.task.ProjectId = $scope.task.Project.Id;
            taskService.save($scope.task).then(function(response) {
                console.log(response);
                alert(response.Message);
                $location.path('/tasks');
            }, function(error) {
                alert(error.statusText);
            });
        };


        var loadProjects = function () {
            projectService.getAll().then(function (response) {
                if (response.IsSuccess) {
                    $scope.projects = response.Data;

                    taskService.getDetailById(id).then(function (r) {
                        $scope.task = r.Data;
                        $scope.task.DueDate = new Date(r.Data.DueDate);

                        for (var i = 0; i < $scope.projects.length; i++) {
                            if ($scope.projects[i].Id===$scope.task.ProjectId) {
                                $scope.task.Project = $scope.projects[i];
                                break;
                            }
                        }

                    }, function (error) {
                        alert(error.statusText);
                    });
                } else {
                    alert(response.Message);
                }
            }, function (error) {
                console.log(error);
            });

        }

        function init() {

            loadProjects();

            

        }

        init();

    }
])
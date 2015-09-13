angular.module('todolist').controller('projectsController', [
    '$scope', 'projectService', function ($scope, projectService) {

        var errorFunction = function (error) {
            console.log(error);
        };

        $scope.loadProjects = function () {
            projectService.getAll().then(function (response) {
                if (response.IsSuccess) {
                    $scope.projects = response.Data;
                    
                } else {
                    alert(response.Message);
                }
            }, errorFunction);
        }

        $scope.remove= function(project) {
            //call delete function of the serever

            projectService.remove(project.Id).then(function(response) {
                if (response.IsSuccess) {
                    $scope.loadProjects();
                } else {
                    alert(response.Message+'\nDetail:'+response.Exception.Message);
                }
            }, errorFunction);

        }

        function init() {
            $scope.loadProjects();
        }
        init();




    }
]);
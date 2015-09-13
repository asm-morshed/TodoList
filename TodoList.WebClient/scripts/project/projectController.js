angular.module('todolist').controller('projectController', [
    '$scope', 'projectService', function ($scope, projectService) {
        $scope.project = {};
        $scope.buttonName = "Create";
        $scope.save= function() {
            projectService.save($scope.project).then(function(response) {

                console.log(response);
                $scope.project = {};

            }, function(error) {
                alert(error.statusText);
            });
        }

    }
]);
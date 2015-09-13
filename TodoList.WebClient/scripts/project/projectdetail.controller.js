angular.module('todolist').controller('projectdetailController', ['$scope', '$location', '$routeParams', 'projectService', function ($scope, $location, $routeParams, projectService) {


        $scope.buttonName = "Update";
        $scope.project = {};
        var id = $routeParams.id;
    $scope.pagename = 'projectdetail';

    projectService.getDetailById(id).then(function (response) {

        console.log(response);
        $scope.project = response.Data;

    }, function (error) {
        alert(error.statusText);
    });


    $scope.save= function() {
        projectService.save($scope.project).then(function(response) {
            console.log(response);
            alert(response.Message);
            $location.path('/projects');
        }, function(error) {
            alert(error.statusText);
        });
    }

    }
])
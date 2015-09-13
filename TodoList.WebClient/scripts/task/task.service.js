angular.module('todolist').service('taskService', [
    '$resource', '$q', function ($resource, $q) {

        baseUrl = 'http://localhost:1966/api/';

    var save = function(task) {
        var defer = $q.defer();
        var resource = $resource(baseUrl + 'Task');
        resource.save(task,function (response) {
            return defer.resolve(response);
        }, function (error) {
            return defer.reject(error);
        });
        return defer.promise;
    };

    var markComplete = function (task) {
        var defer = $q.defer();
        var resource = $resource(baseUrl + 'TaskComplete');
        resource.save(task, function (response) {
            return defer.resolve(response);
        }, function (error) {
            return defer.reject(error);
        });
        return defer.promise;
    };
    var getAllByProject = function (projectId, sortOn, sortBy) {

        var defer = $q.defer();
        var resource = $resource(baseUrl + 'Task?projectId=' + projectId + '&sortOn=' + sortOn + '&sortBy=' + sortBy);
        resource.get(function (response) {
            return defer.resolve(response);
        }, function (error) {
            return defer.reject(error);
        });
        return defer.promise;
    };


    var getDetailById = function (id) {
        var defer = $q.defer();
        var resource = $resource(baseUrl + 'Task?id=' + id);
        resource.get(function (response) {
            return defer.resolve(response);
        }, function (error) {
            return defer.reject(error);
        });
        return defer.promise;
    };

    var remove = function (id) {
        var defer = $q.defer();
        var resource = $resource(baseUrl + 'Task?id=' + id);
        resource.delete(function (response) {
            return defer.resolve(response);
        }, function (error) {
            return defer.reject(error);
        });
        return defer.promise;
    };

        return {
            save: save,
            getAllByProject: getAllByProject,
            getDetailById: getDetailById,
            remove: remove,
            markComplete: markComplete
        };


    }]);
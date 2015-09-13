angular.module('todolist').service('projectService', [
    '$resource', '$q', function ($resource, $q) {

        baseUrl = 'http://localhost:1966/api/';

    var save = function(project) {
        var defer = $q.defer();
        var resource = $resource(baseUrl + 'Project');
        resource.save(project,function (response) {
            return defer.resolve(response);
        }, function (error) {
            return defer.reject(error);
        });
        return defer.promise;
    };
    var getAll = function() {
        var defer = $q.defer();
        var resource = $resource(baseUrl + 'Project');
        resource.get(function(response) {
            return  defer.resolve(response);
        }, function(error) {
            return defer.reject(error);
        });
        return defer.promise;

    };


    var getDetailById = function(id) {
        var defer = $q.defer();
        var resource = $resource(baseUrl + 'Project?id=' + id);
        resource.get(function(response) {
            return defer.resolve(response);
        }, function(error) {
            return defer.reject(error);
        });
        return defer.promise;
    };

    var remove = function(id) {
        var defer = $q.defer();
        var resource = $resource(baseUrl + 'Project?id=' + id);
        resource.delete(function(response) {
            return defer.resolve(response);
        }, function(error) {
            return defer.reject(error);
        });
        return defer.promise;
    };
        return {
            save: save,
            getAll: getAll,
            getDetailById: getDetailById,
            remove: remove
        };


    }]);
(function () {
    'use strict';

    angular
        .module('todoApp')
        .controller('AddTaskController', AddTaskController);

    AddTaskController.$inject = ['$rootScope', '$location', '$http'];

    function AddTaskController($scope, $location, $http) {
        var newTodo = {};
        newTodo.title = newTodo.category = newTodo.description = newTodo.date = newTodo.time = "";
        $scope.newTodo = newTodo;
        $scope.addTask = function () {
            $http.post('http://localhost:3000/tasks/', newTodo).then(function(res) {
                $scope.refreshTodos();
            }, function(res) { });
        };

        $scope.back = function () {
            $location.path('/home');
        };
    }

})();
(function () {
    'use strict';

    angular
        .module('todoApp')
        .controller('AddTaskController', AddTaskController);

    AddTaskController.$inject = ['$rootScope', '$location'];

    function AddTaskController($scope, $location) {
        var tasks = JSON.parse(window.localStorage.getItem("tasks"));
        if (tasks == null) tasks = [];
        $scope.todos = tasks;
        var newTodo = {};
        newTodo.title = newTodo.category = newTodo.description = newTodo.date = newTodo.time = "";
        $scope.newTodo = newTodo;
        $scope.addTask = function () {
            newTodo.id = $scope.todos.length + 1;
            $scope.todos.push(newTodo);
            window.localStorage.setItem("tasks", JSON.stringify($scope.todos));
        };

        $scope.back = function () {
            $location.path('/home');
        };
    }

})();
(function () {
    'use strict';

    angular
        .module('todoApp')
        .controller('EditTaskController', EditTaskController);

    EditTaskController.$inject = ['$rootScope', '$location'];

    function EditTaskController($scope, $location) {
        var tasks = JSON.parse(window.localStorage.getItem("tasks"));
        if (tasks == null) tasks = [];
        $scope.todos = tasks;
        if($scope.currentTodo == null)
            $location.path('/home');

        $scope.editTask = function() {
            $scope.todos[$scope.currentTodo.id-1] = $scope.currentTodo;
            window.localStorage.setItem("tasks", JSON.stringify($scope.todos));
            $location.path('/home');
            $scope.$apply();
        };

        $scope.back = function () {
            $location.path('/home');
        };
    }

})();
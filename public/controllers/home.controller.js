(function () {
    'use strict';

    angular
        .module('todoApp')
        .filter('filterDesc', ['$sce', function($sce){
            return function(input) {
                input = input || '';
                var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                var regex = new RegExp(expression);
                var splitedDescription = input.split(" ");
                splitedDescription.forEach(function (entry, index) {
                    if (entry.match(regex)) {
                        splitedDescription[index] = '<a href="javascript:openWebView(\'' + entry + '\')">' + entry + '</a>';
                    }
                });
                return $sce.trustAsHtml(splitedDescription.join(" "));
            }
        }])
        .filter('filterExpiration', function(){
            return function(input) {
                input = input || '';
                var res = '';
                try {
                    var dateParts = input.date.split('/');
                    var taskDate = new Date(dateParts[2], dateParts[1]-1, dateParts[0]);
                    var timeParts = input.time.split(':');
                    taskDate.setHours(timeParts[0]);
                    taskDate.setMinutes(timeParts[1]);
                    var today = new Date();
                    if(taskDate.getTime() < today.getTime())
                        res = "bg-red";
                } catch(e) {}
                return res;
            }
        })
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$location'];

    function HomeController($scope, $location) {
        $scope.searchCategory = "title";
        $scope.searchText = "";
        var tasks = JSON.parse(window.localStorage.getItem("tasks"));
        if (tasks == null) tasks = [];
        $scope.todos = tasks;

        $scope.$watch('todos', function () {
            if ($scope.todos.length > 0)
                $scope.remaining = $scope.todos.length + " tâches à effectuer";
            else
                $scope.remaining = "Aucune tâche à effectuer";
        }, true);

        $scope.filterTasks = function (item) {
            return item[$scope.searchCategory].toLowerCase().includes($scope.searchText.toLowerCase());
        };

        $scope.removeTask = function (index) {
            $scope.todos.splice(index, 1);
            $scope.todos.forEach(
                function (item, index) {
                    item.id = index;
                }
            );
            window.localStorage.setItem("tasks", JSON.stringify($scope.todos));
            $scope.$apply();
        };

        $scope.editTask = function (index) {
            $scope.currentTodo = $scope.todos[index];
            $location.path('/edit');
            $scope.$apply();
        };

        $scope.addTask = function () {
            $location.path('/add');
        };

        $scope.openShowModal = function (index) {
            $scope.currentTodo = $scope.todos[index];
            let modal = document.getElementById("showModal");
            modal.style.display = "block";

            let deleteBtn = document.getElementById("delete");
            deleteBtn.onclick = function () {
                modal.style.display = "none";
                $scope.removeTask(index);
            };
            let modifyBtn = document.getElementById("modify");
            modifyBtn.onclick = function () {
                modal.style.display = "none";
                $scope.editTask(index);
            };

            let modalContainer = document.getElementById("showModal-container");
            window.onclick = function (event) { // Pour fermer la modal si l'utilisateur clique ailleurs
                if (event.target === modal || event.target === modalContainer) {
                    modal.style.display = "none";
                }
            }
        };
    }

})();

function openWebView(url) {
    let modal = document.getElementById("webView");
    modal.style.display = "block";

    let showModal = document.getElementById("showModal");
    showModal.style.display = "none";

    let iframe = document.getElementById("webViewUrl");
    iframe.setAttribute('src', url);

    let modalContainer = document.getElementById("webView-container");
    window.onclick = function (event) { // Pour fermer la modal si l'utilisateur clique ailleurs
        if (event.target === modal || event.target === modalContainer) {
            modal.style.display = "none";
        }
    }
}
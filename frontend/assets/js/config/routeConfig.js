(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: 'assets/view/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/question/', {
            templateUrl: 'assets/view/question/index.html',
            controller: 'QuestionController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/question/new/', {
            templateUrl: 'assets/view/question/new.html',
            controller: 'QuestionNewController',
            controllerAs: 'vm'
        });

        $routeProvider.otherwise('/');
    }

})();


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

        $routeProvider.otherwise('/');
    }

})();


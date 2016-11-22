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

        $routeProvider.when('/audit/', {
            templateUrl: 'assets/view/audit/index.html',
            controller: 'AuditController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/audit/new/', {
            templateUrl: 'assets/view/audit/new.html',
            controller: 'AuditNewController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/question/', {
            templateUrl: 'assets/view/question/index.html',
            controller: 'QuestionController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/question/new/', {
            templateUrl: 'assets/view/question/form.html',
            controller: 'QuestionFormController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/question/show/:id/', {
            templateUrl: 'assets/view/question/details.html',
            controller: 'QuestionDetailsController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/question/edit/:id/', {
            templateUrl: 'assets/view/question/form.html',
            controller: 'QuestionFormController',
            controllerAs: 'vm'
        });

        $routeProvider.otherwise('/');
    }

})();


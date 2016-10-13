(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController(question) {
        var vm = this;
        vm.title = 'Hello2';

        question.all().then(function (response) {
            vm.questions = response.data;
        });
    }

})();


(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController(question) {
        var vm = this;
        vm.title = 'Dashboard';

        question.all().then(function (response) {
            var questions = response.data;

            questions.sort(function (current, next) {
                if (current.id > next.id) {
                    return 1;
                }

                if (current.id < next.id) {
                    return -1;
                }

                return 0;
            });

            vm.questions = questions;
        });
    }

})();


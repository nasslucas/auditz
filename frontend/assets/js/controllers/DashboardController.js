(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController(question, dimension) {
        var vm = this;
        vm.title = 'Dashboard';
        vm.changeDimension = changeDimension;

        dimension.all().then(function (response) {
            vm.dimensions = response.data;

            if (typeof vm.dimensions[0] !== 'undefined') {
                vm.dimension = vm.dimensions[0];
            }
        });

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

        function changeDimension(newDimension) {
            vm.dimension = newDimension;
        }
    }

})();


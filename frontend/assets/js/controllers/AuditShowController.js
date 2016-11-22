(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuditShowController', AuditShowController);

    /* @ngInject */
    function AuditShowController($routeParams, $timeout, audit) {
        var vm = this;
        vm.changeDimension = changeDimension;
        vm.sliderOptions = sliderOptions();

        vm.autoSave = (function () {
            console.info('anon');
            var promise = null;

            return function(callback, ms) {
                console.info('call');
                $timeout.cancel(promise);         // clearTimeout(timer);
                promise = $timeout(callback, ms); // timer = setTimeout(callback, ms);
            };
        })();

        audit.get($routeParams.hash).then(function (response) {
            vm.audit = response.data;

            vm.tab = {
                dimension: vm.audit.questions[0].question.dimension.id
            };
        }, function (response) {
            swal({
                title: "Oops...",
                text: "Something went wrong on load this audit!",
                type: "error",
                confirmButtonText: "Close"
            });
        });

        vm.autoSave(function () {
            console.info(new Date());
        }, 2);

        function sliderOptions() {
            return {
                onEnd: function (sliderId, modelValue, highValue, pointerType) {
                    console.info('onEnd');
                    console.info(sliderId);
                    console.info(modelValue);
                    console.info(highValue);
                    console.info(pointerType);
                }
            };
        }







        // dimension.all().then(function (response) {
        //     vm.dimensions = response.data;

        //     if (typeof vm.dimensions[0] !== 'undefined') {
        //         vm.dimension = vm.dimensions[0];
        //     }
        // });

        // question.all().then(function (response) {
        //     var questions = response.data;

        //     questions.sort(function (current, next) {
        //         if (current.id > next.id) {
        //             return 1;
        //         }

        //         if (current.id < next.id) {
        //             return -1;
        //         }

        //         return 0;
        //     });

        //     vm.questions = questions;
        // });

        function changeDimension(newDimensionId) {
            vm.tab.dimension = newDimensionId;
        }
    }

})();


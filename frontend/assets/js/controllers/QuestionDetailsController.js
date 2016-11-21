(function () {
    'use strict';

    angular
        .module('app')
        .controller('QuestionDetailsController', QuestionDetailsController);

    /* @ngInject */
    function QuestionDetailsController($routeParams, question) {
        var vm = this;

        question.get($routeParams.id).then(function (response) {
            vm.question = response.data;
        });
    }

})();


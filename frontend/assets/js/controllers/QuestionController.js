(function () {
    'use strict';

    angular
        .module('app')
        .controller('QuestionController', QuestionController);

    /* @ngInject */
    function QuestionController($location, question, dimension) {
        var vm = this;

        vm.new = function (event) {
            event.stopPropagation();

            $location.path('/question/new/');
        };

        question.all().then(function (response) {
            vm.questions = response.data;
        });
    }

})();


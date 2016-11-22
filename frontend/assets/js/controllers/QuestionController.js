(function () {
    'use strict';

    angular
        .module('app')
        .controller('QuestionController', QuestionController);

    /* @ngInject */
    function QuestionController(question, dimension) {
        var vm = this;

        question.all().then(function (response) {
            vm.questions = response.data;
        });
    }

})();


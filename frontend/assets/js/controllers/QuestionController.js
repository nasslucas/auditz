(function () {
    'use strict';

    angular
        .module('app')
        .controller('QuestionController', QuestionController);

    /* @ngInject */
    function QuestionController(question, dimension) {
        var vm = this;
        vm.title = 'Question';
        vm.createDimension = createDimension;

        dimension.all().then(function (response) {
            vm.dimensions = response.data;
        });

        question.all().then(function (response) {
            vm.questions = response.data;
        });

        function createDimension() {
            console.log('createDimension');
        }
    }

})();


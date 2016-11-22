(function () {
    'use strict';

    angular
        .module('app')
        .controller('QuestionDetailsController', QuestionDetailsController);

    /* @ngInject */
    function QuestionDetailsController($location, $routeParams, question) {
        var vm = this;

        vm.removeQuestion = removeQuestion;

        question.get($routeParams.id).then(function (response) {
            vm.question = response.data;
        });

        function removeQuestion(item, event) {
            event.stopPropagation();

            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this question.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true
            }, function (isConfirm) {
                if (isConfirm) {
                    item.archived = true;

                    question.save(item).then(function (response) {
                        $location.path('/question/');
                    }, function (response) {
                        swal({
                            title: "Oops...",
                            text: "Something went wrong on remove the question!",
                            type: "error",
                            confirmButtonText: "Close"
                        });
                    });
                }
            });
        }
    }

})();


(function () {
    'use strict';

    angular
        .module('app')
        .controller('QuestionFormController', QuestionFormController);

    /* @ngInject */
    function QuestionFormController($location, $routeParams, question, dimension) {
        var vm = this;

        vm.saveQuestion = saveQuestion;
        vm.question = null;

        loadQuestionDetails();
        loadQuestions();
        loadDimensions();

        function loadQuestionDetails() {
            if ($routeParams.id) {
                question.get($routeParams.id).then(function (response) {
                    vm.question = {
                        id: response.data.id,
                        title: response.data.name,
                        description: response.data.description,
                        dimension: response.data.dimension.id
                    };

                    if (typeof response.data.parent !== 'undefined') {
                        vm.question.question = response.data.parent.id;
                    }
                });
            }
        }

        function loadQuestions() {
            vm.questionsConfig = {
                maxItems: 1,
                valueField: 'id',
                labelField: 'name',
                delimiter: '|',
                placeholder: 'Choose a question',
                searchField: ['name'],
                sortField: 'text',
                create: false
            };

            question.all().then(function (response) {
                var questions = response.data;
                var data = [];

                for (var index in questions) {
                    data.push({
                        id:   questions[index].id,
                        name: questions[index].dimension.name + ' - ' + questions[index].name
                    });
                }

                vm.questions = data;
            });
        }

        function loadDimensions() {
            vm.dimensionsConfig = {
                maxItems: 1,
                valueField: 'id',
                labelField: 'name',
                delimiter: '|',
                placeholder: 'Choose a dimension',
                searchField: ['name'],
                sortField: 'text',
                create: function(input, callback) {
                    dimension.create({name: input}).then(function (response) {
                        callback({
                            id:   response.data.id,
                            name: response.data.name
                        });
                    }, function () {
                        swal({
                            title: "Oops...",
                            text: "Something went wrong on save a new dimension!",
                            type: "error",
                            confirmButtonText: "Close"
                        });
                    });
                }
            };

            dimension.all().then(function (response) {
                vm.dimensions = response.data;
            });
        }

        function saveQuestion(event) {
            event.stopPropagation();

            var data = {
                name: vm.question.title,
                description: vm.question.description,
                dimension_id: vm.question.dimension
            };

            if (vm.question.id) {
                data.id = vm.question.id;
            }

            if (vm.question.question) {
                data.question_id = vm.question.question;
            }

            question.save(data).then(function (response) {
                console.info(response);

                $location.path('/question/show/' + response.data.id + '/');
            }, function (response) {
                swal({
                    title: "Oops...",
                    text: "Something went wrong on save this question!",
                    type: "error",
                    confirmButtonText: "Close"
                });
            });
        }
    }

})();


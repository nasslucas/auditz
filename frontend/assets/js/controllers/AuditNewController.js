(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuditNewController', AuditNewController);

    /* @ngInject */
    function AuditNewController($location, $routeParams, audit, auditee, question, dimension) {
        var vm = this;

        vm.createAudit = createAudit;
        vm.canSave = canSave;
        vm.getNumberSelectedQuestions = getNumberSelectedQuestions;

        vm.audit = {
            auditee:   null,
            questions: null
        };

        loadAuditees();
        loadQuestions();
        loadDimensions();

        function loadAuditees() {
            vm.auditeesConfig = {
                maxItems: 1,
                valueField: 'id',
                labelField: 'name',
                delimiter: '|',
                placeholder: 'Choose a auditee',
                searchField: ['name'],
                sortField: 'text',
                create: function(input, callback) {
                    auditee.create({name: input}).then(function (response) {
                        callback({
                            id:   response.data.id,
                            name: response.data.name
                        });
                    }, function () {
                        swal({
                            title: "Oops...",
                            text: "Something went wrong on save a new auditee!",
                            type: "error",
                            confirmButtonText: "Close"
                        });
                    });
                }
            };

            auditee.all().then(function (response) {
                vm.auditees = response.data;
            });
        }

        function loadQuestions() {
            question.all().then(function (response) {
                vm.questions = response.data;
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
                create: false
            };

            dimension.all().then(function (response) {
                vm.dimensions = response.data;
            });
        }

        function createAudit(event) {
            event.stopPropagation();

            var data = {
                auditee_id: parseInt(vm.audit.auditee),
                questions:  []
            };

            for (var questionId in vm.audit.questions) {
                if (vm.audit.questions[questionId] === false) {
                    delete vm.audit.questions[questionId];
                    continue;
                }

                data.questions.push({
                    id: parseInt(questionId)
                });
            }

            audit.create(data).then(function (response) {
                $location.path('/audit/');
            }, function (response) {
                swal({
                    title: "Oops...",
                    text: "Something went wrong on save a new audit!",
                    type: "error",
                    confirmButtonText: "Close"
                });
            });
        }

        function canSave() {
            if (typeof vm.audit.auditee === null) {
                return false;
            }

            if (typeof vm.audit.questions === null) {
                return false;
            }

            for (var index in vm.audit.questions) {
                if (vm.audit.questions[index]) {
                    return true;
                }
            }

            return false;
        }

        function getNumberSelectedQuestions() {
            if (typeof vm.audit.questions === null) {
                return 0;
            }

            var count = 0;

            for (var id in vm.audit.questions) {
                if (vm.audit.questions[id]) {
                    count++;
                }
            }

            return count;
        }
    }

})();


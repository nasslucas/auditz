(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuditNewController', AuditNewController);

    /* @ngInject */
    function AuditNewController($location, $routeParams, auditee, question, dimension) {
        var vm = this;

        vm.createAudit = createAudit;
        vm.canSave = canSave;

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

            for (var index in vm.audit.questions) {
                if (vm.audit.questions[index] === false) {
                    delete vm.audit.questions[index];
                }
            }

            console.info(vm.audit);

            console.info('createAudit');
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
    }

})();


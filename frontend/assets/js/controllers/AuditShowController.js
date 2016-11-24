(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuditShowController', AuditShowController);

    /* @ngInject */
    function AuditShowController($location, $routeParams, $timeout, audit) {
        var vm = this;
        vm.changeDimension = changeDimension;
        vm.buildCustomOptions = buildCustomOptions;
        vm.saveComment = saveComment;
        vm.canFinish = canFinish;
        vm.finish = finish;

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

        function buildCustomOptions(auditHash, questionId) {
            return {
                id: 'audit' + auditHash + '_question' + questionId,
                onEnd: function(sliderId, modelValue) {
                    var data = {
                        questions: [
                            {
                                id: questionId,
                                answer: modelValue
                            }
                        ]
                    };

                    audit.update(auditHash, data).then(function (response) {
                        vm.notification = {
                            type: 'success',
                            time: new Date(),
                            message: 'Answer saved with successfully!'
                        };
                    }, function (response) {
                        vm.notification = {
                            type: 'error',
                            time: new Date(),
                            message: 'Occur a problem to save the answer of question ' + questionId + '.'
                        };
                    });
                }
            };
        }

        function saveComment(auditHash, dimensionId, comment) {
            var data = {
                dimensions: [
                    {
                        id: dimensionId,
                        comment: comment
                    }
                ]
            };

            audit.update(auditHash, data).then(function (response) {
                vm.notification = {
                    type: 'success',
                    time: new Date(),
                    message: 'Comment saved with successfully!'
                };
            }, function (response) {
                vm.notification = {
                    type: 'error',
                    time: new Date(),
                    message: 'Occur a problem to save the comment ' + dimensionId + '.'
                };
            });
        }

        function canFinish() {
            return true;
        }

        function finish(auditHash, event) {
            event.stopPropagation();

            audit.finish(vm.audit.hash).then(function (response) {
                $location.path('/audit/');
            }, function (response) {
                swal({
                    title: "Oops...",
                    text: "Something went wrong on finish this audit!",
                    type: "error",
                    confirmButtonText: "Close"
                });
            });
        }

        function changeDimension(newDimensionId) {
            vm.tab.dimension = newDimensionId;
        }
    }

})();


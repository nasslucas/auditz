(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuditController', AuditController);

    /* @ngInject */
    function AuditController($location, audit) {
        var vm = this;

        vm.new = function (event) {
            event.stopPropagation();

            $location.path('/audit/new/');
        };

        audit.all().then(function (response) {
            vm.audits = response.data;
        });
    }

})();


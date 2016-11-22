(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuditController', AuditController);

    /* @ngInject */
    function AuditController(audit) {
        var vm = this;

        audit.all().then(function (response) {
            vm.audits = response.data;
        });
    }

})();


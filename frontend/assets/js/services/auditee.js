(function () {
    'use strict';

    angular
        .module('app')
        .factory('auditee', auditee);

    /* @ngInject */
    function auditee($http, BASE_URL) {
        return {
            all: function () {
                return $http.get(BASE_URL + '/api/auditee');
            },
            create: function (auditee) {
                return $http.post(BASE_URL + '/api/auditee', auditee);
            }
        };
    }

})();


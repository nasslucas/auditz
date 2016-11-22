(function () {
    'use strict';

    angular
        .module('app')
        .factory('audit', audit);

    /* @ngInject */
    function audit($http, BASE_URL) {
        return {
            all: function () {
                return $http.get(BASE_URL + '/api/audit');
            },
            create: function (audit) {
                return $http.post(BASE_URL + '/api/audit', audit);
            }
        };
    }

})();


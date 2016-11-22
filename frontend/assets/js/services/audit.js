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
            get: function (hash) {
                return $http.get(BASE_URL + '/api/audit/' + hash);
            },
            create: function (audit) {
                return $http.post(BASE_URL + '/api/audit', audit);
            }
        };
    }

})();


(function () {
    'use strict';

    angular
        .module('app')
        .factory('dimension', dimension);

    /* @ngInject */
    function dimension($http, BASE_URL) {
        return {
            all: function () {
                return $http.get(BASE_URL + '/api/dimension');
            },
            create: function (dimension) {
                return $http.post(BASE_URL + '/api/dimension', dimension);
            }
        };
    }

})();


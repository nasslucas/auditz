(function () {
    'use strict';

    angular
        .module('app')
        .constant('BASE_URL', getBaseUrlConfig());

    /* @ngInject */
    function getBaseUrlConfig() {
        return 'http://127.0.0.1:81';
    }

})();


(function () {
    'use strict';

    angular
        .module('app')
        .config(notificationConfig);

    /* @ngInject */
    function notificationConfig(ngToastProvider) {
        ngToastProvider.configure({
            animation: 'slide'
        });
    }

})();


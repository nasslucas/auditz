(function () {
    'use strict';

    angular
        .module('app')
        .filter('objectFilter', objectFilter);

    /* @ngInject */
    function objectFilter() {
        return function (input, filterVal) {
            var filteredInput = {};

            angular.forEach(input, function (value, key) {
                if (typeof key !== 'undefined' && typeof value.question !== 'undefined') {
                    if (value.question.dimension.id && value.question.dimension.id === filterVal){
                        filteredInput[key] = value;
                    }
                }
            });

            return filteredInput;
        };
    }

})();


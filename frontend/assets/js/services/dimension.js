(function () {
    'use strict';

    angular
        .module('app')
        .factory('dimension', dimension);

    /* @ngInject */
    function dimension($q) {
        return {
            all: function () {
                var deferred = $q.defer();

                deferred.resolve({
                    data: [
                        {
                            id: 1,
                            name: "Dimensão A",
                        },
                        {
                            id: 2,
                            name: "Dimensão B",
                        },
                        {
                            id: 3,
                            name: "Dimensão C",
                        },
                        {
                            id: 4,
                            name: "Dimensão D",
                        },
                        {
                            id: 5,
                            name: "Dimensão E",
                        }
                    ]
                });

                return deferred.promise;
            }
        };
    }

})();


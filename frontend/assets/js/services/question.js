(function () {
    'use strict';

    angular
        .module('app')
        .factory('question', question);

    /* @ngInject */
    function question($q) {
        return {
            all: function () {
                var deferred = $q.defer();

                deferred.resolve({
                    data: [
                        {
                            id: 1,
                            label: "First label",
                            required: true,
                            child: {
                                id: 3,
                                label: "Third label (parent #1)",
                                required: false
                            }
                        },
                        {
                            id: 2,
                            label: "Second label",
                            required: false
                        }
                    ]
                });

                return deferred.promise;
            },
            lastAuditee: function (auditeeId) {
                var deferred = $q.defer();

                deferred.resolve({
                    data: [
                        {
                            id: 1,
                            label: "First label",
                            value: 6,
                            child: {
                                id: 3,
                                label: "Third label (parent #1)",
                                value: 3
                            }
                        },
                        {
                            id: 2,
                            label: "Second label",
                            value: 5
                        }
                    ]
                });

                return deferred.promise;
            }
        };
    }

})();


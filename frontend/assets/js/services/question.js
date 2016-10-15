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
                            dimension: 1,
                            label: "Mussum Ipsum, cacilds vidis litro abertis.",
                            child: {
                                id: 15,
                                label: "Delegadis gente finis, bibendum egestas augue arcu ut est.",
                            }
                        },
                        {
                            id: 2,
                            dimension: 2,
                            label: "Sapien in monti palavris qui num significa nadis i pareci latim.",
                        },
                        {
                            id: 3,
                            dimension: 3,
                            label: "Nec orci ornare consequat.",
                        },
                        {
                            id: 4,
                            dimension: 4,
                            label: "Praesent lacinia ultrices consectetur.",
                        },
                        {
                            id: 5,
                            dimension: 5,
                            label: "Sed non ipsum felis. Vehicula non.",
                        },
                        {
                            id: 6,
                            dimension: 1,
                            label: "Vivamus sit amet nibh non tellus tristique interdum.",
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


(function () {
    'use strict';

    angular
        .module('app')
        .factory('question', question);

    /* @ngInject */
    function question($http, BASE_URL) {
        return {
            all: function () {
                return $http.get(BASE_URL + '/api/question');
            },
            get: function (id) {
                return $http.get(BASE_URL + '/api/question/' + id);
            },
            save: function (question) {
                if (typeof question.id === 'undefined') {
                    return $http.post(BASE_URL + '/api/question', question);
                } else {
                    var id = question.id;

                    delete question.id;

                    return $http.put(BASE_URL + '/api/question/' + id, question);
                }
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


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
                            id: 3,
                            title: "Informe o seu nome",
                            label: "Nome",
                            field: {
                                type: "text",
                                required: true
                            }
                        },
                        {
                            id: 1,
                            title: "Informe o seu cargo",
                            label: "Cargo",
                            field: {
                                type: "text"
                            }
                        },
                        {
                            id: 2,
                            title: "Uau, queremos contratar você, peça um salário que iremos pagar!",
                            label: "Salário",
                            field: {
                                type: "number"
                            },
                            showOnly: {
                                id: 1,
                                equals: "dev"
                            }
                        }
                    ]
                });

                return deferred.promise;
            }
        };
    }

})();


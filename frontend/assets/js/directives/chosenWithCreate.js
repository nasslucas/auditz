(function () {
    'use strict';

    angular
        .module('app')
        .directive('chosenWithCreate', chosenWithCreate);

    /* @ngInject */
    function chosenWithCreate() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            // $(element).on('chosen:no_results', function () {

                $(element).find('input').on('keyup', function(e) {
                    // If we hit Enter and the results list is empty (no matches) add the option
                    if (e.which == 13 && $(element).find('li.no-results').length > 0)
                    {
                        var option = $("<option>").val(this.value).text(this.value);

                        // Add the new option
                        $(element).prepend(option);
                        // Automatically select it
                        $(element).find(option).prop('selected', true);
                        // Trigger the update
                        $(element).trigger("chosen:updated");
                    }
                });
                // $('.chosen-results .no-results', element).html(attrs.noResultsCreateAction);

                // console.info('chosen:no_results');
                // console.info($(element));
                // console.info(attrs.noResultsCreateAction);
            // });
        }
    }

})();

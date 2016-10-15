(function () {
    'use strict';

    angular
        .module('app')
        .run(sliderConfig);

    /* @ngInject */
    function sliderConfig(RzSliderOptions) {
        var getColorByValue = function (value) {
            if (!value || value <= 3) {
                return '#F44336';
            }

            if (value <= 6) {
                return '#727272';
            }

            if (value <= 9) {
                return '#238795';
            }

            return '#29BB42';
        };

        RzSliderOptions.options({
            floor: 0,
            ceil: 10,
            showSelectionBar: true,
            showTicks: true,
            showTicksValues: true,
            getSelectionBarColor: getColorByValue,
            getPointerColor: getColorByValue
        });
    }

})();

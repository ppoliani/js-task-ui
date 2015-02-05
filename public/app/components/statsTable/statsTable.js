/**
 * Generic Stats table
 */
(function(){
    'use strict';

    function statsTableDirective(){

        function statsTableCtrl(){

        }

        return {
            restrict: 'AE',
            template: '/public/app/components/statsTable/statsTable.html',
            scope: {},
            controller: [statsTableCtrl],
            controllerAs: 'vm',
            bindToController: true
        };
    }

    // region CommonJS

    module.exports = {
        name: 'statsTable',
        directive: [statsTableDirective]
    };

    // endregion

})();
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
            templateUrl: '/public/app/components/statsTable/statsTable.html',
            scope: {
                teams: '=',
                numOfGamesPlayed: '='
            },
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
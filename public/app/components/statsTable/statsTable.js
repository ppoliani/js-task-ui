/**
 * Generic Stats table
 */
(function(){
    'use strict';

    function statsTableDirective(){

        function statsTableCtrl(){

            // region Viewmodel

            this.getNumOfGames = function getNumOfGames(team){
                switch(this.type){
                    case 'overall':
                        return team.numOfTotalGames;
                    case 'home':
                        return team.numOfHomeGames;
                    case 'away':
                        return team.numOfAwayGames;
                }
            }

            // endregion

        }

        return {
            restrict: 'AE',
            templateUrl: '/public/app/components/statsTable/statsTable.html',
            scope: {
                teams: '=',
                type: '@'
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
/**
 * Game result manager
 */
(function(){
    'use strict';

    function gameResultsManagerService(){
        // region Inner Fields

        var _teams;

        // endregion

        // region Inner Methods

        function storeTeams(teams){
            _teams = teams;
        }

        function findGameResult(game){

        }

        // endregion

        // region Public API

        return {
            storeTeams: storeTeams,
            findGameResult: findGameResult
        };

        // endregion
    }

    // region CommonJS

    module.exports = {
        name: 'gameResultsManagerService',
        type: 'factory',
        service: [gameResultsManagerService]
    };

    // endregion

})();
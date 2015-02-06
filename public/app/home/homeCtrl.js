/**
 * Home ctrl
 */
(function(){
    'use strict';

    function HomeCtrl($timeout, Game, gamesLoader, gameResultsManager, standingZonesManager){

        // region Setup

        gamesLoader.init(on_msg.bind(this), on_error);

        // endregion

        // region Inner Fields


        // endregion

        // region Viewmodel

        this.overallTeamPositions = gameResultsManager.getOverallTeamPositions();
        this.zonesManager = standingZonesManager;

        // endregion

        // region Events

        /**
         * Invoked when the webSocker has got a new message
         * @param game
         */
        function on_msg(game){
            gameResultsManager.findGameResult(new Game(game));
            $timeout(function(){
                this.overallTeamPositions = gameResultsManager.getOverallTeamPositions()
            }.bind(this));
        }

        /**
         * Invoked when the webSocket raises an error
         * @param error
         */
        function on_error(error){
            console.error(error);
        }

        // endregion
    }

    // region CommonJS

    module.exports = {
        name: 'homeCtrl',
        ctrl: [
            '$timeout',
            'Game',
            'gamesLoaderService',
            'gameResultsManager',
            'standingZonesManager',
            HomeCtrl
        ]
    };
    
    // endregion

})();

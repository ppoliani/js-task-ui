/**
 * Home ctrl
 */
(function(){
    'use strict';

    function HomeCtrl($timeout, Game, gamesLoader, gameResultsManager, standingZonesManager){

        // region Setup

        gamesLoader.init(on_msg.bind(this), on_error);
        gameResultsManager.onGameWeekUpdate(on_gameWeekUpdate.bind(this));

        // endregion

        // region Inner Fields


        // endregion

        // region Viewmodel

        this.overallTeamPositions = gameResultsManager.getOverallTeamPositions();
        this.zonesManager = standingZonesManager;
        this.numOfGamesPlayed = 0;
        this.currentGameWeek = 0;

        // endregion

        // region Events

        /**
         * Invoked when the webSocker has got a new message
         * @param game
         */
        function on_msg(game){
            gameResultsManager.findGameResult(new Game(game));
        }

        /**
         * Invoked when the webSocket raises an error
         * @param error
         */
        function on_error(error){
            console.error(error);
        }

        /**
         * Invoked when the webSocket raises an error
         */
        function on_gameWeekUpdate(){
            $timeout(function(){
                this.overallTeamPositions = gameResultsManager.getOverallTeamPositions();
                this.numOfGamesPlayed = gameResultsManager.getNumOfGamesPlayed();
                this.currentGameWeek = gameResultsManager.getCurrentGameWeek();
            }.bind(this));
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

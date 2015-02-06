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

        this.overallTeamPositions = gameResultsManager.getAllTeams();
        this.homeTeamPositions = gameResultsManager.getAllTeams();
        this.awayTeamPositions = gameResultsManager.getAllTeams();

        this.zonesManager = standingZonesManager;
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
                this.homeTeamPositions = gameResultsManager.getHomeTeamPositions();
                this.awayTeamPositions = gameResultsManager.getAwayTeamPositions();
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

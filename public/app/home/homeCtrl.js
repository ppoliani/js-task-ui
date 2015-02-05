/**
 * Home ctrl
 */
(function(){
    'use strict';

    function HomeCtrl(Game, gamesLoader, gameResultsManager, standingZonesManager){

        // region Setup

        gamesLoader.init(on_msg.bind(this), on_error);

        // endregion

        // region Inner Fields


        // endregion

        // region Viewmodel

        this.teams = gameResultsManager.getAllTeams();
        this.zonesManager = standingZonesManager;

        // endregion

        // region Events

        /**
         * Invoked when the webSocker has got a new message
         * @param game
         */
        function on_msg(game){
            gameResultsManager.findGameResult(new Game(game));
            this.teams = gameResultsManager.getAllTeams();
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
            'Game',
            'gamesLoaderService',
            'gameResultsManager',
            'standingZonesManager',
            HomeCtrl
        ]
    };
    
    // endregion

})();

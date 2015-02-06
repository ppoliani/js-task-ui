/**
* Game model
*/
(function(){
    'use strict';

    function Game(){

        // region Inner Methods

        // endregion

        // region Ctor

        function Game(values){
            this.date = values.date;
            this.homeTeamId = values.homeTeamId;
            this.awayTeamId = values.awayTeamId;
            this.homeGoals = Number(values.homeGoals);
            this.awayGoals = Number(values.awayGoals);
        }

        Game.prototype = (function(){

            // region Public Api

            var publicAPI = {
                constructor: Game
            };

            // endregion

            return publicAPI;

        })();

        // endregion

        return Game;
    }

    // region CommonJS

    module.exports = {
        name: 'Game',
        ctor: [Game]
    };

    // endregion

})();
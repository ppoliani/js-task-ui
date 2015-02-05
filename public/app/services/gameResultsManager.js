/**
 * Game result manager
 */
(function(){
    'use strict';

    function gameResultsManager(GameResultEnum){
        // region Consts

        var WIN_POINTS = 3,
            DRAW_POINTS = 1;

        // endregion

        // region Inner Fields

        var _teams,
            _games = [];

        // endregion

        // region Inner Methods

        /**
         * Store the given teams to the local collection
         * @param teams
         */
        function storeTeams(teams){
            _teams = teams;
        }

        /**
         * Returns all the teams
         * @returns {*}
         */
        function getAllTeams(){
            return _teams;
        }

        /**
         * Returns the team with the given id
         * @param teamId
         * @returns {*}
         */
        function getTeamById(teamId){
            return _teams[teamId];
        }

        /**
         * Calculates the result of the given match and update the properties of the teams in question
         * @param game
         */
        function findGameResult(game){
            var homeTeam = _teams[game.homeTeamId],
                awayTeam = _teams[game.awayTeamId];

            _games.push(game);

            homeTeam.goalsScoredHome += game.homeGoals;
            homeTeam.goalsConcededHome += game.awayGoals;

            awayTeam.goalsScoredAway += game.awayGoals;
            awayTeam.goalsConcededAway += game.homeGoals;

            if (game.homeGoals > game.awayGoals){
                homeTeam.totalHomePoints += WIN_POINTS;
                homeTeam.numOfHomeWins += 1;

                homeTeam.updateForm(GameResultEnum.Win);
                awayTeam.updateForm(GameResultEnum.Loss);
            }
            else if(game.awayGoals > game.homeGoals){
                awayTeam.totalAwayPoints += WIN_POINTS;
                awayTeam.numOfAwayWins += 1;

                homeTeam.updateForm(GameResultEnum.Loss);
                awayTeam.updateForm(GameResultEnum.Win);
            }
            else {
                homeTeam.totalHomePoints += DRAW_POINTS;
                homeTeam.numOfHomeDraws += 1;

                awayTeam.totalAwayPoints += DRAW_POINTS;
                awayTeam.numOfAwayDraws += 1;

                homeTeam.updateForm(GameResultEnum.Draw);
                awayTeam.updateForm(GameResultEnum.Draw);
            }
        }

        /**
         * Returns all the games that have been played
         * @returns {Array}
         */
        function getAllGames(){
            return _games;
        }

        // endregion

        // region Public API

        return {
            storeTeams: storeTeams,
            getAllTeams: getAllTeams,
            getTeamById: getTeamById,
            findGameResult: findGameResult,
            getAllGames: getAllGames
        };

        // endregion
    }

    // region CommonJS

    module.exports = {
        name: 'gameResultsManager',
        type: 'factory',
        service: ['GameResultEnum', gameResultsManager]
    };

    // endregion

})();
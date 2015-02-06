/**
 * Game result manager
 */
(function(){
    'use strict';

    function gameResultsManager(GameResultEnum, collectionUtils){
        // region Consts

        var WIN_POINTS = 3,
            DRAW_POINTS = 1;

        // endregion

        // region Inner Fields

        var _teams,
            _overallTeamPosition = [],
            _homeTeamPositions = [],
            _awayTeamPositions = [],
            _games = [];

        // endregion

        // region Inner Methods

        /**
         * Updates the position of the teams
         * @private
         */
        function _updateTeamPosition(){
            _overallTeamPosition = collectionUtils.sortArrayByProperty(collectionUtils.objToArray(_teams),  'totalPoints');
            _homeTeamPositions = collectionUtils.sortArrayByProperty(collectionUtils.objToArray(_teams),  'totalHomePoints');
            _awayTeamPositions = collectionUtils.sortArrayByProperty(collectionUtils.objToArray(_teams),  'totalAwayPoints');
        }

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
         * Returns an ordered array according to the position of each team in the table; overall stats table
         */
        function getOverallTeamPositions(){
            return _overallTeamPosition;
        }

        /**
         * Returns an ordered array according to the position of each team in the table; home stats table
         */
        function getHomeTeamPositions(){
            return _homeTeamPositions;
        }

        /**
         * Returns an ordered array according to the position of each team in the table; away stats table
         */
        function getAwayTeamPositions(){
            return _awayTeamPositions;
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

            _updateTeamPosition();
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
            getAllGames: getAllGames,
            getOverallTeamPositions: getOverallTeamPositions,
            getHomeTeamPositions: getHomeTeamPositions,
            getAwayTeamPositions: getAwayTeamPositions
        };

        // endregion
    }

    // region CommonJS

    module.exports = {
        name: 'gameResultsManager',
        type: 'factory',
        service: [
            'GameResultEnum',
            'collectionUtils',
            gameResultsManager
        ]
    };

    // endregion

})();
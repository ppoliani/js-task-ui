/**
 * Game result manager
 */
(function(){
    'use strict';

    function gameResultsManager(GameResultEnum, collectionUtils){
        // region Consts

        var WIN_POINTS = 3,
            DRAW_POINTS = 1,
            NUM_OF_GAMES_PER_GAMEWEEK = 10;

        // endregion

        // region Inner Fields

        var _teams,
            _overallTeamPosition = [],
            _homeTeamPositions = [],
            _awayTeamPositions = [],
            _games = [],
            _gameUpdateHooks = [],
            _tmpNumOfGames = 0;

        // endregion

        // region Inner Methods

        /**
         * Updates the position of the teams
         * @private
         */
        function _updateTeamPosition(){
            _overallTeamPosition = collectionUtils.sortTeams(collectionUtils.objToArray(_teams),  'Total');
            _homeTeamPositions = collectionUtils.sortTeams(collectionUtils.objToArray(_teams),  'Home');
            _awayTeamPositions = collectionUtils.sortTeams(collectionUtils.objToArray(_teams),  'Away');
        }

        /**
         * Invoked all the gameweek update listeners
         * @private
         */
        function _triggerGameWeekUpdates(){
            _tmpNumOfGames += 1;

            if(_tmpNumOfGames === NUM_OF_GAMES_PER_GAMEWEEK){
                _tmpNumOfGames = 0;

                _gameUpdateHooks.forEach(function(clb){ clb() });                
            }
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

            homeTeam.numOfHomeGames += 1;
            awayTeam.numOfAwayGames += 1;

            homeTeam.goalsScoredHome += game.homeGoals;
            homeTeam.goalsConcededHome += game.awayGoals;

            awayTeam.goalsScoredAway += game.awayGoals;
            awayTeam.goalsConcededAway += game.homeGoals;

            if (game.homeGoals > game.awayGoals){
                homeTeam.homePoints += WIN_POINTS;
                homeTeam.numOfHomeWins += 1;
                awayTeam.numOfAwayLosses += 1;

                homeTeam.updateForm(GameResultEnum.Win);
                awayTeam.updateForm(GameResultEnum.Loss);
            }
            else if(game.awayGoals > game.homeGoals){
                awayTeam.awayPoints += WIN_POINTS;
                awayTeam.numOfAwayWins += 1;
                homeTeam.numOfHomeLosses += 1;

                homeTeam.updateForm(GameResultEnum.Loss);
                awayTeam.updateForm(GameResultEnum.Win);
            }
            else {
                homeTeam.homePoints += DRAW_POINTS;
                homeTeam.numOfHomeDraws += 1;

                awayTeam.awayPoints += DRAW_POINTS;
                awayTeam.numOfAwayDraws += 1;

                homeTeam.updateForm(GameResultEnum.Draw);
                awayTeam.updateForm(GameResultEnum.Draw);
            }

            _updateTeamPosition();
            _triggerGameWeekUpdates();
        }

        /**
         * Returns all the games that have been played
         * @returns {Array}
         */
        function getAllGames(){
            return _games;
        }

        // endregion

        // region Events

         /**
         * Regiosters a callback funciton that will be invoked when a gameweek update is performed
         * @param clb
         */
        function onGameWeekUpdate(clb){
            _gameUpdateHooks.push(clb);
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
            getAwayTeamPositions: getAwayTeamPositions,
            onGameWeekUpdate: onGameWeekUpdate
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
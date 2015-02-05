/**
 * Game result manager
 */
(function(){
    'use strict';

    function gameResultsManagerService(GameResultEnum){
        // region Consts

        var WIN_POINTS = 3,
            DRAW_POINTS = 1;

        // endregion

        // region Inner Fields

        var _teams;

        // endregion

        // region Inner Methods

        function storeTeams(teams){
            _teams = teams;
        }

        function findGameResult(game){
            var homeTeam = _teams[game.homeTeamId],
                awayTeam = _teams[game.awayTeamId];

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

        function getTeamById(teamId){
            return _teams[teamId];
        }

        // endregion

        // region Public API

        return {
            storeTeams: storeTeams,
            findGameResult: findGameResult,
            getTeamById: getTeamById
        };

        // endregion
    }

    // region CommonJS

    module.exports = {
        name: 'gameResultsManagerService',
        type: 'factory',
        service: ['GameResultEnum', gameResultsManagerService]
    };

    // endregion

})();
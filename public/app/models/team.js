/**
* Team model
*/
(function(){
    'use strict';

    function Team(){

        // region Consts

        var NUM_OF_LAST_GAMES = 5;

        // endregion

        // region Ctor

        function Team(id, name){
            if(!id)throw new Error('Please give an id for this team');
            if(!name)throw new Error('Please give a name for this team');

            this.id = id;
            this.name = name;

            this.numOfHomeGames  = 0;
            this.numOfAwayGames  = 0;
            this.homePoints = 0;
            this.awayPoints = 0;
            this.numOfHomeWins = 0;
            this.numOfAwayWins = 0;
            this.numOfHomeDraws = 0;
            this.numOfAwayDraws = 0;
            this.numOfHomeLosses = 0;
            this.numOfAwayLosses = 0;
            this.goalsScoredHome = 0;
            this.goalsScoredAway = 0;
            this.goalsConcededHome = 0;
            this.goalsConcededAway = 0;

            this.form = [];
        }

        Team.prototype = (function(){

            function updateForm(gameResult){
                if(!gameResult) throw new Error('game result is required to set the teams form');

                this.form.unshift(gameResult);
            }

            function getFormForLastNGames(n){
                return this.form.slice(0, n);
            }

            // region Public Api

            var publicAPI = {
                constructor: Team,

                updateForm: updateForm,
                getFormForLastNGames: getFormForLastNGames
            };

            // endregion

            return publicAPI;

        })();

        // endregion

        // region Properties

        Object.defineProperties(Team.prototype, {
            numOfTotalGames: {
                get: function get_totalPoints(){
                    return this.numOfHomeGames + this.numOfAwayGames;
                }
            },

            totalPoints: {
                get: function get_totalPoints(){
                    return this.homePoints + this.awayPoints;
                }
            },

            numOfTotalWins: {
                get: function get_numOfTotalWins(){
                    return this.numOfHomeWins + this.numOfAwayWins;
                }
            },

            numOfTotalDraws: {
                get: function get_numOfTotalDraws(){
                    return this.numOfHomeDraws + this.numOfAwayDraws;
                }
            },

            numOfTotalLosses: {
                get: function get_numOfTotalLosses(){
                    return this.numOfHomeLosses + this.numOfAwayLosses;
                }
            },

            goalsScoredTotal: {
                get: function get_totalGoalsScored(){
                    return this.goalsScoredHome + this.goalsScoredAway;
                }
            },

            goalsConcededTotal: {
                get: function get_totalGoalsConceded(){
                    return this.goalsConcededHome + this.goalsConcededAway;
                }
            }
        });

        // endregion

        return Team;
    }

    // region CommonJS

    module.exports = {
        name: 'Team',
        ctor: [Team]
    };

    // endregion

})();
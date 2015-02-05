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

            this.totalHomePoints = 0;
            this.totalAwayPoints = 0;
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

            // region Public Api

            var publicAPI = {
                constructor: Team,

                updateForm: updateForm
            };

            // endregion

            return publicAPI;

        })();

        // endregion

        // region Properties

        Object.defineProperties(Team.prototype, {
            totalPoints: {
                get: function get_totalPoints(){
                    return this.totalHomePoints + this.totalAwayPoints;
                }
            },

            numOfWins: {
                get: function get_totalPoints(){
                    return this.numOfHomeWins + this.numOfAwayWins;
                }
            },

            numOfDraws: {
                get: function get_totalPoints(){
                    return this.numOfHomeDraws + this.numOfAwayDraws;
                }
            },

            numOfLosses: {
                get: function get_totalPoints(){
                    return this.numOfHomeLosses + this.numOfAwayLosses;
                }
            },

            totalGoalsScored: {
                get: function get_totalPoints(){
                    return this.goalsScoredHome + this.goalsScoredAway;
                }
            },

            totalGoalsConceded: {
                get: function get_totalPoints(){
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
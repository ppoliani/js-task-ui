/**
 * Generic Stats table
 */
(function(){
    'use strict';

    function statsTableDirective(){

        function statsTableCtrl($scope){

            // region Viewmodel

            $scope.reactProps = {
                teams: this.teams,
                type: this.type
            };

            $scope.$watch(function(){ return this.teams }.bind(this), function(){
                $scope.reactProps = {
                    teams: this.teams,
                    type: this.type
                };
            }.bind(this));

            this.getNumOfGames = function getNumOfGames(team){
                return team['numOf' + this.type + 'Games'];
            };

            this.getNumOfWins = function getNumOfWins(team){
                return team['numOf' + this.type + 'Wins'];
            };

            this.getNumOfDraws = function getNumOfDraws(team){
                return team['numOf' + this.type + 'Draws'];
            };

            this.getNumOfLosses = function getNumOfLosses(team){
                return team['numOf' + this.type + 'Losses'];
            };

            this.getNumOfGoalsScored= function getNumOfGoalsScored(team){
                return team['goalsScored' + this.type];
            };

            this.getNumOfGoalsConceded = function getNumOfGoalsConceded(team){
                return team['goalsConceded' + this.type];
            };

            this.getPoints = function getPoints(team){
                return team[(this.type.toLowerCase()) + 'Points'];
            };

            this.getTeamFormClassName = function getTeamFormClassName(form){
                switch(form.value){
                    case 'W':
                        return 'stats-table__team-form--win';
                    case 'D':
                        return 'stats-table__team-form--draw';
                    case 'L':
                        return 'stats-table__team-form--loss';
                }
            };

            // endregion

        }

        return {
            restrict: 'AE',
            templateUrl: '/public/app/components/statsTable/statsTable.html',
            scope: {
                teams: '=',
                type: '@'
            },
            controller: ['$scope', statsTableCtrl],
            controllerAs: 'vm',
            bindToController: true
        };
    }

    // region CommonJS

    module.exports = {
        name: 'statsTable',
        directive: [statsTableDirective]
    };

    // endregion

})();
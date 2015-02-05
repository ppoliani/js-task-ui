/**
 * Determines the various zone in the league standings table
 */
(function(){
    'use strict';

    function standingZonesManagerService(){

        // region Consts

        var RELAGATION_ZONE_POSITIONS = [18, 19, 20],
            CHAMPIONS_LEAGUE_POSITIONS = [1, 2, 3],
            CHAMPIONS_LEAGUE_QUALIFICATION_POSITIONS = [4],
            EUROPE_LEAGUE_POSITIONS = [5];

        // endregion

        // region Inner Methods

        function isInRelegationZone(position){
            return RELAGATION_ZONE_POSITIONS.indexOf(position) !== -1;
        }

        function isInChampionsLeagueZone(position){
            return CHAMPIONS_LEAGUE_POSITIONS.indexOf(position) !== -1;
        }

        function isInChampionsLeagueQualificationZone(position){
            return CHAMPIONS_LEAGUE_QUALIFICATION_POSITIONS.indexOf(position) !== -1;
        }

        function isInEuropeLeagueZone(position){
            return EUROPE_LEAGUE_POSITIONS.indexOf(position) !== -1;
        }

        // endregion

        // region Public API

        return {
            isInRelegationZone: isInRelegationZone,
            isInChampionsLeagueZone: isInChampionsLeagueZone,
            isInChampionsLeagueQualificationZone: isInChampionsLeagueQualificationZone,
            isInEuropeLeagueZone: isInEuropeLeagueZone
        };

        // endregion
    }

    // region CommonJS

    module.exports = {
        name: 'standingZonesManager',
        type: 'factory',
        service: [standingZonesManagerService]
    };

    // endregion

})();
/**
 * Determines the various zone in the league standings table
 */
(function(){
    'use strict';

    function standingZonesManagerService(){

        // region Inner Methods

        function isInRelegationZone(){
            throw 'Not Implemented';
        }

        function isInChampionsLeagueZone(){
            throw 'Not Implemented';
        }

        function isInChampionsLeagueClassificationZone(){
            throw 'Not Implemented';
        }

        function isInEuropeLeagueZone(){
            throw 'Not Implemented';
        }

        // endregion

        // region Public API

        return {
            isInRelegationZone: isInRelegationZone,
            isInChampionsLeagueZone: isInChampionsLeagueZone,
            isInChampionsLeagueClassificationZone: isInChampionsLeagueClassificationZone,
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
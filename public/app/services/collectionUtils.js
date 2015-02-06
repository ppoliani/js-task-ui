/**
 * Collection utility functions
 */
(function(){
    'use strict';

    function collectionUtils(){

        // region Inner Methods

        function objToArray(obj){
            return Object.keys(obj).map(function(key){ return obj[key]; })
        }

        /**
         * Sorts the collection according to the some rules
         * @param arr
         * @param statType
         */
        function sortTeams(arr, statType){
            var lPoints = 0,
                rPoints = 0,
                lGoalDiff = 0,
                rGoalDiff = 0;

            arr.sort(function(l, r){ // DESC
                lPoints = l[(statType.toLowerCase()) + 'Points'];
                rPoints = r[(statType.toLowerCase()) + 'Points'];

                if(rPoints > lPoints) {
                    return 1;
                }

                if(rPoints < lPoints) {
                    return -1;
                }

                if(rPoints === lPoints){ 
                    // goal diff
                    lGoalDiff = l['goalsScored' + statType] - l['goalsConceded' + statType];
                    rGoalDiff = r['goalsScored' + statType] - r['goalsConceded' + statType];

                    if(rGoalDiff > lGoalDiff){
                        return 1;
                    }

                    if(rGoalDiff < lGoalDiff){
                        return -1;
                    }

                    else { 
                        return l.name.localeCompare(r.name);
                    }
                }
            });


            return arr;
        }

        // endregion

        // region Public API

        return {
            objToArray: objToArray,
            sortTeams: sortTeams
        };

        // endregion
    }

    // region CommonJS

    module.exports = {
        name: 'collectionUtils',
        type: 'factory',
        service: [collectionUtils]
    };

    // endregion

})();
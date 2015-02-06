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
                lGoalsScored = 0,
                rGoalsScored = 0;

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
                    lGoalsScored = l['goalsScored' + statType];
                    rGoalsScored = r['goalsScored' + statType];

                    if(rGoalsScored > lGoalsScored){
                        return 1;
                    }

                    if(rGoalsScored < lGoalsScored){
                        return -1;
                    }

                    else {
                        return r[name] - l[name];
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
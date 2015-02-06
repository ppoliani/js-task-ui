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

        function sortArrayByProperty(arr, prop){
            arr.sort(function(l, r){ // DESC
                return r[prop] - l[prop]
            });


            return arr;
        }

        // endregion

        // region Public API

        return {
            objToArray: objToArray,
            sortArrayByProperty: sortArrayByProperty
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
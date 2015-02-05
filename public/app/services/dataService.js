/**
 * Http service
 */
(function(){
    'use strict';

    function dataService($q, $http){

        // region Inner Methods

        function get(url){
            return $q(function(resolve, reject){
                $http.get(url)
                    .success(resolve)
                    .error(reject);
            });
        }

        // endregion

        // region Public API

        return {
            get: get
        };

        // endregion
    }

    // region CommonJS

    module.exports = {
        name: 'dataService',
        type: 'factory',
        service: ['$q', '$http', dataService]
    };

    // endregion

})();
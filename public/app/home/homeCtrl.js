/**
 * Home ctrl
 */
(function(){
    'use strict';

    function HomeCtrl(gamesLoader, Team){

        // region Setup

        gamesLoader.init(on_msg, on_error);

        // endregion

        // region Inner Fields


        // endregion

        // region Viewmodel

        // endregion

        // region Events

        function on_msg(msg){
            console.info(msg);
        }

        function on_error(error){
            console.error(error);
        }

        // endregion
    }

    // region CommonJS

    module.exports = {
        name: 'homeCtrl',
        ctrl: ['gamesLoaderService', HomeCtrl]
    };
    
    // endregion

})();

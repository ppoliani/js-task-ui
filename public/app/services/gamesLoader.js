/**
 * Loads the game result through a websocket
 */
(function(){
    'use strict';
    
    function gamesLoaderService(WebSocketClient){
        // region Consts

        var WS_URL = '127.0.0.1:8080/games';

        // endregion

        // region Inner Methods

        /**
         * Initializes the web socket client
         * @param on_msg
         * @param on_error
         */
        function init(on_msg, on_error){
            var webSocketClient = new WebSocketClient();

            webSocketClient.init(WS_URL, on_msg, on_error);
        }

        // endregion
        
        // region Public API
        
        return {
            init: init
        };
        
        // endregion
    }
    
    // region CommonJS
    
    module.exports = {
        name: 'gamesLoaderService',
        type: 'factory',
        service: ['WebSocketClient', gamesLoaderService]
    };
    
    // endregion

})();
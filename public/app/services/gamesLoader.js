/**
 * Loads the game result through a websocket
 */
(function(){
    'use strict';
    
    function gamesLoaderService(WebSocketClientService){
        // region Consts

        var WS_URL = '127.0.0.1:8080/games';

        // endregion

        // region Inner Methods

        function init(on_msg, on_error){
            var webSocketClientService = new WebSocketClientService();

            webSocketClientService.init(WS_URL, on_msg, on_error);
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
        service: ['WebSocketClientService', gamesLoaderService]
    };
    
    // endregion

})();
/**
 * A Web Socket Client
 */
(function(){
    'use strict';

    function WebSocketClientService(){

        // region Inner Methods

        function init(url, onmsg, onerr){
            if(!url) throw new Error('WebSocket url is required');

            this._url = url;
            this._connection = new window.WebSocket('ws://' + url);

            // events
            this._connection.onopen = onopen.bind(this);
            this._connection.onerror = onerror.bind(this, onerr);
            this._connection.onmessage = onmessage.bind(this, onmsg);
        }

        function onopen(){
            console.info("Socket opened :" + this._url);
        }

        function onerror(clb, error){
            clb(error);
        }

        function onmessage(clb, msg){
            try {
                var json = JSON.parse(msg.data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', msg.data);
                return;
            }

            clb(json);
        }

        // endregion

        // region Ctor

        function WebSocketClient(){
            this._url = undefined;
            this._connection = null;

        }

        WebSocketClient.prototype = (function(){
            return {
                constructor: WebSocketClient,
                init: init
            };
        })();

        // endregion

        // region Public API

        return WebSocketClient;

        // endregion
    }

    // region CommonJS

    module.exports = {
        name: 'WebSocketClientService',
        type: 'factory',
        service: [WebSocketClientService]
    };

    // endregion

})();
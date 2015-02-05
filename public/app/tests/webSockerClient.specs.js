describe('The webSocketClient Service', function(){
    var utils = require('./utils'),

        expect = chai.expect,
        webSocketClient,

        url = '127.0.0.1:8080/games',

        validJSON = "{\"x\": \"some data\"}";

    beforeEach(function(){
        angular.mock.module(utils.moduleName);
    });

    beforeEach(inject(function(WebSocketClient){
        var connectionMock = sinon.mock({
            onopen: function(clb){ clb(); },
            onerror: function(clb){ clb('error'); },
            onmessage: function(clb){ clb({ data: {} }); }
        });

        webSocketClient = new WebSocketClient();

        window.WebSocket = sinon.stub().returns(connectionMock);
    }));

    describe('The init method', function(){
        it('It should throw an exception is no url is provided', function(){
            // Act
            try {
                webSocketClient.init();
            }
            catch(ex){
                expect(ex.message).to.be.equal('WebSocket url is required');
            }
        });

        it('It should open a webSocket at the given url', function(){
            // Act
            webSocketClient.init(url);

            // Act
            expect(window.WebSocket).to.have.been.called;
        });

        it('It should invoke the onerror callback when an error occurs', function(){
            // Arrange
            var onerror = sinon.spy();

            // Act
            webSocketClient.init(url, null, onerror);
            webSocketClient._connection.onerror();

            // Act
            expect(onerror).to.have.been.called;
        });

        it('It should throw an exception when the message arrived cannot me deserialized', function(){
            // Arrange
            var onmessage = sinon.spy();

            // Act
            webSocketClient.init(url, onmessage, null);

            try{
                webSocketClient._connection.onmessage({ data: {} });
            }
            catch(ex){
                // Act
                expect(ex).not.to.be.null;
            }
        });

        it('It should invoke the onmessage callback when a new message arrives and the deserializaion is successfull', function(){
            // Arrange
            var onmessage = sinon.spy();

            // Act
            webSocketClient.init(url, onmessage, null);

            webSocketClient._connection.onmessage({ data: validJSON });

            // Act
            expect(onmessage).to.have.been.called;
        });
    });
});
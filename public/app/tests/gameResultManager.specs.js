describe('The gameResultManager', function(){
    var expect = chai.expect,
        gameResultManager;

    beforeEach(function(){
        angular.mock.module(utils.moduleName);
    });

    beforeEach(inject(function(_gameResultManager_){
        gameResultManager = _gameResultManager_;
    }));


    describe('Tmp', function(){
        expect(true).to.be.true;
    });
});
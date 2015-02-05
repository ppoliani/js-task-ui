describe('The standingZonesManager service', function(){
    var utils = require('./utils'),
        expect = chai.expect,
        standingZonesManager;

    beforeEach(function(){
        angular.mock.module(utils.moduleName);
    });

    beforeEach(inject(function(_standingZonesManager_){
        standingZonesManager = _standingZonesManager_;
    }));

    describe('The isInRelagatioZone method', function(){
        it('The isInRelegationZone method should return true if the position is 18-20', function(){
            // Act
            expect(standingZonesManager.isInRelegationZone(18)).to.be.true;
            expect(standingZonesManager.isInRelegationZone(19)).to.be.true;
            expect(standingZonesManager.isInRelegationZone(20)).to.be.true;
        });

        it('The isInChampionsLeagueZone method should return true if the position is 1-3', function(){
            // Act
            expect(standingZonesManager.isInChampionsLeagueZone(1)).to.be.true;
            expect(standingZonesManager.isInChampionsLeagueZone(2)).to.be.true;
            expect(standingZonesManager.isInChampionsLeagueZone(3)).to.be.true;
        });

        it('The isInChampionsLeagueQualificationZone method should return true if the position is 4', function(){
            // Act
            expect(standingZonesManager.isInChampionsLeagueQualificationZone(4)).to.be.true;
        });

        it('The isInEuropeLeagueZone method should return true if the position is 5', function(){
            // Act
            expect(standingZonesManager.isInEuropeLeagueZone(5)).to.be.true;
        });
    });
});
describe('The gameResultManager', function(){
	var utils = require('./utils'),

        expect = chai.expect,
        collectionUtils,
        teams;

   beforeEach(function(){
        angular.mock.module(utils.moduleName);
    });

    beforeEach(inject(function(_collectionUtils_, Team){
        collectionUtils = _collectionUtils_;

        teams = {
            "1": new Team(1, "Blackburn"),
            "2": new Team(2, "Wolves")
        };
    }));

    describe('The sortTeams method', function(){
    	it('Should sort by points first', function(){

    		// Act 
    		//collectionUtils.sortTeams(teams, 'Total');

    	});
    });
});
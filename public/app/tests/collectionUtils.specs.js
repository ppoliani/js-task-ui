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

        var teamA = new Team(1, 'Burnley'),
        	teamB = new Team(2, 'Blackburn'),
        	teamC = new Team(3, 'Arsenal');

        	teams = [teamA, teamB, teamC];
    }));

    describe('The sortTeams method', function(){
    	it('Should sort by points first', function(){
    		// Arrange 
    		teams[0].homePoints = 10;
    		teams[0].awayPoints = 15;

    		teams[1].homePoints = 10;
    		teams[1].awayPoints = 5;

    		teams[2].homePoints = 10;
    		teams[2].awayPoints = 10;

    		// Act 
    		var sortedArr = collectionUtils.sortTeams(teams, 'Total');

    		// Assert
    		expect(sortedArr[0].name).to.equal('Burnley');
    		expect(sortedArr[1].name).to.equal('Arsenal');
    		expect(sortedArr[2].name).to.equal('Blackburn');
    	});

    	it('Should sort by goal diff if point the same', function(){
    		// Arrange 
    		teams[0].homePoints = 10;
    		teams[0].awayPoints = 15;
    		teams[0].goalsScoredHome = 50;
    		teams[0].goalsScoredAway = 50;
    		teams[0].goalsConcededHome = 25;
    		teams[0].goalsConcededAway = 25;

    		teams[1].homePoints = 10;
    		teams[1].awayPoints = 15;
    		teams[1].goalsScoredHome = 50;
    		teams[1].goalsScoredAway = 50;
    		teams[1].goalsConcededHome = 10;
    		teams[1].goalsConcededAway = 25;

    		teams[2].homePoints = 10;
    		teams[2].awayPoints = 10;

    		// Act 
    		var sortedArr = collectionUtils.sortTeams(teams, 'Total');

    		// Assert
    		expect(sortedArr[0].name).to.equal('Blackburn');
    		expect(sortedArr[1].name).to.equal('Burnley');
    		expect(sortedArr[2].name).to.equal('Arsenal');
    	});

    	it('Should sort by name if point and goal diff are the same', function(){
    		// Arrange 
    		teams[0].homePoints = 10;
    		teams[0].awayPoints = 15;
    		teams[0].goalsScoredHome = 60;
    		teams[0].goalsScoredAway = 50;
    		teams[0].goalsConcededHome = 25;
    		teams[0].goalsConcededAway = 25;


    		teams[1].homePoints = 10;
    		teams[1].awayPoints = 15;
    		teams[1].goalsScoredHome = 60;
    		teams[1].goalsScoredAway = 50;
    		teams[1].goalsConcededHome = 25;
    		teams[1].goalsConcededAway = 25;

    		teams[2].homePoints = 10;
    		teams[2].awayPoints = 10;

    		// Act 
    		var sortedArr = collectionUtils.sortTeams(teams, 'Total');

    		// Assert
    		expect(sortedArr[0].name).to.equal('Blackburn');
    		expect(sortedArr[1].name).to.equal('Burnley');
    		expect(sortedArr[2].name).to.equal('Arsenal');
    	});
    });
});
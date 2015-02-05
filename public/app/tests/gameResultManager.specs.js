describe('The gameResultManager', function(){
    var utils = require('./utils'),

        expect = chai.expect,
        gameResultsManager,
        teams;

    beforeEach(function(){
        angular.mock.module("app.core");
    });

    beforeEach(inject(function(gameResultsManagerService, Team){
        gameResultsManager = gameResultsManagerService;

        teams = {
            "1": new Team(1, "Blackburn"),
            "2": new Team(2, "Wolves")
        };

        gameResultsManager.storeTeams(teams);
    }));


    describe('The findGameResult method', function(){
        it('It should correctly set the home/away goals', function(){
            // Arrange
            var game = {
                date: "13/08/11",
                homeTeamId: 1,
                awayTeamId: 2,
                homeGoals: 1,
                awayGoals: 2
            };

            // Act
            gameResultsManager.findGameResult(game);

            // Assert
            expect(gameResultsManager.getTeamById(1).goalsScoredHome).to.equal(1);
            expect(gameResultsManager.getTeamById(1).goalsConcededHome).to.equal(2);


            expect(gameResultsManager.getTeamById(2).goalsScoredAway).to.equal(2);
            expect(gameResultsManager.getTeamById(2).goalsConcededAway).to.equal(1);
        });

        it('It should correctly set the home/away goals scored/conceded for more that one game', function(){
            // Arrange
            var games = [{
                date: "12/03/12",
                homeTeamId: 1,
                awayTeamId: 2,
                homeGoals: 1,
                awayGoals: 2
            }, {
                date: "13/08/11",
                homeTeamId: 2,
                awayTeamId: 1,
                homeGoals: 5,
                awayGoals: 2
            }];

            // Act
            games.forEach(function(game){ gameResultsManager.findGameResult(game) });

            // Assert
            expect(gameResultsManager.getTeamById(1).goalsScoredHome).to.equal(1);
            expect(gameResultsManager.getTeamById(1).goalsScoredAway).to.equal(2);
            expect(gameResultsManager.getTeamById(1).goalsConcededHome).to.equal(2);
            expect(gameResultsManager.getTeamById(1).goalsConcededAway).to.equal(5);


            expect(gameResultsManager.getTeamById(2).goalsScoredHome).to.equal(5);
            expect(gameResultsManager.getTeamById(2).goalsConcededHome).to.equal(2);
            expect(gameResultsManager.getTeamById(2).goalsScoredAway).to.equal(2);
            expect(gameResultsManager.getTeamById(2).goalsConcededAway).to.equal(1);
        });

        it('It should set 3 points to the away team if it has won the game', function(){
            // Arrange
            var game = {
                date: "13/08/11",
                homeTeamId: 1,
                awayTeamId: 2,
                homeGoals: 1,
                awayGoals: 2
            };

            // Act
            gameResultsManager.findGameResult(game);

            // Assert
            expect(gameResultsManager.getTeamById(1).totalHomePoints).to.equal(0);
            expect(gameResultsManager.getTeamById(2).totalAwayPoints).to.equal(3);
        });

        it('It should set 3 points to the home team if it has won the game', function(){
            // Arrange
            var game = {
                date: "13/08/11",
                homeTeamId: 1,
                awayTeamId: 2,
                homeGoals: 3,
                awayGoals: 2
            };

            // Act
            gameResultsManager.findGameResult(game);

            // Assert
            expect(gameResultsManager.getTeamById(1).totalHomePoints).to.equal(3);
            expect(gameResultsManager.getTeamById(2).totalAwayPoints).to.equal(0);
        });

        it('It should set 1 point to the each team if the result was draw', function(){
            // Arrange
            var game = {
                date: "13/08/11",
                homeTeamId: 1,
                awayTeamId: 2,
                homeGoals: 2,
                awayGoals: 2
            };

            // Act
            gameResultsManager.findGameResult(game);

            // Assert
            expect(gameResultsManager.getTeamById(1).totalHomePoints).to.equal(1);
            expect(gameResultsManager.getTeamById(2).totalAwayPoints).to.equal(1);
        });
    });
});
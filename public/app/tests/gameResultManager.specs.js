describe('The gameResultManager', function(){
    var utils = require('./utils'),

        expect = chai.expect,
        gameResultsManager,
        teams;

    beforeEach(function(){
        angular.mock.module(utils.moduleName);
    });

    beforeEach(inject(function(_gameResultsManager_, Team){
        gameResultsManager = _gameResultsManager_;

        teams = {
            "1": new Team(1, "Blackburn"),
            "2": new Team(2, "Wolves")
        };

        gameResultsManager.storeTeams(teams);
    }));

    describe('The findGameResult method', function(){
        it('Should store the game to the local data collection', function(){
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

            expect(gameResultsManager.getAllGames()[0]).to.equal(game);
        });

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

        it('It should increment the num of home wins if the home team has won', function(){
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
            expect(gameResultsManager.getTeamById(1).numOfHomeWins).to.equal(1);
            expect(gameResultsManager.getTeamById(2).numOfHomeWins).to.equal(0);
        });

        it('It should increment the num of away wins if the away team has won', function(){
            // Arrange
            var game = {
                date: "13/08/11",
                homeTeamId: 1,
                awayTeamId: 2,
                homeGoals: 3,
                awayGoals: 5
            };

            // Act
            gameResultsManager.findGameResult(game);

            // Assert
            expect(gameResultsManager.getTeamById(1).numOfHomeWins).to.equal(0);
            expect(gameResultsManager.getTeamById(2).numOfAwayWins).to.equal(1);
        });

        it('It should increment the num of home and away draws if the away team has won', function(){
            // Arrange
            var game = {
                date: "13/08/11",
                homeTeamId: 1,
                awayTeamId: 2,
                homeGoals: 3,
                awayGoals: 3
            };

            // Act
            gameResultsManager.findGameResult(game);

            // Assert
            expect(gameResultsManager.getTeamById(1).numOfHomeDraws).to.equal(1);
            expect(gameResultsManager.getTeamById(2).numOfAwayDraws).to.equal(1);
        });

        it('It should update the form of both teams', function(){
            // Arrange
            var game = {
                date: "13/08/11",
                homeTeamId: 1,
                awayTeamId: 2,
                homeGoals: 3,
                awayGoals: 3
            };

            // Act
            gameResultsManager.findGameResult(game);

            // Assert
            expect(gameResultsManager.getTeamById(1).form[0].value).to.equal('D');
            expect(gameResultsManager.getTeamById(2).form[0].value).to.equal('D');
        });
    });
});
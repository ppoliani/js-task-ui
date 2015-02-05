describe('The team module', function(){
    var utils = require('./utils'),

        expect = chai.expect,
        teams,
        GameResultEnum;

    beforeEach(function(){
        angular.mock.module(utils.moduleName);
    });

    beforeEach(inject(function(_GameResultEnum_, Team){
        GameResultEnum = _GameResultEnum_;

        teams = {
            "1": new Team(1, "Blackburn"),
            "2": new Team(2, "Wolves"),
            "3": new Team(3, "Liverpool")
        };
    }));

    describe('The updateForm method', function(){
        it('It should update the form of the team', function(){
            // Act
            teams[1].updateForm(GameResultEnum.Win);
            teams[2].updateForm(GameResultEnum.Loss);
            teams[3].updateForm(GameResultEnum.Draw);

            // Assert
            expect(teams[1].form[0].value).to.equal('W');
            expect(teams[2].form[0].value).to.equal('L');
            expect(teams[3].form[0].value).to.equal('D');
        });

        it('It should throw an exception if no game result is provided', function(){
            // Act/Assert
            try{
                teams[1].updateForm();
            }
            catch(ex){
                expect(ex.message).to.equal('game result is required to set the teams form');
            }
        });
    });
});
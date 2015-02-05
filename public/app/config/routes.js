// region Consts

// This is relative to the nodeJS static files directory !!!
var BASE_DIR = '/public/app/';

// endregion

// region Inner Methods

/**
 * Registers front end routes
 * @param app
 */
function configure(app) {
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: _getPath('home/index'),
                controller: 'homeCtrl as  homeCtrl',
                title: 'Premier League Table',

                resolve: {
                    teamsResolved: ['API_ENDPOINT', 'dataService', 'gameResultManager', 'Team',  function(API_ENDPOINT, dataService, gameResultManager, Team){
                        return dataService.get(API_ENDPOINT + 'teams')
                            .then(function(result){
                                gameResultManager.storeTeams(result.map(function(team){ return new Team(team.id, team.name) }));
                            })
                            .error(function(msg){
                                console.error(msg);
                            });
                    }]
                }
            });

        $routeProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }]);
}

/**
 * Return the paths relative to base dir
 *
 * @param filePath
 * @returns {string}
 * @private
 */
function _getPath(filePath){
    return BASE_DIR + filePath + '.html';
}

// endregion

module.exports = configure;


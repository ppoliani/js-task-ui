/**
 * Loads all the services of the app
 */
module.exports = [
    require('../data-services/ws-client'),
    require('../services/gamesLoader'),
    require('../services/dataService'),
    require('../services/gameResultsManager'),
    require('../services/standingZonesManager'),
    require('../services/collectionUtils')
];
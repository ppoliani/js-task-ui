/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	    'use strict';
	
	    // region Deps
	
	    var
	        angular = __webpack_require__(1),
	        routes = __webpack_require__(2),
	        routeCallbacks = __webpack_require__(3),
	        controllers = __webpack_require__(4),
	        services = __webpack_require__(5),
	        models = __webpack_require__(6),
	        constants = __webpack_require__(7),
	        values = __webpack_require__(8),
	        directives = __webpack_require__(9);
	
	    // endregion
	
	    // region Private Fields
	
	    var
	        _mainModule = angular.module('app.core', [
	            'ngRoute',
	            'app.services',
	            'app.controllers',
	            'app.models',
	            'app.directives'
	        ]),
	
	        servicesModule = angular.module('app.services', []),
	        controllersModule = angular.module('app.controllers', []),
	        modelsModule = angular.module('app.models', []),
	        directivesModule = angular.module('app.directives', []);
	
	    // endregion
	
	    // region Register all Controllers
	
	    controllers.forEach(function(controller){
	        controllersModule.controller(controller.name, controller.ctrl);
	    });
	
	    // endregion
	
	    // region Register All Services
	
	    services.concat(constants).concat(values).forEach(function(service){
	        servicesModule[service.type](service.name, service.service);
	    });
	
	    // endregion
	
	    // region Register All Models
	
	    models.forEach(function(model){
	        modelsModule.factory(model.name, model.ctor);
	    });
	
	    // endregion
	
	    // region Register All Directives
	
	    directives.forEach(function(directive){
	        directivesModule.directive(directive.name, directive.directive);
	    });
	
	    // endregion
	
	    // region Config Phase
	
	    routes(_mainModule);
	    routeCallbacks(_mainModule);
	
	    // endregion
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	                    teamsResolved: ['API_ENDPOINT', 'dataService', 'gameResultsManager', 'Team',  function(API_ENDPOINT, dataService, gameResultsManager, Team){
	                        return dataService.get(API_ENDPOINT + 'teams')
	                            .then(function(result){
	                                gameResultsManager.storeTeams(result.reduce(function(dic, team){
	                                    dic[team.id] = new Team(team.id, team.name);
	
	                                    return dic;
	                                }, {}));
	                            })
	                            .catch(function(msg){
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
	


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	function configure(app){
	    app.run(['$rootScope', function($rootScope){
	        $rootScope.$on('$routeChangeSuccess', function(event, route){
	            $rootScope.title = 'Football Rader | ' + route.title;
	        });
	    }]);
	}
	
	module.exports = configure;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Loads all the controllers of the app
	 */
	module.exports = [
	    __webpack_require__(10)
	];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Loads all the services of the app
	 */
	module.exports = [
	    __webpack_require__(11),
	    __webpack_require__(12),
	    __webpack_require__(13),
	    __webpack_require__(14),
	    __webpack_require__(15)
	];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Loads all the models of the app
	 */
	module.exports = [
	    __webpack_require__(16),
	    __webpack_require__(17)
	];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = [{
	  name: 'API_ENDPOINT',
	  type: 'constant',
	  service: 'http://localhost:8080/'
	}];


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Contains all the value services that will be used in the app
	 */
	module.exports = [{
	    name: 'GameResultEnum',
	    type: 'value',
	    service: {
	        Win: {
	            value: 'W',
	            label: 'Win'
	        },
	
	        Draw: {
	            value:  'D',
	            label: 'Draw'
	        },
	
	        Loss: {
	            value: 'L',
	            label: 'Loss'
	        }
	    }
	}];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Loads all the directives
	 */
	module.exports = [
	    __webpack_require__(18),
	    __webpack_require__(19)
	];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Home ctrl
	 */
	(function(){
	    'use strict';
	
	    function HomeCtrl(Game, gamesLoader, gameResultsManager, standingZonesManager){
	
	        // region Setup
	
	        gamesLoader.init(on_msg, on_error);
	
	        // endregion
	
	        // region Inner Fields
	
	
	        // endregion
	
	        // region Viewmodel
	
	        this.teams = gameResultsManager.getAllTeams();
	        this.zonesManager = standingZonesManager;
	
	        // endregion
	
	        // region Events
	
	        /**
	         * Invoked when the webSocker has got a new message
	         * @param game
	         */
	        function on_msg(game){
	            gameResultsManager.findGameResult(new Game(game));
	            this.teams = gameResultsManager.getAllTeams();
	        }
	
	        /**
	         * Invoked when the webSocket raises an error
	         * @param error
	         */
	        function on_error(error){
	            console.error(error);
	        }
	
	        // endregion
	    }
	
	    // region CommonJS
	
	    module.exports = {
	        name: 'homeCtrl',
	        ctrl: [
	            'Game',
	            'gamesLoaderService',
	            'gameResultsManager',
	            'standingZonesManager',
	            HomeCtrl
	        ]
	    };
	    
	    // endregion
	
	})();


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A Web Socket Client
	 */
	(function(){
	    'use strict';
	
	    function WebSocketClient(){
	
	        // region Inner Methods
	
	        function init(url, onmsg, onerr){
	            if(!url) throw new Error('WebSocket url is required');
	
	            this._url = url;
	            this._connection = new window.WebSocket('ws://' + url);
	
	            // events
	            this._connection.onopen = onopen.bind(this);
	            this._connection.onerror = onerror.bind(this, onerr);
	            this._connection.onmessage = onmessage.bind(this, onmsg);
	        }
	
	        function onopen(){
	            console.info("Socket opened :" + this._url);
	        }
	
	        function onerror(clb, error){
	            clb(error);
	        }
	
	        function onmessage(clb, msg){
	            try {
	                var json = JSON.parse(msg.data);
	            } catch (e) {
	                console.log('This doesn\'t look like a valid JSON: ', msg.data);
	                return;
	            }
	
	            clb(json);
	        }
	
	        // endregion
	
	        // region Ctor
	
	        function WebSocketClient(){
	            this._url = undefined;
	            this._connection = null;
	
	        }
	
	        WebSocketClient.prototype = (function(){
	            return {
	                constructor: WebSocketClient,
	                init: init
	            };
	        })();
	
	        // endregion
	
	        // region Public API
	
	        return WebSocketClient;
	
	        // endregion
	    }
	
	    // region CommonJS
	
	    module.exports = {
	        name: 'WebSocketClient',
	        type: 'factory',
	        service: [WebSocketClient]
	    };
	
	    // endregion
	
	})();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Loads the game result through a websocket
	 */
	(function(){
	    'use strict';
	    
	    function gamesLoaderService(WebSocketClient){
	        // region Consts
	
	        var WS_URL = '127.0.0.1:8080/games';
	
	        // endregion
	
	        // region Inner Methods
	
	        /**
	         * Initializes the web socket client
	         * @param on_msg
	         * @param on_error
	         */
	        function init(on_msg, on_error){
	            var webSocketClient = new WebSocketClient();
	
	            webSocketClient.init(WS_URL, on_msg, on_error);
	        }
	
	        // endregion
	        
	        // region Public API
	        
	        return {
	            init: init
	        };
	        
	        // endregion
	    }
	    
	    // region CommonJS
	    
	    module.exports = {
	        name: 'gamesLoaderService',
	        type: 'factory',
	        service: ['WebSocketClient', gamesLoaderService]
	    };
	    
	    // endregion
	
	})();

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Http service
	 */
	(function(){
	    'use strict';
	
	    function dataService($q, $http){
	
	        // region Inner Methods
	
	        function get(url){
	            return $q(function(resolve, reject){
	                $http.get(url)
	                    .success(resolve)
	                    .error(reject);
	            });
	        }
	
	        // endregion
	
	        // region Public API
	
	        return {
	            get: get
	        };
	
	        // endregion
	    }
	
	    // region CommonJS
	
	    module.exports = {
	        name: 'dataService',
	        type: 'factory',
	        service: ['$q', '$http', dataService]
	    };
	
	    // endregion
	
	})();

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Game result manager
	 */
	(function(){
	    'use strict';
	
	    function gameResultsManager(GameResultEnum){
	        // region Consts
	
	        var WIN_POINTS = 3,
	            DRAW_POINTS = 1;
	
	        // endregion
	
	        // region Inner Fields
	
	        var _teams,
	            _games = [];
	
	        // endregion
	
	        // region Inner Methods
	
	        /**
	         * Store the given teams to the local collection
	         * @param teams
	         */
	        function storeTeams(teams){
	            _teams = teams;
	        }
	
	        /**
	         * Returns all the teams
	         * @returns {*}
	         */
	        function getAllTeams(){
	            return _teams;
	        }
	
	        /**
	         * Returns the team with the given id
	         * @param teamId
	         * @returns {*}
	         */
	        function getTeamById(teamId){
	            return _teams[teamId];
	        }
	
	        /**
	         * Calculates the result of the given match and update the properties of the teams in question
	         * @param game
	         */
	        function findGameResult(game){
	            var homeTeam = _teams[game.homeTeamId],
	                awayTeam = _teams[game.awayTeamId];
	
	            _games.push(game);
	
	            homeTeam.goalsScoredHome += game.homeGoals;
	            homeTeam.goalsConcededHome += game.awayGoals;
	
	            awayTeam.goalsScoredAway += game.awayGoals;
	            awayTeam.goalsConcededAway += game.homeGoals;
	
	            if (game.homeGoals > game.awayGoals){
	                homeTeam.totalHomePoints += WIN_POINTS;
	                homeTeam.numOfHomeWins += 1;
	
	                homeTeam.updateForm(GameResultEnum.Win);
	                awayTeam.updateForm(GameResultEnum.Loss);
	            }
	            else if(game.awayGoals > game.homeGoals){
	                awayTeam.totalAwayPoints += WIN_POINTS;
	                awayTeam.numOfAwayWins += 1;
	
	                homeTeam.updateForm(GameResultEnum.Loss);
	                awayTeam.updateForm(GameResultEnum.Win);
	            }
	            else {
	                homeTeam.totalHomePoints += DRAW_POINTS;
	                homeTeam.numOfHomeDraws += 1;
	
	                awayTeam.totalAwayPoints += DRAW_POINTS;
	                awayTeam.numOfAwayDraws += 1;
	
	                homeTeam.updateForm(GameResultEnum.Draw);
	                awayTeam.updateForm(GameResultEnum.Draw);
	            }
	        }
	
	        /**
	         * Returns all the games that have been played
	         * @returns {Array}
	         */
	        function getAllGames(){
	            return _games;
	        }
	
	        // endregion
	
	        // region Public API
	
	        return {
	            storeTeams: storeTeams,
	            getAllTeams: getAllTeams,
	            getTeamById: getTeamById,
	            findGameResult: findGameResult,
	            getAllGames: getAllGames
	        };
	
	        // endregion
	    }
	
	    // region CommonJS
	
	    module.exports = {
	        name: 'gameResultsManager',
	        type: 'factory',
	        service: ['GameResultEnum', gameResultsManager]
	    };
	
	    // endregion
	
	})();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Determines the various zone in the league standings table
	 */
	(function(){
	    'use strict';
	
	    function standingZonesManager(){
	
	        // region Consts
	
	        var RELAGATION_ZONE_POSITIONS = [18, 19, 20],
	            CHAMPIONS_LEAGUE_POSITIONS = [1, 2, 3],
	            CHAMPIONS_LEAGUE_QUALIFICATION_POSITIONS = [4],
	            EUROPE_LEAGUE_POSITIONS = [5];
	
	        // endregion
	
	        // region Inner Methods
	
	        function isInRelegationZone(position){
	            return RELAGATION_ZONE_POSITIONS.indexOf(position) !== -1;
	        }
	
	        function isInChampionsLeagueZone(position){
	            return CHAMPIONS_LEAGUE_POSITIONS.indexOf(position) !== -1;
	        }
	
	        function isInChampionsLeagueQualificationZone(position){
	            return CHAMPIONS_LEAGUE_QUALIFICATION_POSITIONS.indexOf(position) !== -1;
	        }
	
	        function isInEuropeLeagueZone(position){
	            return EUROPE_LEAGUE_POSITIONS.indexOf(position) !== -1;
	        }
	
	        // endregion
	
	        // region Public API
	
	        return {
	            isInRelegationZone: isInRelegationZone,
	            isInChampionsLeagueZone: isInChampionsLeagueZone,
	            isInChampionsLeagueQualificationZone: isInChampionsLeagueQualificationZone,
	            isInEuropeLeagueZone: isInEuropeLeagueZone
	        };
	
	        // endregion
	    }
	
	    // region CommonJS
	
	    module.exports = {
	        name: 'standingZonesManager',
	        type: 'factory',
	        service: [standingZonesManager]
	    };
	
	    // endregion
	
	})();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* Team model
	*/
	(function(){
	    'use strict';
	
	    function Team(){
	
	        // region Consts
	
	        var NUM_OF_LAST_GAMES = 5;
	
	        // endregion
	
	        // region Ctor
	
	        function Team(id, name){
	            if(!id)throw new Error('Please give an id for this team');
	            if(!name)throw new Error('Please give a name for this team');
	
	            this.id = id;
	            this.name = name;
	
	            this.totalHomePoints = 0;
	            this.totalAwayPoints = 0;
	            this.numOfHomeWins = 0;
	            this.numOfAwayWins = 0;
	            this.numOfHomeDraws = 0;
	            this.numOfAwayDraws = 0;
	            this.numOfHomeLosses = 0;
	            this.numOfAwayLosses = 0;
	            this.goalsScoredHome = 0;
	            this.goalsScoredAway = 0;
	            this.goalsConcededHome = 0;
	            this.goalsConcededAway = 0;
	
	            this.form = [];
	        }
	
	        Team.prototype = (function(){
	
	            function updateForm(gameResult){
	                if(!gameResult) throw new Error('game result is required to set the teams form');
	
	                this.form.unshift(gameResult);
	            }
	
	            // region Public Api
	
	            var publicAPI = {
	                constructor: Team,
	
	                updateForm: updateForm
	            };
	
	            // endregion
	
	            return publicAPI;
	
	        })();
	
	        // endregion
	
	        // region Properties
	
	        Object.defineProperties(Team.prototype, {
	            totalPoints: {
	                get: function get_totalPoints(){
	                    return this.totalHomePoints + this.totalAwayPoints;
	                }
	            },
	
	            numOfWins: {
	                get: function get_totalPoints(){
	                    return this.numOfHomeWins + this.numOfAwayWins;
	                }
	            },
	
	            numOfDraws: {
	                get: function get_totalPoints(){
	                    return this.numOfHomeDraws + this.numOfAwayDraws;
	                }
	            },
	
	            numOfLosses: {
	                get: function get_totalPoints(){
	                    return this.numOfHomeLosses + this.numOfAwayLosses;
	                }
	            },
	
	            totalGoalsScored: {
	                get: function get_totalPoints(){
	                    return this.goalsScoredHome + this.goalsScoredAway;
	                }
	            },
	
	            totalGoalsConceded: {
	                get: function get_totalPoints(){
	                    return this.goalsConcededHome + this.goalsConcededAway;
	                }
	            }
	        });
	
	        // endregion
	
	        return Team;
	    }
	
	    // region CommonJS
	
	    module.exports = {
	        name: 'Team',
	        ctor: [Team]
	    };
	
	    // endregion
	
	})();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* Game model
	*/
	(function(){
	    'use strict';
	
	    function Game(){
	
	        // region Inner Methods
	
	        // endregion
	
	        // region Ctor
	
	        function Game(values){
	            this.date = values.date;
	            this.homeTeamId = values.homeTeamId;
	            this.awayTeamId = values.awayTeamId;
	            this.homeGoals = values.homeGoals;
	            this.awayGoals = values.awayGoals;
	        }
	
	        Game.prototype = (function(){
	
	            // region Public Api
	
	            var publicAPI = {
	                constructor: Game
	            };
	
	            // endregion
	
	            return publicAPI;
	
	        })();
	
	        // endregion
	
	        return Game;
	    }
	
	    // region CommonJS
	
	    module.exports = {
	        name: 'Game',
	        ctor: [Game]
	    };
	
	    // endregion
	
	})();

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Tab container directive
	 */
	 (function(){
	    'use strict';
	
	    function tabContainerDirective(){
	
	        function tabContainerCtrl(){
	            // region Inner Fields
	
	            var _tabItems = [],
	                _prevTabScope = {};
	
	            // endregion
	
	            // region Viewmodel
	
	            this.tabs = [];
	
	            this.selectTab = function selectTab(index){
	                this.showTab(index);
	                this.selectedIndex = index;
	            };
	
	            this.addTabItem = function addTabItem(header, scope){
	                _tabItems.push({
	                    header: header,
	                    scope: scope
	                });
	
	                this.tabs.push(header);
	
	                this.showTab(0);
	                this.selectedIndex = 0;
	            };
	
	            this.showTab = function showTab(index){
	                var scope  = _tabItems[index].scope;
	
	                _prevTabScope.shouldDisplay = false;
	                scope.shouldDisplay = true;
	
	                _prevTabScope = scope;
	
	            };
	
	            // endregion
	        }
	
	        return {
	            restrict: 'AE',
	            templateUrl: '/public/app/components/tabs/tabContainer.html',
	            transclude: true,
	            scope: { },
	            controller: [tabContainerCtrl],
	            controllerAs: 'vm',
	            bindToController: true
	        };
	    }
	
	    // region CommonJS
	
	    module.exports = {
	        name: 'tabContainer',
	        directive: [tabContainerDirective]
	    };
	
	    // endregion
	
	 })();

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Tab item 
	 */
	 (function(){
	    'use strict';
	    
	    function tabItemDirective($parse){
	
	        function link(scope, element, attrs, ctrl, transcludeFn){
	            scope.shouldDisplay = false;
	
	            ctrl.addTabItem(scope.header, scope);
	
	            transcludeFn(function(clone, transcudedScope){
	                if(scope.unsafeHtml){
	                    scope.contentPromise.then(function(){
	                        element.find('div').html($parse(scope.unsafeHtml)(transcudedScope));
	                    });
	                }
	            });
	        }
	
	        return {
	            restrict: 'AE',
	            require: '^tabContainer',
	            transclude: true,
	            template: '<div class="tab-item" ng-transclude ng-show="shouldDisplay"></div>',
	            scope: {
	                header: '@',
	                unsafeHtml: '@?',
	                contentPromise: '='
	            },
	            link: link
	        };
	    }
	    
	    // region CommonJS
	    
	    module.exports = {
	        name: 'tabItem',
	        directive: [
	            '$parse',
	            tabItemDirective
	        ]
	    };
	    
	    // endregion
	    
	 })();

/***/ }
/******/ ])
//# sourceMappingURL=app.js.map
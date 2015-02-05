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
	        directives = __webpack_require__(8);
	
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
	
	    services.concat(constants).forEach(function(service){
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
	                    teamsResolved: ['API_ENDPOINT', 'dataService', function(API_ENDPOINT, dataService){
	                        return dataService.get(API_ENDPOINT + 'teams');
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
	    __webpack_require__(9)
	];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Loads all the services of the app
	 */
	module.exports = [
	    __webpack_require__(10),
	    __webpack_require__(11),
	    __webpack_require__(12)
	];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Loads all the models of the app
	 */
	module.exports = [
	    __webpack_require__(13),
	    __webpack_require__(14)
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
	 * Loads all the directives
	 */
	module.exports = [
	];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Home ctrl
	 */
	(function(){
	    'use strict';
	
	    function HomeCtrl(gamesLoader, teamsResolved, Team){
	
	        // region Setup
	
	        gamesLoader.init(on_msg, on_error);
	
	        // endregion
	
	        // region Inner Fields
	
	        var teams = teamsResolved.map(function(team){ return new Team(team.id, team.name) });
	
	        // endregion
	
	        // region Viewmodel
	
	        // endregion
	
	        // region Events
	
	        function on_msg(msg){
	            console.info(msg);
	        }
	
	        function on_error(error){
	            console.error(error);
	        }
	
	        // endregion
	    }
	
	    // region CommonJS
	
	    module.exports = {
	        name: 'homeCtrl',
	        ctrl: ['gamesLoaderService', 'teamsResolved', 'Team', HomeCtrl]
	    };
	    
	    // endregion
	
	})();


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A Web Socket Client
	 */
	(function(){
	    'use strict';
	
	    function WebSocketClientService(){
	
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
	        name: 'WebSocketClientService',
	        type: 'factory',
	        service: [WebSocketClientService]
	    };
	
	    // endregion
	
	})();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Loads the game result through a websocket
	 */
	(function(){
	    'use strict';
	    
	    function gamesLoaderService(WebSocketClientService){
	        // region Consts
	
	        var WS_URL = '127.0.0.1:8080/games';
	
	        // endregion
	
	        // region Inner Methods
	
	        function init(on_msg, on_error){
	            var webSocketClientService = new WebSocketClientService();
	
	            webSocketClientService.init(WS_URL, on_msg, on_error);
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
	        service: ['WebSocketClientService', gamesLoaderService]
	    };
	    
	    // endregion
	
	})();

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* Team model
	*/
	(function(){
	    'use strict';
	
	    function Team(){
	
	        // region Inner Methods
	
	        // endregion
	
	        // region Ctor
	
	        function Team(id, name){
	            if(!id)throw new Error('Please give an id for this team');
	            if(!name)throw new Error('Please give a name for this team');
	
	            this.id = id;
	            this.name = name;
	        }
	
	        Team.prototype = (function(){
	
	            // region Public Api
	
	            var publicAPI = {
	                constructor: Team
	            };
	
	            // endregion
	
	            return publicAPI;
	
	        })();
	
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
/* 14 */
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

/***/ }
/******/ ])
//# sourceMappingURL=app.js.map
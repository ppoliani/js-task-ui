(function(){
    'use strict';

    // region Deps

    var
        angular = require('angular'),
        routes = require('../config/routes'),
        routeCallbacks = require('../config/routeCallbacks'),
        controllers = require('./controllers'),
        services = require('./services'),
        models = require('./models'),
        constants = require('./constants'),
        directives = require('./directives');

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
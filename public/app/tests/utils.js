
var moduleName = 'app.core',
    SERVICE_ENDPOINT = 'http://localhost:8080',
    app = require('../core/app');


function getPath(endpoint){
    return SERVICE_ENDPOINT + endpoint;
}

function resolvePromise($q, resolveData) {
    var deferred = $q.defer();
    deferred.resolve(resolveData);
    return deferred.promise;
}

function rejectPromise($q){
    var deferred = $q.defer();
    deferred.reject('Remote call error');
    return deferred.promise;
}

module.exports = {
    moduleName: moduleName,
    getPath: getPath,
    resolvePromise: resolvePromise,
    rejectPromise: rejectPromise
};
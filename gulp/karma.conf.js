// Karma configuration
// Generated on Mon Jul 07 2014 19:04:34 GMT+0100 (Θερινή ώρα Γκρίνουιτς)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../public/',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon-chai'],


        // list of files / patterns to load in the browser
        files: [
            'third-party/angular/angular.js',
            'third-party/angular-route/angular-route.min.js',
            'third-party/angular-mocks/angular-mocks.js',
            'app/tests/**/*specs.js'
            //'app/components/**/*.html'
        ],


        // list of files to exclude
        exclude: [

        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'tests/**/*specs.js': ['webpack'],
            'app/components/**/*.html': ['ng-html2js']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        webpack: {
            cache: true,
            // webpack configuration
            externals: {
                'angular': 'angular'
            }
        },

        webpackServer: {
            stats: {
                colors: true
            }
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            //stripPrefix: '/js/',
            //
            //// prepend this to the
            //prependPrefix: 'served/',

            //// or define a custom transform function
            cacheIdFromPath: function(filepath) {
                console.log('/app/' + filepath);
                return '/app/' + filepath;
            },

            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'app.core'
        },

        plugins: [
            require('karma-mocha'),
            require('karma-sinon-chai'),
            require('karma-chrome-launcher'),
            require('karma-webpack'),
            require('karma-ng-html2js-preprocessor')
        ]
    });
};

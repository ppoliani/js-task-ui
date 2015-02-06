
var distDir = './public/dist',
    libsDir ='./public/third-party',
    jsDir = './public/app',
    cssDir = './public/assets/css',
    appDir = './public/app',
    testDir = './public/app/tests/**/*.*';

var
    bundles = {
        js: {
            vendor: [
                libsDir + '/angular/angular.js',
                libsDir + '/angular-route/angular-route.js',
                libsDir + '/react/react.js',
                libsDir + '/ngReact/ngReact.js'
            ],

            app: [
                appDir + '/app.js'
            ]
        },

        css: {
            vendor: [
            ],

            app: [
                distDir + '/sass/app.css'
            ]
        }
    };

bundles.sass = cssDir + '/app/*.scss';

bundles.testScripts = [
    libsDir + '/angular/angular.min.js',
    libsDir + '/angular-route/angular-route.min.js'
].concat(bundles.js);


var banner = '/*!\n' +
    ' * <%= pkg.name %>\n' +
    ' * <%= pkg.title %>\n' +
    ' * <%= pkg.url %>\n' +
    ' * @author <%= pkg.author %>\n' +
    ' * @version <%= pkg.version %>\n' +
    ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
    ' */\n';

module.exports = {
    bundles: bundles,
    banner: banner,
    distDir: distDir,
    libsDir: libsDir,
    jsDir: jsDir,
    cssDir: cssDir,
    appDir: appDir,
    testDir: testDir
};
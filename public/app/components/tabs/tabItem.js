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
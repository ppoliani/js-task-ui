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
            templateUrl: '/js/app/components/tabs/tabContainer.html',
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
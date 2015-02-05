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
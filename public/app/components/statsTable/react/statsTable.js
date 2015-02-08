/** @jsx React.DOM */

window.ReactTeamForm = React.createClass({displayName: "ReactTeamForm",

	render: function render_teamForm(){
		var team = this.props.team,

			form = team.getFormForLastNGames(5).map(function(form){
				var formClassNames = React.addons.classSet({
                    'stats-table__team-form': true,
					'stats-table__team-form--win': form.value === 'W',
					'stats-table__team-form--draw': form.value === 'D',
					'stats-table__team-form--loss': form.value === 'L'
				});

				return (
					React.createElement("span", {className: formClassNames},  form.value)
				);
			});

		return (
            React.createElement("div", {className: "grid__cell grid__cell--team-form"}, 
                React.createElement("div", {className: "grid__data"}, 
                	form 
                )
            )
		);
	}

});


window.ReactTeamStat = React.createClass({displayName: "ReactTeamStat",

	render: function render_teamsStats(){
		var team = this.props.team,
			type = this.props.type,
			index = this.props.index;

		function getNumOfGames(){
            return team['numOf' + type + 'Games'];
        }

        function getNumOfWins(){
            return team['numOf' + type + 'Wins'];
        }

        function getNumOfDraws(){
            return team['numOf' + type + 'Draws'];
        }

        function getNumOfLosses(){
            return team['numOf' + type + 'Losses'];
        }

        function getNumOfGoalsScored(){
            return team['goalsScored' + type];
        }

        function getNumOfGoalsConceded(){
            return team['goalsConceded' + type];
        }

        function getPoints(){
            return team[(type.toLowerCase()) + 'Points'];
        }

		return (
			React.createElement("li", {className: "stats-table__stats-row grid__row"}, 
	            React.createElement("div", {className: "grid__cell"}, 
	                React.createElement("div", {className: "grid__data"}, index )
	            ), 
	            React.createElement("div", {className: "grid__cell "}, 
	                React.createElement("div", {className: "grid__data"},  team.name)
	            ), 
	            React.createElement("div", {className: "grid__cell "}, 
	                React.createElement("div", {className: "grid__data"},  getNumOfGames() )
	            ), 
	            React.createElement("div", {className: "grid__cell "}, 
	                React.createElement("div", {className: "grid__data"},  getNumOfWins() )
	            ), 
	            React.createElement("div", {className: "grid__cell "}, 
	                React.createElement("div", {className: "grid__data"},  getNumOfDraws() )
	            ), 
	            React.createElement("div", {className: "grid__cell "}, 
	                React.createElement("div", {className: "grid__data"},  getNumOfLosses() )
	            ), 
	            React.createElement("div", {className: "grid__cell "}, 
	                React.createElement("div", {className: "grid__data"},  getNumOfGoalsScored(), ":",  getNumOfGoalsConceded() )
	            ), 
	            React.createElement("div", {className: "grid__cell "}, 
	                React.createElement("div", {className: "grid__data"},  getPoints() )
	            ), 

	            React.createElement(ReactTeamForm, {team: team })
	        )
		);
	}

});



window.ReactStatsTable = React.createClass({displayName: "ReactStatsTable",

	render: function render_statsTable(){
		var teams = this.props.teams,
			type = this.props.type,

			rows = teams.map(function(team, index){
				return (
					React.createElement(ReactTeamStat, {team: team, type: type, index:  index + 1})
				);
			});

		return (
			React.createElement("section", {className: "stats-table grid__wrapper"}, 
				React.createElement("ul", {className: "grid__table"}, 
			        React.createElement("li", {className: "stats-table__header-row grid__row"}, 
			            React.createElement("div", {className: "grid__header"}, 
			                React.createElement("div", {className: "grid__data grid__data--sortable"}, 
                                "#", 
			                    React.createElement("a", {"ng-click": "sort('')", className: "grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"})
			                )
			            ), 

			            React.createElement("div", {className: "grid__header  grid__header--team-data"}, 
			                React.createElement("div", {className: "grid__data grid__data--sortable grid__header--table"}, 
			                    "Team", 
			                    React.createElement("a", {"ng-click": "sort('')", className: "grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"})
			                )
			            ), 

			            React.createElement("div", {className: "grid__header"}, 
			                React.createElement("div", {className: "grid__data grid__data--sortable"}, 
			                    "MP", 
			                    React.createElement("a", {"ng-click": "sort('')", className: "grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"})
			                )
			            ), 

			            React.createElement("div", {className: "grid__header"}, 
			                React.createElement("div", {className: "grid__data grid__data--sortable"}, 
			                    "W", 
			                    React.createElement("a", {"ng-click": "sort('')", className: "grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"})
			                )
			            ), 
			            React.createElement("div", {className: "grid__header"}, 
			                React.createElement("div", {className: "grid__data grid__data--sortable"}, 
			                    "D", 
			                    React.createElement("a", {"ng-click": "sort('')", className: "grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"})
			                )
			            ), 

			            React.createElement("div", {className: "grid__header"}, 
			                React.createElement("div", {className: "grid__data grid__data--sortable"}, 
			                    "L", 
			                    React.createElement("a", {"ng-click": "sort('')", className: "grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"})
			                )
			            ), 

			            React.createElement("div", {className: "grid__header"}, 
			                React.createElement("div", {className: "grid__data grid__data--sortable"}, 
			                    "G", 
			                    React.createElement("a", {"ng-click": "sort('')", className: "grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"})
			                )
			            ), 

			            React.createElement("div", {className: "grid__header"}, 
			                React.createElement("div", {className: "grid__data grid__data--sortable"}, 
			                    "Pts", 
			                    React.createElement("a", {"ng-click": "sort('')", className: "grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"})
			                )
			            ), 
			            React.createElement("div", {className: "grid__header"}, 
			                React.createElement("div", {className: "grid__data grid__data--sortable"}, 
			                    "Form", 
			                    React.createElement("a", {"ng-click": "sort('')", className: "grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"})
			                )
			            )
			        ), 

			        rows 

				)
			)
		);
	}
});
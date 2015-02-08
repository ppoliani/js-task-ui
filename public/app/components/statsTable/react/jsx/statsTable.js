/** @jsx React.DOM */

window.ReactTeamForm = React.createClass({

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
					<span className={formClassNames}>{ form.value }</span>
				);
			});

		return (
            <div className="grid__cell grid__cell--team-form">
                <div className="grid__data">
                	{ form }
                </div>
            </div>
		);
	}

});


window.ReactTeamStat = React.createClass({

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
			<li className="stats-table__stats-row grid__row">
	            <div className="grid__cell">
	                <div className="grid__data">{ index }</div>
	            </div>
	            <div className="grid__cell ">
	                <div className="grid__data">{ team.name }</div>
	            </div>
	            <div className="grid__cell ">
	                <div className="grid__data">{ getNumOfGames() }</div>
	            </div>
	            <div className="grid__cell ">
	                <div className="grid__data">{ getNumOfWins() }</div>
	            </div>
	            <div className="grid__cell ">
	                <div className="grid__data">{ getNumOfDraws() }</div>
	            </div>
	            <div className="grid__cell ">
	                <div className="grid__data">{ getNumOfLosses() }</div>
	            </div>
	            <div className="grid__cell ">
	                <div className="grid__data">{ getNumOfGoalsScored() }:{ getNumOfGoalsConceded() }</div>
	            </div>
	            <div className="grid__cell ">
	                <div className="grid__data">{ getPoints() }</div>
	            </div>

	            <ReactTeamForm team={ team } />
	        </li>
		);
	}

});



window.ReactStatsTable = React.createClass({

	render: function render_statsTable(){
		var teams = this.props.teams,
			type = this.props.type,

			rows = teams.map(function(team, index){
				return (
					<ReactTeamStat team={ team } type={ type } index={ index + 1 } />
				);
			});

		return (
			<section className="stats-table grid__wrapper">
				<ul className="grid__table">
			        <li className="stats-table__header-row grid__row">
			            <div className="grid__header">
			                <div className="grid__data grid__data--sortable">
                                &#35;
			                    <a ng-click="sort('')" className="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div className="grid__header  grid__header--team-data">
			                <div className="grid__data grid__data--sortable grid__header--table">
			                    Team
			                    <a ng-click="sort('')" className="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div className="grid__header">
			                <div className="grid__data grid__data--sortable">
			                    MP
			                    <a ng-click="sort('')" className="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div className="grid__header">
			                <div className="grid__data grid__data--sortable">
			                    W
			                    <a ng-click="sort('')" className="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>
			            <div className="grid__header">
			                <div className="grid__data grid__data--sortable">
			                    D
			                    <a ng-click="sort('')" className="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div className="grid__header">
			                <div className="grid__data grid__data--sortable">
			                    L
			                    <a ng-click="sort('')" className="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div className="grid__header">
			                <div className="grid__data grid__data--sortable">
			                    G
			                    <a ng-click="sort('')" className="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div className="grid__header">
			                <div className="grid__data grid__data--sortable">
			                    Pts
			                    <a ng-click="sort('')" className="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>
			            <div className="grid__header">
			                <div className="grid__data grid__data--sortable">
			                    Form
			                    <a ng-click="sort('')" className="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>
			        </li>

			        { rows }

				</ul>
			</section>
		);
	}
});
/** @jsx React.DOM */

window.ReactTeamForm = React.createClass({

	render: function render_teamForm(){
		var team = this.props.team,

			form = team.getFormForLastNGames(5).map(function(form){
				var formClassNames = classSet({
					'stats-table__team-form--win': form.value === 'W',
					'stats-table__team-form--draw': form.value === 'D',
					'stats-table__team-form--loss': fomrm.value === 'L'
				});

				return (
					<span class="stats-table__team-form" className={formClassNames}>{ form.value }</span>
				);
			});

		return (
            <div class="grid__cell grid__cell--team-form">
                <div class="grid__data">
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
			<li class="stats-table__stats-row grid__row" ng-repeat="team in vm.teams track by team.id">
	            <div class="grid__cell">
	                <div class="grid__data">{ index }</div>
	            </div>
	            <div class="grid__cell ">
	                <div class="grid__data">{ team.name }</div>
	            </div>
	            <div class="grid__cell ">
	                <div class="grid__data">{ getNumOfGames() }</div>
	            </div>
	            <div class="grid__cell ">
	                <div class="grid__data">{ getNumOfWins() }</div>
	            </div>
	            <div class="grid__cell ">
	                <div class="grid__data">{ getNumOfDraws() }</div>
	            </div>
	            <div class="grid__cell ">
	                <div class="grid__data">{ getNumOfLosses() }</div>
	            </div>
	            <div class="grid__cell ">
	                <div class="grid__data">{ getNumOfGoalsScored() }:{ getNumOfGoalsConceded() }</div>
	            </div>
	            <div class="grid__cell ">
	                <div class="grid__data">{ getPoints() }</div>
	            </div>

	            <ReactTeamForm team={ team } />
	        </li>
		);
	}

});



window.ReactStatsTable = React.createClass({

	render: function render_statsTable(){
		var teams = this.props.teams,
			type = this.props.type;

			rows = teams.map(function(team, index){
				return (
					<ReactTeamStat team={ team } type={ type } index={ index } />
				);
			});

		return (
			<section class="stats-table grid__wrapper">
				<ul class="grid__table">
			        <li class="stats-table__header-row grid__row">
			            <div class="grid__header">
			                <div class="grid__data grid__data--sortable">
			                    #
			                    <a ng-click="sort('')" class="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div class="grid__header  grid__header--team-data">
			                <div class="grid__data grid__data--sortable grid__header--table">
			                    Team
			                    <a ng-click="sort('')" class="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div class="grid__header">
			                <div class="grid__data grid__data--sortable">
			                    MP
			                    <a ng-click="sort('')" class="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div class="grid__header">
			                <div class="grid__data grid__data--sortable">
			                    W
			                    <a ng-click="sort('')" class="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>
			            <div class="grid__header">
			                <div class="grid__data grid__data--sortable">
			                    D
			                    <a ng-click="sort('')" class="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div class="grid__header">
			                <div class="grid__data grid__data--sortable">
			                    L
			                    <a ng-click="sort('')" class="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div class="grid__header">
			                <div class="grid__data grid__data--sortable">
			                    G
			                    <a ng-click="sort('')" class="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>

			            <div class="grid__header">
			                <div class="grid__data grid__data--sortable">
			                    Pts
			                    <a ng-click="sort('')" class="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>
			            <div class="grid__header">
			                <div class="grid__data grid__data--sortable">
			                    Form
			                    <a ng-click="sort('')" class="grid__sort {{isSortBy('') ? (isSortAsc() ? 'grid__sort--asc' : 'grid__sort--desc') : '' }}"></a>
			                </div>
			            </div>
			        </li>

			        { rows }

				</ul>
			</section>
		);
	}
});
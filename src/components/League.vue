<template>
<div class="container">
  <h3>{{league.name}}</h3>
  <div class="row">

    <div class="col-md-6">
      <div class="panel panel-default">
        <div class="panel-heading">Table</div>
        <div class="panel-body">

          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>#</th>
                <th></th>
                <th></th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>+/-</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(team, index) in sortedTeamsByPoint">
                <td><input type="checkbox" name="selectedTeams" :value="team.id" v-model="selectedTeams"></td>
                <td>{{index+1}}</td>
                <td><span class="label" v-bind:class="{'label-success': team.hasBetterPosition(index+1), 'label-danger': team.hasWorsePosition(index+1) }">{{team.startPosition-(index+1)}}</span></td>
                <td><a>{{team.name}}</a></td>
                <td>{{team.wins}}</td>
                <td>{{team.draws}}</td>
                <td>{{team.defeats}}</td>
                <td>{{team.scoreDiff}}</td>
                <td>{{team.points}}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>

    <div class="col-md-6">
      <FixtureList :fixtures="visibleFixtures" title="Selected teams fixtures" no-fixtures-text="Select a team to show fixtures"></FixtureList>
      <FixtureList :fixtures="changedFixtures" v-show="changedFixtures.length > 0" title="Changed fixtures" no-fixtures-text="No changed matches"></FixtureList>
    </div>

  </div>
</div>
</template>

<script>

import League from '@/League';
import FixtureList from '@/Components/FixtureList';

export default {
  name: 'league',
  components: {FixtureList},
  created () {
    var leagueId = this.$route.params.name;
    var shuffleId = this.$route.query.shuffle;

    Promise.all([
      import('@/data/' + leagueId + '/fixtures.json'),
      import('@/data/' + leagueId + '/league.json')
    ])
    .then(([fixtures, leagueData]) => {
      var league = new League(leagueData.name, leagueId);
      var leagueDataTeams = leagueData.teams;
      for(var i = 0; i < leagueDataTeams.length; i++)
        league.addTeam(leagueDataTeams[i].name, leagueDataTeams[i].id);

      for(i = 0; i < fixtures.length; i++)
        league.addFixture(fixtures[i]);

      league.setStartPositionOfTeams();

      this.league = league;

      if(shuffleId) {
        console.log('Has shuffle id');
        Promise.all([
          import('@/data/shuffles/' + shuffleId + '.json')
        ])
        .then(([shuffleData]) => {
          league.shuffle(shuffleData);
        });
      }
    });
  },
  data () {
    return {
      selectedTeams: [],
      league: { teams: [], fixtures: [] }
    };
  },
  computed: {
    changedFixtures () {
      return this.league.fixtures.filter((fixture) => {
        return fixture.changed;
      });
    },
    visibleFixtures () {
      return this.league.fixtures.filter((fixture) => {
        return fixture.teamsPlaying(this.selectedTeams);
      });
    },
    sortedTeamsByPoint () {
      return this.league.teams.slice(0).sort((a, b) => { return b.sortValue() - a.sortValue(); });
    }
  }
};
</script>


<<style scoped>
.btn-xs .glyphicon {
  font-size: 8px;
}
</style>
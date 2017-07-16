export default class Fixture {
  constructor (home, away, date, scores) {
    this.date = date;
    this.home = home;
    this.away = away;

    if(scores) {
      this.homeScore = scores[0];
      this.awayScore = scores[1];
      this.originalHomeScore = this.homeScore;
      this.originalAwayScore = this.awayScore;
    } else {
      this.homeScore = '';
      this.awayScore = '';
    }

    this.changed = false;
    this.visible = false;
    this.state = {
      awayScore: 0,
      homeScore: 0,
      result: ''
    };
  };

  setScore (home, away) {
    this.homeScore = home;
    this.awayScore = away;
    this.calculateScore();
  };

  incrementScoreByTeam (team, scoreSteps) {
    var score = 1;
    if(scoreSteps !== undefined)
      score = scoreSteps;

    var teamId = team;
    if(team.id)
      teamId = team.id;

    if(this.home.id === teamId)
      this.homeScore += score;
    else if(this.away.id === teamId)
      this.awayScore += score;

    this.calculateScore();
  };

  incrementScore (homeTeam) {
    if(homeTeam)
      this.homeScore++;
    else
      this.awayScore++;

    this.calculateScore();
  };

  teamsPlaying (teams) {
    for(var i = 0; i < teams.length; i++) {
      var hit = this.teamPlaying(teams[i]);
      if(hit) return true;
    }
    return false;
  };

  teamPlaying (team) {
    var teamId = team;
    if(team.id)
      teamId = team.id;

    return teamId === this.home.id || teamId === this.away.id;
  };

  calculateScore () {
    this.changed = true;
    this.calculate();
  };

  reset () {
    if(this.originalHomeScore >= 0 && this.originalAwayScore >= 0) {
      this.changed = false;
      this.homeScore = this.originalHomeScore;
      this.awayScore = this.originalAwayScore;
      this.calculate();
    }
  };

  calculate () {
    if(this.homeScore == null && this.awayScore == null)
      return;

    // Reset before calculating again
    if(this.state.result === 1) {
      this.home.wins--;
      this.away.defeats--;
    } else if(this.state.result === 2) {
      this.home.defeats--;
      this.away.wins--;
    } else if(this.state.result === 'X') {
      this.home.draws--;
      this.away.draws--;
    }

    if(!this.homeScore)
      this.homeScore = 0;

    if(!this.awayScore)
      this.awayScore = 0;

    this.home.calculateScoreDiff(-(this.state.homeScore - this.state.awayScore));
    this.away.calculateScoreDiff(-(this.state.awayScore - this.state.homeScore));

    // Recalculate with new score
    if(this.homeScore > this.awayScore) {
      this.home.wins++;
      this.away.defeats++;
      this.state.result = 1;
      this.state.homeScore = this.homeScore;
    } else if(this.homeScore < this.awayScore) {
      this.home.defeats++;
      this.away.wins++;
      this.state.result = 2;
    } else {
      this.home.draws++;
      this.away.draws++;
      this.state.result = 'X';
    }

    this.state.homeScore = this.homeScore;
    this.state.awayScore = this.awayScore;

    this.home.calculateScoreDiff(this.homeScore - this.awayScore);
    this.away.calculateScoreDiff(this.awayScore - this.homeScore);

    this.home.calculatePoints();
    this.away.calculatePoints();
  };

  isPlayedBetween (start, end) {
    if(!start) {
      console.log('no start');
      return;
    }

    return this.date.between(start, end);
  };
};

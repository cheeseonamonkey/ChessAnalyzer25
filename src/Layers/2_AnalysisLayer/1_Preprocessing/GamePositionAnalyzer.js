// GamePositionAnalyzer.js
const Chess = require("chess.js").Chess;
const { evaluateAggregate } = require('../EvaluationEngine');
const cliProgress = require('cli-progress')

function evaluateGamePositions(game) {

  const moves = game.history({ verbose: true });

  const scoreVector_aggregate = [];

  moves.forEach(m => {
    scoreVector_aggregate.push(evaluateAggregate(m.after));
  });

  game.metrics.scoreVector_aggregate = scoreVector_aggregate.map(it => it.aggregate.balance)
  game.metrics.scoreVector_material = scoreVector_aggregate.map(it => it.material.balance)
  game.metrics.scoreVector_position = scoreVector_aggregate.map(it => it.positional.balance)
  

  game.metrics.centipawnLossVector = []

  game.metrics.scoreVector_aggregate.forEach( (metricValue, i) => {
    if(i<1)

    centipawnLossVector.push()
  });
  
  



  



}


module.exports = {
  evaluateGamePositions
}
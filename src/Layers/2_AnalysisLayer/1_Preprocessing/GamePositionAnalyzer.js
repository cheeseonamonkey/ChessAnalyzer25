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
  
  const whiteLosses = [];
  const blackLosses = [];
  
  game.metrics.scoreVector_aggregate.forEach((score, i) => {
    if (i === 0) return;
    
    const prevScore = game.metrics.scoreVector_aggregate[i - 1];
    const isWhiteMove = i % 2 === 1; // index 0=white, 1=black, 2=white...
    
    if (isWhiteMove) {
      whiteLosses.push(Math.max(0, prevScore - score));
    } else {
      blackLosses.push(Math.max(0, score - prevScore));
    }
  });
  
  game.metrics.centipawnLoss = { white: whiteLosses, black: blackLosses };
}

module.exports = {
  evaluateGamePositions
}
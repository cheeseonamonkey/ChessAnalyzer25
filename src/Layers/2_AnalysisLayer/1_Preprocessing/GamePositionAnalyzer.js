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
  
  const whiteLoss = [];
  const blackLoss = [];
  
  game.metrics.scoreVector_aggregate.forEach((score, i) => {
    if (i === 0) return;
    
    const prevScore = game.metrics.scoreVector_aggregate[i - 1];
    const isWhiteMove = i % 2 === 1; // odd indices are white moves (after move 1, 3, 5...)
    
    if (isWhiteMove) {
      whiteLoss.push(Math.max(0, prevScore - score));
    } else {
      blackLoss.push(Math.max(0, score - prevScore));
    }
  });
  
  game.metrics.centipawnLoss = { white: whiteLoss, black: blackLoss };
}

module.exports = {
  evaluateGamePositions
}
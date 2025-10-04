// GamePositionAnalyzer.js
const Chess = require("chess.js").Chess;
const { evaluateAggregate } = require('../EvaluationEngine');
const cliProgress = require('cli-progress');
const { calculateClosedness, calculateOpenness } = require("./PositionMetrics");

const evaluatePosition = (fen) => evaluateAggregate(fen);

const calculateCentipawnLoss = (prevScore, currScore, isWhiteMove) => {
  return isWhiteMove 
    ? Math.max(0, prevScore - currScore)
    : Math.max(0, currScore - prevScore);
};

function initOpennessAndClosedness(game) {
  const moves = game.history({ verbose: true }).map(m => m.after);

  let openness = []
  let closedness = []

  moves.forEach(m=> {
    openness.push(calculateOpenness(m))
    closedness.push(calculateClosedness(m))
  })
  game.metrics.opennessVector = openness
  game.metrics.closednessVector = closedness
}

function evaluateGamePositions(game) {

  initOpennessAndClosedness(game)


  const moves = game.history({ verbose: true });
  const scoreVector_aggregate = moves.map(m => evaluatePosition(m.after));
  
  game.metrics.scoreVector_aggregate = scoreVector_aggregate.map(it => it.aggregate.balance);
  game.metrics.scoreVector_material = scoreVector_aggregate.map(it => it.material.balance);
  game.metrics.scoreVector_position = scoreVector_aggregate.map(it => it.positional.balance);
  
  const whiteLosses = [];
  const blackLosses = [];
  
  game.metrics.scoreVector_aggregate.forEach((score, i) => {
    if (i === 0) return;
    
    const prevScore = game.metrics.scoreVector_aggregate[i - 1];
    const isWhiteMove = i % 2 === 1;
    const loss = calculateCentipawnLoss(prevScore, score, isWhiteMove);
    
    (isWhiteMove ? whiteLosses : blackLosses).push(loss);
  });
  
  game.metrics.White.centipawnLossVector = whiteLosses;
  game.metrics.Black.centipawnLossVector = blackLosses;
  game.metrics.White.avgCentipawnLoss = whiteLosses.reduce((sum, loss) => sum + loss, 0) / whiteLosses.length || 0;
  game.metrics.Black.avgCentipawnLoss = blackLosses.reduce((sum, loss) => sum + loss, 0) / blackLosses.length || 0;
}

module.exports = {
  evaluateGamePositions,
  evaluatePosition,
  calculateCentipawnLoss
}
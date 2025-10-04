// PositionMetrics.js
// Single position analysis utilities

const { evaluateAggregate } = require('../EvaluationEngine');
const Chess = require("chess.js").Chess;


const evaluatePosition = (fen) => {
  return evaluateAggregate(fen);
};

const calculateCentipawnLoss = (prevScore, currScore, isWhiteMove) => {
  if (isWhiteMove) {
    return Math.max(0, prevScore - currScore);
  } else {
    return Math.max(0, currScore - prevScore);
  }
};

module.exports = {
  evaluatePosition,
  calculateCentipawnLoss
};
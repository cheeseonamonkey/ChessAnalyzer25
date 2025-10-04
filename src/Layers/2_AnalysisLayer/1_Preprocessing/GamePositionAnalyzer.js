// GamePositionAnalyzer.js

const Chess = require("chess.js").Chess;
const { evaluateAggregate } = require('../EvaluationEngine');

const analyzeAllPositions = (game) => {
  const positions = [];
  const moves = game.history();
  
  // Reset to starting position
  const temp = new Chess();
  temp.loadPgn(game.pgn());
  temp.reset();
  
  // Analyze initial position
  positions.push({
    moveNumber: 0,
    move: null,
    fen: temp.fen(),
    evaluation: evaluateAggregate(temp.fen())
  });
  
  // Replay and analyze each move
  moves.forEach((move, idx) => {
    temp.move(move);
    positions.push({
      moveNumber: Math.floor(idx / 2) + 1,
      move: move,
      fen: temp.fen(),
      evaluation: evaluateAggregate(temp.fen())
    });
  });
  
  return positions;
};

module.exports = { analyzeAllPositions };
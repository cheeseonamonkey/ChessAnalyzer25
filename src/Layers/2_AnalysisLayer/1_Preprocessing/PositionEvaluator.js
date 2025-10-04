// src/Layers/2_AnalysisLayer/1_Preprocessing/PositionEvaluator.js

const Chess = require("chess.js").Chess;
const { evaluateAggregate } = require("../EvaluationEngine");

const evaluateAllPositions = (games) => {
  console.log(`Evaluating positions for ${games.length} games...`);
  
  games.forEach((game, idx) => {
    if ((idx + 1) % 50 === 0 || idx === 0) {
      console.log(`  Progress: ${idx + 1}/${games.length} games`);
    }

    const pgn = game.pgn();
    const tempGame = new Chess();
    tempGame.loadPgn(pgn);
    
    const positions = [];
    const history = tempGame.history();
    
    // Reset and replay to capture all FENs
    tempGame.reset();
    positions.push({
      fen: tempGame.fen(),
      moveNumber: 0,
      ...evaluateAggregate(tempGame.fen())
    });
    
    history.forEach((move, i) => {
      tempGame.move(move);
      positions.push({
        fen: tempGame.fen(),
        moveNumber: Math.floor(i / 2) + 1,
        ...evaluateAggregate(tempGame.fen())
      });
    });
    
    game.metrics.positions = positions;
  });
  
  console.log(`  Completed: ${games.length}/${games.length} games`);
  return games;
};

module.exports = { evaluateAllPositions };
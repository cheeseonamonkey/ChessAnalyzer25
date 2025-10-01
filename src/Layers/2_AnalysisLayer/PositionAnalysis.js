// PositionAnalysis.js

const { evaluateAggregate } = require('./Engine/EvaluationEngine');

const analyzePosition = (fen, moveNumber, color) => {
  const eval = evaluateAggregate(fen);
  
  return {
    fen,
    moveNumber,
    color,
    material: eval.material,
    positional: eval.positional,
    score: eval.aggregate,
    // Add more metrics from DESIGN.md as needed:
    // - openness, development, mobility, etc.
  };
};

module.exports = { analyzePosition };
// PositionMetrics.js
// Single position analysis utilities

const Chess = require("chess.js").Chess;

function calculateOpenness(fen) {
  const chess = new Chess(fen);
  const board = chess.board();
  
  // Count open files (no pawns)
  let openFiles = 0;
  for (let file = 0; file < 8; file++) {
    if (!board.some(rank => rank[file]?.type === 'p')) openFiles++;
  }
  
  const mobility = chess.moves().length;
  const pawnCount = board.flat().filter(sq => sq?.type === 'p').length;
  
  // Openness: open files (40%) + mobility (30%) + fewer pawns (30%)
  return Math.round((openFiles / 8) * 40 + Math.min(mobility / 2, 30) + ((16 - pawnCount) / 16) * 30);
}

function calculateClosedness(fen) {
  const chess = new Chess(fen);
  const board = chess.board();
  
  const pawnCount = board.flat().filter(sq => sq?.type === 'p').length;
  
  // Count blocked pawns (facing opposing pawn directly ahead)
  let blockedPawns = 0;
  for (let rank = 0; rank < 7; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file];
      if (piece?.type === 'p') {
        const direction = piece.color === 'w' ? -1 : 1;
        const ahead = board[rank + direction]?.[file];
        if (ahead?.type === 'p') blockedPawns++;
      }
    }
  }
  
  const mobility = chess.moves().length;
  
  // Closedness: pawn density (40%) + blocked pawns (40%) + low mobility (20%)
  return Math.round((pawnCount / 16) * 40 + (blockedPawns / 16) * 40 + Math.max(20 - mobility / 2, 0));
}

module.exports = {
  
  calculateOpenness,
  calculateClosedness
};
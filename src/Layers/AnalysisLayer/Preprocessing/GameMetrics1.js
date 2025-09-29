// GameMetrics1.js



const getTurnCastled = (moveHistory, color) => {
  // moveHistory is the verbose history from chess.js: game.history({ verbose: true })
  for (let i = 0; i < moveHistory.length; i++) {
    const move = moveHistory[i]
    if (move.color === color[0] && (move.flags.includes('k') || move.flags.includes('q'))) {
      // Return the move number (1-indexed)
      // Each full turn has 2 moves (white and black), so divide by 2 and round up
      return Math.floor(i / 2) + 1
    }
  }
  return null // Never castled
};

const getCastleType = (moveHistory, color) => {
  // Find the castling move for the specified color
  for (let i = 0; i < moveHistory.length; i++) {
    const move = moveHistory[i]
    if (move.color === color[0]) {
      if (move.flags.includes('k')) {
        return 'Kingside' // O-O
      } else if (move.flags.includes('q')) {
        return 'Queenside' // O-O-O
      }
    }
  }
  return 'None' // Never castled
};


module.exports = {
  getTurnCastled,
  getCastleType
}
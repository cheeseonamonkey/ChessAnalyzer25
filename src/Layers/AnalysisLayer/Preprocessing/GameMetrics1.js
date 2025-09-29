// GameMetrics1.js


    

    //console.log(game.metrics)
    

const getTurnCastled = (game, color) => {
  const moveHistory = game.history()
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

const getCastleType = (game, color) => {
  const moveHistory = game.history()
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



const getWinner = (game) => {
  // game is a chess.js instance
  const headers = game.getHeaders();
  const result = headers.Result;
  
  if (result === '1-0') {
    return headers.White;
  } else if (result === '0-1') {
    return headers.Black;
  } else if (result === '1/2-1/2') {
    return 'Draw';
  } else {
    return 'Unknown';
  }
};


const getWinnerColor = (game) => {
  // game is a chess.js instance
  const headers = game.getHeaders();
  const result = headers.Result;
  
  if (result === '1-0') {
    return 'White';
  } else if (result === '0-1') {
    return 'Black';
  } else if (result === '1/2-1/2') {
    return 'Draw';
  } else {
    return 'Unknown';
  }
};



module.exports = {
  getTurnCastled,
  getCastleType,
  getWinner,
  getWinnerColor
}
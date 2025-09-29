// GameMetrics1.js

const getTurnCastled = (game, { color = null, user = null } = {}) => {
  const moveHistory = game.history({ verbose: true });
  const targetColor = color || (user === game.header().White ? 'w' : 'b');
  
  for (let i = 0; i < moveHistory.length; i++) {
    const move = moveHistory[i];
    if (move.color === targetColor[0] && (move.flags.includes('k') || move.flags.includes('q'))) {
      return Math.floor(i / 2) + 1;
    }
  }
  return null;
};

const getCastleType = (game, { color = null, user = null } = {}) => {
  const moveHistory = game.history({ verbose: true });
  const targetColor = color || (user === game.header().White ? 'w' : 'b');
  
  for (let i = 0; i < moveHistory.length; i++) {
    const move = moveHistory[i];
    if (move.color === targetColor[0]) {
      return move.flags.includes('k') ? 'Kingside' : move.flags.includes('q') ? 'Queenside' : null;
    }
  }
  return null;
};

const getWinnerColor = (game) => {
  const result = game.header().Result;
  return result === '1-0' ? 'White' : result === '0-1' ? 'Black' : result === '1/2-1/2' ? 'Draw' : 'Unknown';
};

const getWinner = (game) => {
  const winnerColor = getWinnerColor(game);
  const headers = game.header();
  return winnerColor === 'White' ? headers.White : winnerColor === 'Black' ? headers.Black : winnerColor;
};

module.exports = { getTurnCastled, getCastleType, getWinner, getWinnerColor };
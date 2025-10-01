// GameMetrics1.js

// everything here will be vs a specific player color 


// convert between player color vs username - helper 
const resolveColor = (game, { color = null, user = null }) => {
  if (color) return color[0].toLowerCase();
  if (user) return user === game.header().White ? 'w' : 'b';
  return null;
};


// get all moves made by one color (white or black) - helper
const getAllMovesByColor = (game, color) => {
  const targetColor = resolveColor(game, options);
  return game.history({ verbose: true }).filter(m => m.color === targetColor);
};

// did a color castle this game? - helper
const didCastle = (game, color)


// turn number a color castled (or null) in this game
const getTurnCastled = (game, color) => {
};
// type of castle (or null) a color did in this game (O-O-O vs O-O)
const getCastleType = (game, color) => {
};

// more:
// first turn a color moved their queen
getTurnQueenTapped(game, color)
// first turn a color got a capture
getFirstCaptureTurn(game, color)
// turn number a color put oppenent in check
getFirstCheck(game,color)

// you are here


/**
 * Build metrics and attach them to `game.metrics`.
 * @param {Object} game - single chess game data pipeline reference
 * @returns {void} void (modifies the `game.metrics` object in-place)
 */
function initGameMetrics1(game) {
  // objective: 
  game.metrics['WinnerColor'] = getWinnerColor(game);
  game.metrics['Winner'] = getWinner(game);

  // white:
  game.metrics['White']['CastleTurn'] = getTurnCastled(game, { color: 'white' });
  game.metrics['White']['CastleType'] = getCastleType(game, { color: 'white' });
  game.metrics['White']['FirstCaptureTurn'] = getFirstCaptureTurn(game, { color: 'white' });
  game.metrics['White']['HasCastled'] = hasCastled(game, { color: 'white' });

  // black:
  game.metrics['Black']['CastleTurn'] = getTurnCastled(game, { color: 'black' });
  game.metrics['Black']['CastleType'] = getCastleType(game, { color: 'black' });
  game.metrics['Black']['FirstCaptureTurn'] = getFirstCaptureTurn(game, { color: 'black' });
  game.metrics['Black']['HasCastled'] = hasCastled(game, { color: 'black' });
}

module.exports = {
  getTurnCastled,
  getCastleType,
  getMovesByColor: getAllMovesByColor,
  getMoveCount: (game, opts = {}) => getAllMovesByColor(game, opts).length,
  getCaptureCount: (game, opts = {}) => getCapturesByColor(game, opts).length,
  getCheckCount: (game, opts = {}) => getChecksByColor(game, opts).length,
  getPromotionCount: (game, opts = {}) => getPromotionsByColor(game, opts).length,

  initGameMetrics1,

  resolveColor,
  getAllMovesByColor
};
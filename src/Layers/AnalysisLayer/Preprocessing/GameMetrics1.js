// GameMetrics1.js
const resolveColor = (game, { color = null, user = null } = {}) => {
  if (color) return color[0].toLowerCase();
  if (user) return user === game.header().White ? 'w' : 'b';
  return null;
};

const getMovesByColor = (game, options = {}) => {
  const targetColor = resolveColor(game, options);
  return game.history({ verbose: true }).filter(m => m.color === targetColor);
};

const getTurnCastled = (game, options = {}) => {
  const moves = game.history({ verbose: true });
  const targetColor = resolveColor(game, options);
  const castleMove = moves.findIndex(m => m.color === targetColor && /[kq]/.test(m.flags));
  return castleMove === -1 ? null : Math.floor(castleMove / 2) + 1;
};

const getCastleType = (game, options = {}) => {
  const move = getMovesByColor(game, options).find(m => /[kq]/.test(m.flags));
  return move ? (move.flags.includes('k') ? 'Kingside' : 'Queenside') : null;
};

const getWinnerColor = (game) => {
  const r = game.header().Result;
  return r === '1-0' ? 'White' : r === '0-1' ? 'Black' : r === '1/2-1/2' ? 'Draw' : 'Unknown';
};

const getWinner = (game) => {
  const wc = getWinnerColor(game);
  const h = game.header();
  return wc === 'White' ? h.White : wc === 'Black' ? h.Black : wc;
};

const getCapturesByColor = (game, options = {}) => 
  getMovesByColor(game, options).filter(m => /[ce]/.test(m.flags));

const getChecksByColor = (game, options = {}) => 
  getMovesByColor(game, options).filter(m => m.san.includes('+'));

const getPromotionsByColor = (game, options = {}) => 
  getMovesByColor(game, options).filter(m => m.flags.includes('p'));

const getFirstCaptureTurn = (game, options = {}) => {
  const moves = game.history({ verbose: true });
  const targetColor = resolveColor(game, options);
  const captureIdx = moves.findIndex(m => m.color === targetColor && /[ce]/.test(m.flags));
  return captureIdx === -1 ? null : Math.floor(captureIdx / 2) + 1;
};

const hasCastled = (game, options = {}) => getTurnCastled(game, options) !== null;

module.exports = {
  getTurnCastled,
  getCastleType,
  getWinner,
  getWinnerColor,
  getMovesByColor,
  getMoveCount: (game, opts = {}) => getMovesByColor(game, opts).length,
  getCapturesByColor,
  getCaptureCount: (game, opts = {}) => getCapturesByColor(game, opts).length,
  getFirstCaptureTurn,
  getChecksByColor,
  getCheckCount: (game, opts = {}) => getChecksByColor(game, opts).length,
  getPromotionsByColor,
  getPromotionCount: (game, opts = {}) => getPromotionsByColor(game, opts).length,
  hasCastled
};
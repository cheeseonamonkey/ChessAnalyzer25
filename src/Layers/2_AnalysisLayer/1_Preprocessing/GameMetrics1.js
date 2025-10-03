// GameMetrics1.js
// Game-level metrics (2D) - computed per player color

// convert between player color vs username
const resolveColor = (game, { color = null, user = null } = {}) => {
  if (color) return color[0].toLowerCase();
  if (user) return user === game.header().White ? 'w' : 'b';
  return null;
};

// get all moves made by one color
const getMovesByColor = (game, { color = null, user = null } = {}) => {
  const c = resolveColor(game, { color, user });
  return game.history({ verbose: true }).filter(m => m.color === c);
};

// did a color castle this game?
const hasCastled = (game, { color = null, user = null } = {}) => {
  const moves = getMovesByColor(game, { color, user });
  return moves.some(m => m.flags.includes('k') || m.flags.includes('q'));
};

// turn number a color castled (or null)
const getTurnCastled = (game, { color = null, user = null } = {}) => {
  const moves = game.history({ verbose: true });
  const c = resolveColor(game, { color, user });
  const castleMove = moves.find(m => m.color === c && (m.flags.includes('k') || m.flags.includes('q')));
  return castleMove ? Math.floor(moves.indexOf(castleMove) / 2) + 1 : null;
};

// type of castle (O-O vs O-O-O) or null
const getCastleType = (game, { color = null, user = null } = {}) => {
  const moves = getMovesByColor(game, { color, user });
  const castleMove = moves.find(m => m.flags.includes('k') || m.flags.includes('q'));
  if (!castleMove) return null;
  return castleMove.flags.includes('k') ? 'O-O' : 'O-O-O';
};

// first turn a color moved their queen
const getTurnQueenTapped = (game, { color = null, user = null } = {}) => {
  const moves = game.history({ verbose: true });
  const c = resolveColor(game, { color, user });
  const queenMove = moves.find(m => m.color === c && m.piece === 'q');
  return queenMove ? Math.floor(moves.indexOf(queenMove) / 2) + 1 : null;
};

// first turn a color got a capture
const getFirstCaptureTurn = (game, { color = null, user = null } = {}) => {
  const moves = game.history({ verbose: true });
  const c = resolveColor(game, { color, user });
  const captureMove = moves.find(m => m.color === c && m.flags.includes('c'));
  return captureMove ? Math.floor(moves.indexOf(captureMove) / 2) + 1 : null;
};

// total captures by color
const getCapturesByColor = (game, { color = null, user = null } = {}) => {
  const moves = getMovesByColor(game, { color, user });
  return moves.filter(m => m.flags.includes('c') || m.flags.includes('e')).length;
};

// total moves by color
const getMoveCount = (game, { color = null, user = null } = {}) => {
  return getMovesByColor(game, { color, user }).length;
};

// first turn a color put opponent in check
const getFirstCheckTurn = (game, { color = null, user = null } = {}) => {
  const moves = game.history({ verbose: true });
  const c = resolveColor(game, { color, user });
  const checkMove = moves.find(m => m.color === c && m.san.includes('+'));
  return checkMove ? Math.floor(moves.indexOf(checkMove) / 2) + 1 : null;
};

// total checks given by color
const getChecksByColor = (game, { color = null, user = null } = {}) => {
  const moves = getMovesByColor(game, { color, user });
  return moves.filter(m => m.san.includes('+')).length;
};

// total promotions by color
const getPromotionsByColor = (game, { color = null, user = null } = {}) => {
  const moves = getMovesByColor(game, { color, user });
  return moves.filter(m => m.flags.includes('p')).length;
};

// winner color 
const getWinnerColor = (game) => {
  const result = game.header().Result;
  if (result === '1-0') return 'White';
  if (result === '0-1') return 'Black';
  return null;
};

// winner username (or null)
const getWinner = (game) => {
  const winnerColor = getWinnerColor(game);
  if (!winnerColor) return null;
  return winnerColor === 'White' ? game.header().White : game.header().Black;
};

// init all game metrics
const initGameMetrics1 = (game) => {

  // objective (color neutral)
  game.metrics.WinnerColor = getWinnerColor(game);
  game.metrics.Winner = getWinner(game);

  // white metrics
  game.metrics.White.TurnCastle = getTurnCastled(game, { color: 'white' });
  game.metrics.White.CastleType = getCastleType(game, { color: 'white' });
  game.metrics.White.TurnQueenTapped = getTurnQueenTapped(game, { color: 'white' });
  game.metrics.White.TurnFirstCapture = getFirstCaptureTurn(game, { color: 'white' });
  game.metrics.White.TotalCaptures = getCapturesByColor(game, { color: 'white' });
  game.metrics.White.TurnFirstCheck = getFirstCheckTurn(game, { color: 'white' });
  game.metrics.White.TotalChecks = getChecksByColor(game, { color: 'white' });
  game.metrics.White.TotalPromotions = getPromotionsByColor(game, { color: 'white' });
  game.metrics.White.TotalMoves = getMoveCount(game, { color: 'white' });

  // black metrics
  game.metrics.Black.TurnCastle = getTurnCastled(game, { color: 'black' });
  game.metrics.Black.CastleType = getCastleType(game, { color: 'black' });
  game.metrics.Black.TurnQueenTapped = getTurnQueenTapped(game, { color: 'black' });
  game.metrics.Black.TurnFirstCapture = getFirstCaptureTurn(game, { color: 'black' });
  game.metrics.Black.TotalCaptures = getCapturesByColor(game, { color: 'black' });
  game.metrics.Black.TurnFirstCheck = getFirstCheckTurn(game, { color: 'black' });
  game.metrics.Black.TotalChecks = getChecksByColor(game, { color: 'black' });
  game.metrics.Black.TotalPromotions = getPromotionsByColor(game, { color: 'black' });
  game.metrics.Black.TotalMoves = getMoveCount(game, { color: 'black' });
};

module.exports = {
  initGameMetrics1,
  resolveColor,
  getMovesByColor,
  hasCastled,
  getTurnCastled,
  getCastleType,
  getTurnQueenTapped,
  getFirstCaptureTurn,
  getCapturesByColor,
  getMoveCount,
  getFirstCheckTurn,
  getChecksByColor,
  getPromotionsByColor,
  getWinnerColor,
  getWinner
};
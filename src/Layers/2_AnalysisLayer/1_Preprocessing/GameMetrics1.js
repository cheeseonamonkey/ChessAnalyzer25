// GameMetrics1.js
// Game-level metrics (2D) - computed per player color

const resolveColor = (game, { color = null, user = null } = {}) => {
  if (color) return color[0].toLowerCase();
  if (user) return user === game.header().White ? 'w' : 'b';
  return null;
};

const getMovesByColor = (game, { color = null, user = null } = {}) => {
  const c = resolveColor(game, { color, user });
  return game.history({ verbose: true }).filter(m => m.color === c);
};

const hasCastled = (game, { color = null, user = null } = {}) => {
  const moves = getMovesByColor(game, { color, user });
  return moves.some(m => m.flags.includes('k') || m.flags.includes('q'));
};

const getTurnCastled = (game, { color = null, user = null } = {}) => {
  const moves = game.history({ verbose: true });
  const c = resolveColor(game, { color, user });
  const castleMove = moves.find(m => m.color === c && (m.flags.includes('k') || m.flags.includes('q')));
  return castleMove ? Math.floor(moves.indexOf(castleMove) / 2) + 1 : null;
};

const getCastleType = (game, { color = null, user = null } = {}) => {
  const moves = getMovesByColor(game, { color, user });
  const castleMove = moves.find(m => m.flags.includes('k') || m.flags.includes('q'));
  if (!castleMove) return null;
  return castleMove.flags.includes('k') ? 'O-O' : 'O-O-O';
};

const getFirstTurn = (game, { color = null, user = null }, predicate) => {
  const moves = game.history({ verbose: true });
  const c = resolveColor(game, { color, user });
  const move = moves.find(m => m.color === c && predicate(m));
  return move ? Math.floor(moves.indexOf(move) / 2) + 1 : null;
};

const getTurnQueenTapped = (game, opts) => 
  getFirstTurn(game, opts, m => m.piece === 'q');

const getFirstCaptureTurn = (game, opts) => 
  getFirstTurn(game, opts, m => m.flags.includes('c'));

const getFirstCheckTurn = (game, opts) => 
  getFirstTurn(game, opts, m => m.san.includes('+'));

const countMoves = (game, { color = null, user = null }, predicate) => {
  return getMovesByColor(game, { color, user }).filter(predicate).length;
};

const getCapturesByColor = (game, opts) => 
  countMoves(game, opts, m => m.flags.includes('c') || m.flags.includes('e'));

const getChecksByColor = (game, opts) => 
  countMoves(game, opts, m => m.san.includes('+'));

const getPromotionsByColor = (game, opts) => 
  countMoves(game, opts, m => m.flags.includes('p'));

const getMoveCount = (game, opts) => getMovesByColor(game, opts).length;

const getWinnerColor = (game) => {
  const result = game.header().Result;
  if (result === '1-0') return 'White';
  if (result === '0-1') return 'Black';
  return null;
};

const getWinner = (game) => {
  const winnerColor = getWinnerColor(game);
  if (!winnerColor) return null;
  return winnerColor === 'White' ? game.header().White : game.header().Black;
};

// Helper to reduce repetition
const initColorMetrics = (game, color) => {
  const opts = { color };
  return {
    TurnCastle: getTurnCastled(game, opts),
    CastleType: getCastleType(game, opts),
    TurnQueenTapped: getTurnQueenTapped(game, opts),
    TurnFirstCapture: getFirstCaptureTurn(game, opts),
    TotalCaptures: getCapturesByColor(game, opts),
    TurnFirstCheck: getFirstCheckTurn(game, opts),
    TotalChecks: getChecksByColor(game, opts),
    TotalPromotions: getPromotionsByColor(game, opts),
    TotalMoves: getMoveCount(game, opts)
  };
};

const initGameMetrics1 = (game) => {
  game.metrics.WinnerColor = getWinnerColor(game);
  game.metrics.Winner = getWinner(game);
  game.metrics.White = initColorMetrics(game, 'white');
  game.metrics.Black = initColorMetrics(game, 'black');
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
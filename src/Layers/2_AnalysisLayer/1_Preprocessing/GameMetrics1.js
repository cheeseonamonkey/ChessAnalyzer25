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

const getECO = (game) => {
  const url = game.header().ECOUrl;
  if (!url) return null;
  const parts = url.split('/openings/')[1];
  if (!parts) return null;
  return parts.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
};

const getFirstTurnMoves = (game) => {
  const moves = game.history();
  return moves.slice(0, 2).join(' ');
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

// Single-pass metric collection
const collectColorMetrics = (moves, color) => {
  const c = color[0].toLowerCase();
  const metrics = {
    TurnCastle: null,
    CastleType: null,
    TurnQueenTapped: null,
    TurnFirstCapture: null,
    TotalCaptures: 0,
    TurnFirstCheck: null,
    TotalChecks: 0,
    TotalPromotions: 0,
    TotalMoves: 0
  };

  moves.forEach((m, idx) => {
    if (m.color !== c) return;
    
    metrics.TotalMoves++;
    const turn = Math.floor(idx / 2) + 1;

    // Castle
    if (!metrics.TurnCastle && (m.flags.includes('k') || m.flags.includes('q'))) {
      metrics.TurnCastle = turn;
      metrics.CastleType = m.flags.includes('k') ? 'O-O' : 'O-O-O';
    }

    // Queen tap
    if (!metrics.TurnQueenTapped && m.piece === 'q') {
      metrics.TurnQueenTapped = turn;
    }

    // Captures
    if (m.flags.includes('c') || m.flags.includes('e')) {
      if (!metrics.TurnFirstCapture) metrics.TurnFirstCapture = turn;
      metrics.TotalCaptures++;
    }

    // Checks
    if (m.san.includes('+')) {
      if (!metrics.TurnFirstCheck) metrics.TurnFirstCheck = turn;
      metrics.TotalChecks++;
    }

    // Promotions
    if (m.flags.includes('p')) {
      metrics.TotalPromotions++;
    }
  });

  return metrics;
};

const initGameMetrics1 = (game) => {
  const moves = game.history({ verbose: true });
  
  game.metrics.ECO = getECO(game);
  game.metrics.FirstTurn = getFirstTurnMoves(game);
  game.metrics.WinnerColor = getWinnerColor(game);
  game.metrics.Winner = getWinner(game);
  game.metrics.White = collectColorMetrics(moves, 'white');
  game.metrics.Black = collectColorMetrics(moves, 'black');
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
  getWinner,
  getECO,
  getFirstTurnMoves
};
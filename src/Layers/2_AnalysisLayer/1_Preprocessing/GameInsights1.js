/**
 * Build insights and attach them to a single game.
 * 
 * @param {Object} game - Single game object with header and metrics.
 * @param {string[]} usernames - Usernames to filter insights by player.
 */
const initGameInsights1 = (game, usernames) => {
  const isTargetUser = (username) =>
    usernames.some(u => username.toLowerCase() === u.toLowerCase());

  const { White, Black } = game.header();
  const moves = game.history({ verbose: true });
  
  // Helper to get first queen move turn
  const getQueenTapTurn = (color) => {
    const idx = moves.findIndex(m => m.color === color && m.piece === 'q');
    return idx === -1 ? null : Math.floor(idx / 2) + 1;
  };

  // Build color-specific data
  const buildColorData = (color, username, metrics) => ({
    player: username,
    color: color === 'w' ? 'White' : 'Black',
    
    // Castling
    castleTurn: metrics.CastleTurn,
    castleType: metrics.CastleType || 'None',
    castleTiming: metrics.CastleTurn ? 
      (metrics.CastleTurn <= 5 ? 'Early' : metrics.CastleTurn <= 10 ? 'Mid' : 'Late') : 'None',
    
    // Captures
    firstCaptureTurn: metrics.FirstCaptureTurn,
    captureCount: moves.filter(m => m.color === color && /[ce]/.test(m.flags)).length,
    
    // Queen
    queenTapTurn: getQueenTapTurn(color),
    queenTapTiming: (() => {
      const turn = getQueenTapTurn(color);
      return turn ? (turn <= 5 ? 'Early' : turn <= 10 ? 'Mid' : 'Late') : 'None';
    })(),
    
    // Checks & promotions
    checkCount: moves.filter(m => m.color === color && m.san.includes('+')).length,
    promotionCount: moves.filter(m => m.color === color && m.flags.includes('p')).length,
    
    // Result
    won: game.metrics.WinnerColor === (color === 'w' ? 'White' : 'Black'),
    draw: game.metrics.WinnerColor === 'Draw'
  });

  // Determine which color(s) the target user played
  const whiteIsTarget = isTargetUser(White);
  const blackIsTarget = isTargetUser(Black);

  if (!whiteIsTarget && !blackIsTarget) {
    game.insights = null;
    return;
  }

  game.insights = {
    white: whiteIsTarget ? buildColorData('w', White, game.metrics.White) : null,
    black: blackIsTarget ? buildColorData('b', Black, game.metrics.Black) : null
  };
};

module.exports = { initGameInsights1 };
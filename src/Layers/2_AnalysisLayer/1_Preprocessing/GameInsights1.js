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
  
  let userData = null;
  if (isTargetUser(White)) {
    userData = {
      color: 'White',
      metrics: game.metrics.White,
      won: game.metrics.WinnerColor === 'White',
      draw: game.metrics.WinnerColor === 'Draw'
    };
  } else if (isTargetUser(Black)) {
    userData = {
      color: 'Black',
      metrics: game.metrics.Black,
      won: game.metrics.WinnerColor === 'Black',
      draw: game.metrics.WinnerColor === 'Draw'
    };
  }

  if (!userData) {
    game.insights = null;
    return;
  }

  const m = userData.metrics;

  game.insights = {
    player: userData.color === 'White' ? White : Black,
    color: userData.color,
    result: userData.won ? 'Win' : (userData.draw ? 'Draw' : 'Loss'),
    
    hasCastled: m.HasCastled,
    castleType: m.CastleType || 'None',
    castleTurn: m.CastleTurn || null,
    castleTiming: m.CastleTurn ? (m.CastleTurn <= 5 ? 'Early' : m.CastleTurn <= 10 ? 'Mid' : 'Late') : 'None',
    
    captureCount: m.CaptureCount,
    captureGroup: m.CaptureCount === 0 ? 'None' : m.CaptureCount <= 3 ? '1-3' : m.CaptureCount <= 6 ? '4-6' : '7+',
    firstCaptureTurn: m.FirstCaptureTurn || null,
    firstCaptureTiming: m.FirstCaptureTurn ? (m.FirstCaptureTurn <= 5 ? 'Early' : m.FirstCaptureTurn <= 10 ? 'Mid' : 'Late') : 'None',
    
    checkCount: m.CheckCount,
    checkGroup: m.CheckCount === 0 ? 'None' : m.CheckCount <= 2 ? '1-2' : m.CheckCount <= 5 ? '3-5' : '6+',
    
    promotionCount: m.PromotionCount,
    hadPromotion: m.PromotionCount > 0,
    
    moveCount: m.MoveCount,
    gameLength: m.MoveCount < 20 ? 'Short' : m.MoveCount <= 40 ? 'Medium' : 'Long'
  };
};

module.exports = { initGameInsights1 };
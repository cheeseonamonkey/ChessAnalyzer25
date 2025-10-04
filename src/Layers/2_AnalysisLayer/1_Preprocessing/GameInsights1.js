// GameInsights1.js
// Aggregate insights treating all tracked users as one entity

const analyzeWinRates = (games, usernames) => {
  const stats = {
    totalGames: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    asWhite: { games: 0, wins: 0 },
    asBlack: { games: 0, wins: 0 }
  };

  games.forEach(game => {
    const white = game.header().White;
    const black = game.header().Black;
    const result = game.header().Result;

    const trackedAsWhite = usernames.includes(white);
    const trackedAsBlack = usernames.includes(black);
    
    if (!trackedAsWhite && !trackedAsBlack) return;

    stats.totalGames++;
    
    if (trackedAsWhite) {
      stats.asWhite.games++;
      if (result === '1-0') stats.asWhite.wins++;
    }
    if (trackedAsBlack) {
      stats.asBlack.games++;
      if (result === '0-1') stats.asBlack.wins++;
    }

    if (result === '1/2-1/2') {
      stats.draws++;
    } else if (usernames.includes(game.metrics.Winner)) {
      stats.wins++;
    } else {
      stats.losses++;
    }
  });

  // Calculate percentages
  if (stats.totalGames > 0) {
    stats.winRate = ((stats.wins / stats.totalGames) * 100).toFixed(1);
    stats.lossRate = ((stats.losses / stats.totalGames) * 100).toFixed(1);
    stats.drawRate = ((stats.draws / stats.totalGames) * 100).toFixed(1);
    stats.asWhite.winRate = stats.asWhite.games > 0 ? 
      ((stats.asWhite.wins / stats.asWhite.games) * 100).toFixed(1) : 0;
    stats.asBlack.winRate = stats.asBlack.games > 0 ? 
      ((stats.asBlack.wins / stats.asBlack.games) * 100).toFixed(1) : 0;
  }

  return stats;
};

const analyzeWinRatesByMetrics = (games, usernames) => {
  const getUserColor = (game, usernames) => {
    const white = game.header().White;
    const black = game.header().Black;
    if (usernames.includes(white)) return 'White';
    if (usernames.includes(black)) return 'Black';
    return null;
  };

  const isWin = (game, color) => {
    const result = game.header().Result;
    return (color === 'White' && result === '1-0') || (color === 'Black' && result === '0-1');
  };

  const groupBy = (metricGetter) => {
    const groups = {};
    games.forEach(game => {
      const color = getUserColor(game, usernames);
      if (!color) return;

      const value = metricGetter(game, color);
      if (value === null || value === undefined) return;

      if (!groups[value]) groups[value] = { games: 0, wins: 0 };
      groups[value].games++;
      if (isWin(game, color)) groups[value].wins++;
    });

    // Calculate win rates
    Object.keys(groups).forEach(key => {
      const g = groups[key];
      g.winRate = ((g.wins / g.games) * 100).toFixed(1);
    });

    return groups;
  };

  return {
    byCastleTurn: groupBy((game, color) => {
      const turn = game.metrics[color]?.TurnCastle;
      if (!turn) return 'No Castle';
      if (turn <= 5) return 'Early (≤5)';
      if (turn <= 10) return 'Mid (6-10)';
      if (turn <= 16) return 'Late (10-16)';
      return 'Very Late (>16)';
    }),

    byCastleType: groupBy((game, color) => 
      game.metrics[color]?.CastleType || 'No Castle'
    ),

    byQueenTapTurn: groupBy((game, color) => {
      const turn = game.metrics[color]?.TurnQueenTapped;
      if (!turn) return 'Never';
      if (turn <= 5) return 'Early (≤5)';
      if (turn <= 15) return 'Mid (6-15)';
      return 'Late (>15)';
    }),

    byFirstCaptureTurn: groupBy((game, color) => {
      const turn = game.metrics[color]?.TurnFirstCapture;
      if (!turn) return 'No Captures';
      if (turn <= 10) return 'Early (≤10)';
      if (turn <= 20) return 'Mid (11-20)';
      return 'Late (>20)';
    }),

    byTotalCaptures: groupBy((game, color) => {
      const captures = game.metrics[color]?.TotalCaptures || 0;
      if (captures === 0) return '0';
      if (captures <= 3) return '1-3';
      if (captures <= 6) return '4-6';
      return '7+';
    }),

    byTotalChecks: groupBy((game, color) => {
      const checks = game.metrics[color]?.TotalChecks || 0;
      if (checks === 0) return '0';
      if (checks <= 2) return '1-2';
      return '3+';
    }),

    byPromotions: groupBy((game, color) => {
      const promo = game.metrics[color]?.TotalPromotions || 0;
      return promo > 0 ? 'Had Promotion' : 'No Promotion';
    })
  };
};

module.exports = { analyzeWinRates, analyzeWinRatesByMetrics };
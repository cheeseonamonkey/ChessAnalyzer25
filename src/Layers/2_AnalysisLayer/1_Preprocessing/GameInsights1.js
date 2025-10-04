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

module.exports = { analyzeWinRates };
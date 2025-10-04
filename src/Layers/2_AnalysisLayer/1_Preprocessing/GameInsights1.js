// GameInsights1.js
// Aggregate insights treating all tracked users as one entity

const initGameInsights1 = (game, usernames) => {
  const white = game.header().White;
  const black = game.header().Black;
  
  game.metrics.TrackedUsers = {
    White: usernames.includes(white),
    Black: usernames.includes(black)
  };
};

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
    const winner = game.metrics.Winner;
    const result = game.header().Result;

    // Check if any tracked user is playing
    const trackedAsWhite = usernames.includes(white);
    const trackedAsBlack = usernames.includes(black);
    
    if (!trackedAsWhite && !trackedAsBlack) return;

    stats.totalGames++;
    
    // Count by color
    if (trackedAsWhite) {
      stats.asWhite.games++;
      if (result === '1-0') stats.asWhite.wins++;
    }
    if (trackedAsBlack) {
      stats.asBlack.games++;
      if (result === '0-1') stats.asBlack.wins++;
    }

    // Count overall results
    if (result === '1/2-1/2') {
      stats.draws++;
    } else if (usernames.includes(winner)) {
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

module.exports = {
  initGameInsights1,
  analyzeWinRates
};
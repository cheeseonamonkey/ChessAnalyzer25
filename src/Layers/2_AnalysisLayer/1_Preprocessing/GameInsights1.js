// GameInsights1.js
// Aggregate insights across multiple games for specific users

const initGameInsights1 = (game, usernames) => {
  // Determine which username(s) from our list played this game
  const white = game.header().White;
  const black = game.header().Black;
  
  game.metrics.TrackedUsers = {
    White: usernames.includes(white) ? white : null,
    Black: usernames.includes(black) ? black : null
  };
};

const analyzeWinRates = (games, usernames) => {
  const stats = {};
  
  // Initialize stats for each username
  usernames.forEach(user => {
    stats[user] = {
      totalGames: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      asWhite: { games: 0, wins: 0 },
      asBlack: { games: 0, wins: 0 }
    };
  });

  // Analyze each game
  games.forEach(game => {
    const white = game.header().White;
    const black = game.header().Black;
    const winner = game.metrics.Winner;
    const result = game.header().Result;

    [white, black].forEach(player => {
      if (!usernames.includes(player)) return;
      
      const s = stats[player];
      s.totalGames++;
      
      const isWhite = player === white;
      const colorStats = isWhite ? s.asWhite : s.asBlack;
      colorStats.games++;

      if (result === '1/2-1/2') {
        s.draws++;
      } else if (winner === player) {
        s.wins++;
        colorStats.wins++;
      } else {
        s.losses++;
      }
    });
  });

  // Calculate percentages
  Object.keys(stats).forEach(user => {
    const s = stats[user];
    if (s.totalGames === 0) return;
    
    s.winRate = ((s.wins / s.totalGames) * 100).toFixed(1);
    s.lossRate = ((s.losses / s.totalGames) * 100).toFixed(1);
    s.drawRate = ((s.draws / s.totalGames) * 100).toFixed(1);
    s.asWhite.winRate = s.asWhite.games > 0 ? ((s.asWhite.wins / s.asWhite.games) * 100).toFixed(1) : 0;
    s.asBlack.winRate = s.asBlack.games > 0 ? ((s.asBlack.wins / s.asBlack.games) * 100).toFixed(1) : 0;
  });

  return stats;
};

module.exports = {
  initGameInsights1,
  analyzeWinRates
};
// GameInsights1.js

const getInsights = (games, usernames = []) => {
    const isTargetUser = (username) => {
      if (usernames.length === 0) return true;
      return usernames.some(u => username.toLowerCase() === u.toLowerCase());
    };
  
    const getTargetUserData = (game) => {
      const whitePlayer = game.header().White;
      const blackPlayer = game.header().Black;
      
      if (isTargetUser(whitePlayer)) {
        return { 
          color: 'White', 
          metrics: game.metrics.White, 
          won: game.metrics.WinnerColor === 'White',
          draw: game.metrics.WinnerColor === 'Draw'
        };
      } else if (isTargetUser(blackPlayer)) {
        return { 
          color: 'Black', 
          metrics: game.metrics.Black, 
          won: game.metrics.WinnerColor === 'Black',
          draw: game.metrics.WinnerColor === 'Draw'
        };
      }
      return null;
    };
  
    const relevantGames = games.map(g => ({
      game: g,
      userData: getTargetUserData(g)
    })).filter(g => g.userData !== null);
  
    // Enhanced calculation with error handling
    const calc = (filter) => {
      const filtered = relevantGames.filter(g => {
        try {
          return filter(g.game, g.userData);
        } catch (e) {
          return false;
        }
      });
      const wins = filtered.filter(g => g.userData.won).length;
      return filtered.length ? (wins / filtered.length * 100).toFixed(1) : '0.0';
    };
  
    const avg = (arr) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : '0.00';
    
    const median = (arr) => {
      if (!arr.length) return '0.00';
      const sorted = [...arr].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 ? sorted[mid].toFixed(2) : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2);
    };
    
    const insights = {
      // Overall statistics
      'Total Games': relevantGames.length,
      'Total Wins': relevantGames.filter(g => g.userData.won).length,
      'Total Draws': relevantGames.filter(g => g.userData.draw).length,
      'Total Losses': relevantGames.filter(g => !g.userData.won && !g.userData.draw).length,
      'Win Rate': calc((g, u) => true),
      
      // Color performance
      'Win Rate as White': calc((g, u) => u.color === 'White'),
      'Win Rate as Black': calc((g, u) => u.color === 'Black'),
      
      // Castling insights
      'Castled vs Not': {
        'Castled': calc((g, u) => u.metrics.HasCastled),
        'Did Not Castle': calc((g, u) => !u.metrics.HasCastled)
      },
      'Castle Type': {
        'Kingside': calc((g, u) => u.metrics.CastleType === 'Kingside'),
        'Queenside': calc((g, u) => u.metrics.CastleType === 'Queenside'),
        'No Castle': calc((g, u) => !u.metrics.HasCastled)
      },
      'Castle Timing': {
        'Early (≤5)': calc((g, u) => u.metrics.CastleTurn && u.metrics.CastleTurn <= 5),
        'Mid (6-10)': calc((g, u) => u.metrics.CastleTurn > 5 && u.metrics.CastleTurn <= 10),
        'Late (>10)': calc((g, u) => u.metrics.CastleTurn > 10)
      },
      
      // Capture insights
      'Capture Groups': {
        'No Captures': calc((g, u) => u.metrics.CaptureCount === 0),
        '1-3 Captures': calc((g, u) => u.metrics.CaptureCount >= 1 && u.metrics.CaptureCount <= 3),
        '4-6 Captures': calc((g, u) => u.metrics.CaptureCount >= 4 && u.metrics.CaptureCount <= 6),
        '7+ Captures': calc((g, u) => u.metrics.CaptureCount >= 7)
      },
      'First Capture Timing': {
        'Early (≤5)': calc((g, u) => u.metrics.FirstCaptureTurn && u.metrics.FirstCaptureTurn <= 5),
        'Mid (6-10)': calc((g, u) => u.metrics.FirstCaptureTurn > 5 && u.metrics.FirstCaptureTurn <= 10),
        'Late (>10)': calc((g, u) => u.metrics.FirstCaptureTurn > 10),
        'No Captures': calc((g, u) => !u.metrics.FirstCaptureTurn)
      },
      
      // Check insights
      'Check Frequency': {
        'No Checks': calc((g, u) => u.metrics.CheckCount === 0),
        '1-2 Checks': calc((g, u) => u.metrics.CheckCount >= 1 && u.metrics.CheckCount <= 2),
        '3-5 Checks': calc((g, u) => u.metrics.CheckCount >= 3 && u.metrics.CheckCount <= 5),
        '6+ Checks': calc((g, u) => u.metrics.CheckCount >= 6)
      },
      
      // Promotion insights
      'Promotions': {
        'Had Promotion': calc((g, u) => u.metrics.PromotionCount > 0),
        'No Promotion': calc((g, u) => u.metrics.PromotionCount === 0)
      },
      
      // Game length analysis
      'Game Length': {
        'Short (<20)': calc((g, u) => u.metrics.MoveCount < 20),
        'Medium (20-40)': calc((g, u) => u.metrics.MoveCount >= 20 && u.metrics.MoveCount <= 40),
        'Long (>40)': calc((g, u) => u.metrics.MoveCount > 40)
      },
      
      // Comparative averages
      'Avg Moves': {
        'Winners': avg(relevantGames.filter(g => g.userData.won).map(g => g.userData.metrics.MoveCount)),
        'Losers': avg(relevantGames.filter(g => !g.userData.won && !g.userData.draw).map(g => g.userData.metrics.MoveCount)),
        'Overall': avg(relevantGames.map(g => g.userData.metrics.MoveCount))
      },
      'Avg Captures': {
        'Winners': avg(relevantGames.filter(g => g.userData.won).map(g => g.userData.metrics.CaptureCount)),
        'Losers': avg(relevantGames.filter(g => !g.userData.won && !g.userData.draw).map(g => g.userData.metrics.CaptureCount)),
        'Overall': avg(relevantGames.map(g => g.userData.metrics.CaptureCount))
      },
      'Avg Checks': {
        'Winners': avg(relevantGames.filter(g => g.userData.won).map(g => g.userData.metrics.CheckCount)),
        'Losers': avg(relevantGames.filter(g => !g.userData.won && !g.userData.draw).map(g => g.userData.metrics.CheckCount)),
        'Overall': avg(relevantGames.map(g => g.userData.metrics.CheckCount))
      },
      
      // Median statistics
      'Median Castle Turn': median(relevantGames.filter(g => g.userData.metrics.CastleTurn).map(g => g.userData.metrics.CastleTurn)),
      'Median First Capture': median(relevantGames.filter(g => g.userData.metrics.FirstCaptureTurn).map(g => g.userData.metrics.FirstCaptureTurn))
    };
  
    // Enhanced console output
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║        CHESS INSIGHTS (Win Rate Analysis)            ║');
    console.log('╚═══════════════════════════════════════════════════════╝');
    console.log(`\nAnalyzed ${relevantGames.length} games${usernames.length > 0 ? ` from: ${usernames.join(', ')}` : ' from all users'}\n`);
    
    const formatValue = (key, val) => {
      if (typeof val === 'number') return val;
      if (key.includes('Avg') || key.includes('Median')) return val;
      return `${val}%`;
    };
    
    Object.entries(insights).forEach(([key, val]) => {
      if (typeof val === 'object' && !Array.isArray(val)) {
        console.log(`\n${key}:`);
        Object.entries(val).forEach(([k, v]) => {
          const formatted = typeof v === 'string' && v.includes('.') && !key.includes('Total') ? 
            (key.includes('Avg') || key.includes('Median') ? v : `${v}%`) : v;
          console.log(`  ${k.padEnd(20)} ${formatted}`);
        });
      } else {
        console.log(`${key.padEnd(25)} ${formatValue(key, val)}`);
      }
    });
    console.log('\n' + '─'.repeat(57) + '\n');
  
    return { games, insights };
  };
  
  module.exports = { getInsights };
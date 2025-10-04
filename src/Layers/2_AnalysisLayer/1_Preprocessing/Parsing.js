// Parsing.js

const Chess = require("chess.js").Chess;

// Headers to remove (unnecessary metadata)
const HEADERS_TO_REMOVE = ['Event', 'Site', 'Round', 'Timezone', 'UTCDate', 'UTCTime', 'StartTime', 'Date'];

const parsePgns = (pgnsStrArr) => {
  const games = [];
  
  pgnsStrArr.forEach((pgn, index) => {
    try {
      const game = new Chess();
      game.loadPgn(pgn);
      
      // Clean up headers
      if (game._header) {
        HEADERS_TO_REMOVE.forEach(h => delete game._header[h]);
      }

      // Init metrics field
      game.metrics = { White: {}, Black: {} };
      
      games.push(game);
    } catch (error) {
      console.error(`Failed to parse PGN at index ${index}:`, error.message);
      console.error('PGN content:', pgn.substring(0, 200) + '...');
    }
  });
  
  return games;
};

module.exports = { parsePgns };
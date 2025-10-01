/**
 * Build insights and attach them to a single game.
 * 
 * @param {Object} game - Single game object with header and metrics.
 * @param {string[]} usernames - Usernames to filter insights by player.
 */


const resolveColor = (game, { color = null, user = null } = {}) => {
  if (color) return color[0].toLowerCase();
  if (user) return user === game.header().White ? 'w' : 'b';
  return null;
};


const initGameInsights1 = (game, usernames) => {
  
  // throw error if no analysis usernames found at all in a game 

  const moves = game.history({ verbose: true });
  
  // first queen move turn
  const getTurnQueenTapped = (color) => {};

  // first queen move turn
  const getTurnCastled = (color) => {};

  game.insights = {


  };
};

module.exports = { initGameInsights1 };
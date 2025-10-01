// BasicAnalysis.js



const isUserWhite = (game, username) => {
  return game.white?.toLowerCase() === username.toLowerCase();
};

const isUserBlack = (game, username) => {
  return game.black?.toLowerCase() === username.toLowerCase();
};

const isUserWinner = (game, username) => {
  if (game.result === "1-0") {
    return isUserWhite(game, username);
  } else if (game.result === "0-1") {
    return isUserBlack(game, username);
  } else {
    // "1/2-1/2" or other draw result
    return false;
  }
};

module.exports = {
  isUserBlack,
  isUserWhite,
  isUserWinner,
};

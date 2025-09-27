// analysisBasic.js

const { parse } = require('pgn-parser');

const isUserWinner = (game, username) => 
    (game.white.username === username && game.white.result === "win") ||
    (game.black.username === username && game.black.result === "win");
  
const isUserWhite = (game, username) => (game.white.username.toLowerCase() === username.toLowerCase());
const isUserBlack = (game, username) => (game.black.username.toLowerCase() === username.toLowerCase());

const parsePgns = (pgnsStrArr) => {
  let arrOut = []
  pgnsStrArr.forEach(pgnStr => {
    arrOut.push(...parse(pgnStr))
  })
  return arrOut;
};
 

  const turnCastled = (game, username) => {
  //todo
  };
  
  const typeOfCastle = (game, username) => {
  //todo
  };


  module.exports = {
    isUserBlack, isUserWhite, isUserWinner, parsePgns }

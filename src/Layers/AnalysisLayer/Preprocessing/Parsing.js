//Parsing.js
// 

const Chess = require("chess.js").Chess
const { getTurnCastled, getCastleType, getWinner, getWinnerColor } = require('./GameMetrics1')

const parsePgns = (pgnsStrArr) => {
  let gameArrOut = []
  pgnsStrArr.forEach((pgn, index) => {
    try {
      // load game from PGN string:
      let game = new Chess()
      game.loadPgn(pgn)
      if (game._header)
        ['Event', 'Site', 'Round', 'Timezone', 'UTCDate', 'UTCTime', 'StartTime', 'Date'].forEach(h => delete game._header[h]);

      // init metrics field
      game.metrics = {
        White: {},
        Black: {}
      }

      gameArrOut.push(game)
    } catch (error) {
      console.error(`Failed to parse PGN at index ${index}:`, error.message)
      console.error('PGN content:', pgn.substring(0, 200) + '...') // Log first 200 chars
      // Continue to next PGN
    }
  })
  return gameArrOut;
};

module.exports = {
  parsePgns
}






/*
const pgnList1 = [
  '[Event "Live Chess"]    [Site "Chess.com"]    [Date "2021.05.14"]    [Round "-"]    [White "Fffatty"]    [Black "Sugy7"]    [Result "0-1"]    [CurrentPosition "r1b1k2r/pppp1ppp/8/n6n/2B1N3/PP1PP3/1BP2PPN/3R1R1K b kq -"]    [Timezone "UTC"]    [ECO "A01"]    [ECOUrl "https://www.chess.com/openings/Nimzowitsch-Larsen-Attack-Modern-Variation...3.e3-Nf6-4.Nf3-e4-5.Nd4"]    [UTCDate "2021.05.14"]    [UTCTime "00:50:05"]    [WhiteElo "326"]    [BlackElo "306"]    [TimeControl "600"]    [Termination "Sugy7 won by resignation"]    [StartTime "00:50:05"]    [EndDate "2021.05.14"]    [EndTime "00:59:26"]    [Link "https://www.chess.com/game/live/14692582359"]        1. b3 {[%clk 0:09:57.3]} 1... e5 {[%clk 0:09:54.3]} 2. Bb2 {[%clk 0:09:56.4]} 2... Nc6 {[%clk 0:09:48.6]} 3. Nf3 {[%clk 0:09:53.4]} 3... Nf6 {[%clk 0:09:44.4]} 4. e3 {[%clk 0:09:51.3]} 4... e4 {[%clk 0:09:39.5]} 5. Nd4 {[%clk 0:09:36.9]} 5... Bb4 {[%clk 0:09:25.1]} 6. a3 {[%clk 0:09:32.9]} 6... Bd6 {[%clk 0:09:18.8]} 7. Bc4 {[%clk 0:09:23.9]} 7... Be5 {[%clk 0:09:10.2]} 8. O-O {[%clk 0:09:18.3]} 8... Na5 {[%clk 0:09:01.1]} 9. d3 {[%clk 0:09:16.9]} 9... Nh5 {[%clk 0:08:43.5]} 10. Nd2 {[%clk 0:09:12.2]} 10... Qg5 {[%clk 0:08:38.3]} 11. Nxe4 {[%clk 0:09:07.9]} 11... Qh4 {[%clk 0:08:26.4]} 12. Nf3 {[%clk 0:08:59]} 12... Bxh2+ {[%clk 0:08:22.8]} 13. Kh1 {[%clk 0:08:53.8]} 13... Qg4 {[%clk 0:07:01.5]} 14. Nxh2 {[%clk 0:08:47.4]} 14... Qxd1 {[%clk 0:06:59.2]} 15. Raxd1 {[%clk 0:08:45.3]} 0-1    ',
];

let gs = parsePgns(pgnList1)
*/

//console.log(gs[0].history({ verbose:true }))
//console.log(gs[0].getHeaders())








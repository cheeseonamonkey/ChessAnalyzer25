const {  evaluatePosition } = require("../src/2_AnalysisLayer/evaluationEngine")
const { isUserWhite, isUserBlack, isUserWinner, parsePgns } = require('../src/2_AnalysisLayer/analysisBasic')

// test('1+1=2', () => expect(1+1).toBe(2) ); 

const game1 = {
    pgn: '[Event "Live Chess"] [Site "Chess.com"] [Date "2025.07.21"] [Round "-"] [White "ffffattyyyy"] [Black "Darknight21060"] [Result "0-1"] [CurrentPosition "r1b1k1nr/ppp3pp/2np4/4p1q1/3P2P1/2N5/PPP1PP2/R2QKB1R w KQkq - 0 9"] [Timezone "UTC"] [ECO "A00"] [ECOUrl "https://www.chess.com/openings/Van-Geet-Opening-Reversed-Nimzowitsch-Napoleon-Attack"] [UTCDate "2025.07.21"] [UTCTime "07:35:13"] [WhiteElo "633"] [BlackElo "824"] [TimeControl "600"] [Termination "Darknight21060 won by resignation"] [StartTime "07:35:13"] [EndDate "2025.07.21"] [EndTime "07:36:50"] [Link "https://www.chess.com/game/live/140932387438"] 1. d4 {[%clk 0:09:57.2]} 1... Nc6 {[%clk 0:09:57.5]} 2. Nf3 {[%clk 0:09:48.4]} 2... e5 {[%clk 0:09:53.3]} 3. Nc3 {[%clk 0:09:41.3]} 3... d6 {[%clk 0:09:49.8]} 4. Bg5 {[%clk 0:09:35.6]} 4... Be7 {[%clk 0:09:47.3]} 5. h4 {[%clk 0:09:28.3]} 5... f6 {[%clk 0:09:46.1]} 6. g4 {[%clk 0:09:03.5]} 6... fxg5 {[%clk 0:09:43.8]} 7. hxg5 {[%clk 0:09:01.5]} 7... Bxg5 {[%clk 0:09:39.7]} 8. Nxg5 {[%clk 0:08:56]} 8... Qxg5 {[%clk 0:09:37.3]} 0-1',
    time_control: '600',
    end_time: 1753083410,
    rated: true,
    tcn: 'lB5Qgv0KbsZRcM90pF1ToETMFM0MvM7M',
    fen: 'r1b1k1nr/ppp3pp/2np4/4p1q1/3P2P1/2N5/PPP1PP2/R2QKB1R w KQkq - 0 9',
    time_class: 'rapid',
    white: {
      rating: 633,
      result: 'resigned',
      '@id': 'https://api.chess.com/pub/player/ffffattyyyy',
      username: 'ffffattyyyy',
    },
    black: {
      rating: 824,
      result: 'win',
      '@id': 'https://api.chess.com/pub/player/darknight21060',
      username: 'Darknight21060',
    },
    eco: 'https://www.chess.com/openings/Van-Geet-Opening-Reversed-Nimzowitsch-Napoleon-Attack'
};


test('isUserWhite/isUserBlack', ()=> {
    expect(isUserWhite(game1, 'ffffattyyyy')).toBe(true)
    expect(isUserWhite(game1, 'darknight21060')).toBe(false)
    expect(isUserBlack(game1, 'darknight21060')).toBe(true)
    expect(isUserBlack(game1, 'ffffattyyyy')).toBe(false)
});

test('isUserWinner', ()=> expect(isUserWinner(game1, 'ffffattyyyy')).toBe(false) )

//test('')

test('parsePgns', () => {
  let pgns = parsePgns([game1.pgn]);
  //console.log(JSON.stringify(pgns[0]));
  expect(pgns).toBeDefined();
  expect(pgns[0].moves).toBeDefined();
  expect(pgns[0].moves[0]).toBeDefined();
  expect(pgns[0].moves[0].move.length > 1).toBe(true);

});


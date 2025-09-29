const {  evaluatePosition } = require("../../../src/Layers/AnalysisLayer/Engine/EvaluationEngine")
const { isUserWhite, isUserBlack, isUserWinner } = require('../../../src/Layers/AnalysisLayer/AnalysisUtils');
const { parsePgns } = require("../../../src/Layers/AnalysisLayer/Preprocessing/Parsing");

const game1 = parsePgns([`[Event "Live Chess"] [Site "Chess.com"] [Date "2025.07.21"] [Round "-"] [White "ffffattyyyy"] [Black "Darknight21060"] [Result "0-1"] [CurrentPosition "r1b1k1nr/ppp3pp/2np4/4p1q1/3P2P1/2N5/PPP1PP2/R2QKB1R w KQkq - 0 9"] [Timezone "UTC"] [ECO "A00"] [ECOUrl "https://www.chess.com/openings/Van-Geet-Opening-Reversed-Nimzowitsch-Napoleon-Attack"] [UTCDate "2025.07.21"] [UTCTime "07:35:13"] [WhiteElo "633"] [BlackElo "824"] [TimeControl "600"] [Termination "Darknight21060 won by resignation"] [StartTime "07:35:13"] [EndDate "2025.07.21"] [EndTime "07:36:50"] [Link "https://www.chess.com/game/live/140932387438"] 1. d4 {[%clk 0:09:57.2]} 1... Nc6 {[%clk 0:09:57.5]} 2. Nf3 {[%clk 0:09:48.4]} 2... e5 {[%clk 0:09:53.3]} 3. Nc3 {[%clk 0:09:41.3]} 3... d6 {[%clk 0:09:49.8]} 4. Bg5 {[%clk 0:09:35.6]} 4... Be7 {[%clk 0:09:47.3]} 5. h4 {[%clk 0:09:28.3]} 5... f6 {[%clk 0:09:46.1]} 6. g4 {[%clk 0:09:03.5]} 6... fxg5 {[%clk 0:09:43.8]} 7. hxg5 {[%clk 0:09:01.5]} 7... Bxg5 {[%clk 0:09:39.7]} 8. Nxg5 {[%clk 0:08:56]} 8... Qxg5 {[%clk 0:09:37.3]} 0-1`])[0]


test('(empty)', ()=> {})
//test('isUserWinner', ()=> expect(isUserWinner(game1, 'ffffattyyyy')).toBe(false) )

//test('')

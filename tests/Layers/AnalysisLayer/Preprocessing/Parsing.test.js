const { parsePgns } = require("../../../../src/Layers/AnalysisLayer/Preprocessing/Parsing")




const pgnList1 = [
    '[Event "Live Chess"]    [Site "Chess.com"]    [Date "2021.05.14"]    [Round "-"]    [White "Fffatty"]    [Black "Sugy7"]    [Result "0-1"]    [CurrentPosition "r1b1k2r/pppp1ppp/8/n6n/2B1N3/PP1PP3/1BP2PPN/3R1R1K b kq -"]    [Timezone "UTC"]    [ECO "A01"]    [ECOUrl "https://www.chess.com/openings/Nimzowitsch-Larsen-Attack-Modern-Variation...3.e3-Nf6-4.Nf3-e4-5.Nd4"]    [UTCDate "2021.05.14"]    [UTCTime "00:50:05"]    [WhiteElo "326"]    [BlackElo "306"]    [TimeControl "600"]    [Termination "Sugy7 won by resignation"]    [StartTime "00:50:05"]    [EndDate "2021.05.14"]    [EndTime "00:59:26"]    [Link "https://www.chess.com/game/live/14692582359"]        1. b3 {[%clk 0:09:57.3]} 1... e5 {[%clk 0:09:54.3]} 2. Bb2 {[%clk 0:09:56.4]} 2... Nc6 {[%clk 0:09:48.6]} 3. Nf3 {[%clk 0:09:53.4]} 3... Nf6 {[%clk 0:09:44.4]} 4. e3 {[%clk 0:09:51.3]} 4... e4 {[%clk 0:09:39.5]} 5. Nd4 {[%clk 0:09:36.9]} 5... Bb4 {[%clk 0:09:25.1]} 6. a3 {[%clk 0:09:32.9]} 6... Bd6 {[%clk 0:09:18.8]} 7. Bc4 {[%clk 0:09:23.9]} 7... Be5 {[%clk 0:09:10.2]} 8. O-O {[%clk 0:09:18.3]} 8... Na5 {[%clk 0:09:01.1]} 9. d3 {[%clk 0:09:16.9]} 9... Nh5 {[%clk 0:08:43.5]} 10. Nd2 {[%clk 0:09:12.2]} 10... Qg5 {[%clk 0:08:38.3]} 11. Nxe4 {[%clk 0:09:07.9]} 11... Qh4 {[%clk 0:08:26.4]} 12. Nf3 {[%clk 0:08:59]} 12... Bxh2+ {[%clk 0:08:22.8]} 13. Kh1 {[%clk 0:08:53.8]} 13... Qg4 {[%clk 0:07:01.5]} 14. Nxh2 {[%clk 0:08:47.4]} 14... Qxd1 {[%clk 0:06:59.2]} 15. Raxd1 {[%clk 0:08:45.3]} 0-1    ',
    '[Event "Live Chess"]    [Site "Chess.com"]    [Date "2021.05.14"]    [Round "-"]    [White "Fffatty"]    [Black "Alediosss"]    [Result "1-0"]    [CurrentPosition "rnbqkbnr/pppppBpp/8/4N3/1P6/1QP1P3/PB1P1PPP/RN3RK1 b kq -"]    [Timezone "UTC"]    [ECO "A01"]    [ECOUrl "https://www.chess.com/openings/Nimzowitsch-Larsen-Attack"]    [UTCDate "2021.05.14"]    [UTCTime "01:10:17"]    [WhiteElo "336"]    [BlackElo "407"]    [TimeControl "600"]    [Termination "Fffatty won by checkmate"]    [StartTime "01:10:17"]    [EndDate "2021.05.14"]    [EndTime "01:11:09"]    [Link "https://www.chess.com/game/live/14693784559"]        1. b3 {[%clk 0:09:59.8]} 1... Nc6 {[%clk 0:09:59.9]} 2. Bb2 {[%clk 0:09:59]} 2... Nb8 {[%clk 0:09:59.8]} 3. Nf3 {[%clk 0:09:57.9]} 3... Nc6 {[%clk 0:09:59.7]} 4. e3 {[%clk 0:09:55.9]} 4... Nb8 {[%clk 0:09:59.6]} 5. Bd3 {[%clk 0:09:51.5]} 5... Nc6 {[%clk 0:09:59.5]} 6. O-O {[%clk 0:09:51]} 6... Nb8 {[%clk 0:09:59.4]} 7. Ne5 {[%clk 0:09:41.4]} 7... Nc6 {[%clk 0:09:59.3]} 8. b4 {[%clk 0:09:31.7]} 8... Nb8 {[%clk 0:09:59.2]} 9. c3 {[%clk 0:09:31]} 9... Nc6 {[%clk 0:09:59.1]} 10. Be2 {[%clk 0:09:23.8]} 10... Nb8 {[%clk 0:09:59]} 11. Bh5 {[%clk 0:09:21.5]} 11... Nc6 {[%clk 0:09:58.9]} 12. Qb3 {[%clk 0:09:18.3]} 12... Nb8 {[%clk 0:09:58.8]} 13. Bxf7# {[%clk 0:09:16.4]} 1-0    ',
    '[Event "Live Chess"]    [Site "Chess.com"]    [Date "2021.05.14"]    [Round "-"]    [White "felipeylu"]    [Black "Fffatty"]    [Result "0-1"]    [CurrentPosition "rn1qkb1r/pbpp1ppp/1p2p3/6Q1/2BPn3/8/PPP2PPP/RNB1K1NR w KQkq -"]    [Timezone "UTC"]    [ECO "B00"]    [ECOUrl "https://www.chess.com/openings/Owens-Defense"]    [UTCDate "2021.05.14"]    [UTCTime "01:11:15"]    [WhiteElo "300"]    [BlackElo "343"]    [TimeControl "600"]    [Termination "Fffatty won by resignation"]    [StartTime "01:11:15"]    [EndDate "2021.05.14"]    [EndTime "01:12:34"]    [Link "https://www.chess.com/game/live/14693794847"]        1. e4 {[%clk 0:09:56.4]} 1... b6 {[%clk 0:09:58.2]} 2. Bc4 {[%clk 0:09:50.7]} 2... Bb7 {[%clk 0:09:56.6]} 3. Qh5 {[%clk 0:09:45.7]} 3... e6 {[%clk 0:09:53.7]} 4. d4 {[%clk 0:09:32.8]} 4... Nf6 {[%clk 0:09:37]} 5. Qg5 {[%clk 0:09:24]} 5... Nxe4 {[%clk 0:09:32.3]} 0-1    ',
];

describe('Preprocessing: Parsing', () => {
    it('Smoke test: Parse PGN list', () => {
        const games = parsePgns(pgnList1)
    
        // Basic structure checks
        expect(Array.isArray(games)).toBe(true)
        expect(games.length).toBe(pgnList1.length)
        expect(typeof games[0]).toBe('object')
    
        // Game move checks
        const moveHistory = games[0].history()
        expect(moveHistory.length).toBeGreaterThan(10)
        expect(moveHistory[0]).toBe('b3')  // first move
    
        const moveVerbose = games[0].history({ verbose: true })
        expect(moveVerbose[0]).toMatchObject({ color: 'w', from: 'b2', to: 'b3', san: 'b3' })
    
    })
    

    it('bad PGN throws error', () => {
        const badPgnList = ['This is not a PGN']
        expect(() => parsePgns(badPgnList)).toThrow()
    })


    
});

// parse PGNs
// basic labelling (turn number, turn players, winner, etc.)
// allow exporting here?
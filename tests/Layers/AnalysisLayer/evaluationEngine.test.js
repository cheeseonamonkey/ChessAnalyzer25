const { isUserWhite, isUserBlack, isUserWinner, parsePgns, evaluateMaterial, evaluatePositional, evaluateAggregate } = require("../../../src/Layers/AnalysisLayer/Engine/EvaluationEngine");

describe('Chess Position Evaluation', () => {
    
    describe('Material evaluation', () => {
        test('White winning (material)', () => {
            // White has extra rooks
            const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPRRRPP/RNBQKBNR w KQkq - 0 1";
            const result = evaluateMaterial(fen);

            expect(result.white).toBeGreaterThan(result.black);
        });

        test('Black winning (material)', () => {
            // Black has extra rooks
            const fen = "rnbqkbnr/pprrrppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
            const result = evaluateMaterial(fen);

            expect(result.black).toBeGreaterThan(result.white);
        });
    });

    describe('Positional Evaluation', () => {
        test('White winning (positional)', () => {
            // White has better piece placement 
            const fen = "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/3P1N2/PPP2PPP/RNBQKB1R w KQkq - 0 1";
            const result = evaluatePositional(fen);

            expect(result.white).toBeGreaterThan(result.black);
        });

        test('Black winning (positional)', () => {
            // Black has better piece placement 
            const fen = "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1";
            const result = evaluatePositional(fen);

            expect(result.black).toBeGreaterThan(result.white);
        });
    });

    test('Starting positions should be equal', () => {
        // Standard starting position
        const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        const material = evaluateMaterial(fen);
        const positional = evaluatePositional(fen);
        const aggregate = evaluateAggregate(fen);

        expect(material.balance).toBe(0);
        expect(positional.balance).toBe(0);
        expect(aggregate.aggregate.balance).toBe(0);
    });

    test('Empty board should have zero evaluation', () => {
        // Empty board
        const fen = "8/8/8/8/8/8/8/8 w - - 0 1";
        const material = evaluateMaterial(fen);
        const positional = evaluatePositional(fen);

        expect(material.white).toBe(0);
        expect(material.black).toBe(0);
        expect(positional.white).toBe(0);
        expect(positional.black).toBe(0);
    });
        
    test('Same material, but black winning positionally', () => {
        // White has extra queen but pieces are poorly placed, Black has active pieces
        const fen = "r3k2r/4qp1p/6p1/pnppn3/1p2p1bb/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        const material = evaluateMaterial(fen);
        const positional = evaluatePositional(fen);
        
        expect(material.black == material.white).toBe(true); // same material score
        expect(positional.black).toBeGreaterThan(positional.white); // black winning positionally
    });

});

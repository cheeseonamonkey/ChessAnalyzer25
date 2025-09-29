const { getTurnCastled, getCastleType } = require("../../../../src/Layers/AnalysisLayer/Preprocessing/GameMetrics1")


describe('BasicAnalysis', () => {
  const mockMove = (color, flags) => ({
    color,
    flags,
  });

  describe('getTurnCastled', () => {
    it('should return the correct turn number for white kingside castling', () => {
      const moves = [
        mockMove('w', ''), // 1
        mockMove('b', ''),
        mockMove('w', ''),
        mockMove('b', ''),
        mockMove('w', 'k'), // White castles kingside on turn 3
      ];
      expect(getTurnCastled(moves, 'white')).toBe(3);
    });

    it('should return the correct turn number for black queenside castling', () => {
      const moves = [
        mockMove('w', ''),
        mockMove('b', ''),
        mockMove('w', ''),
        mockMove('b', ''),
        mockMove('w', ''),
        mockMove('b', 'q'), // Black castles queenside on turn 3
      ];
      expect(getTurnCastled(moves, 'black')).toBe(3);
    });

    it('should return null if the player never castles', () => {
      const moves = [
        mockMove('w', ''),
        mockMove('b', ''),
        mockMove('w', ''),
        mockMove('b', ''),
      ];
      expect(getTurnCastled(moves, 'white')).toBeNull();
      expect(getTurnCastled(moves, 'black')).toBeNull();
    });
  });

  describe('getCastleType', () => {
    it('should return "Kingside" if the player castled kingside', () => {
      const moves = [
        mockMove('w', ''),
        mockMove('b', ''),
        mockMove('w', 'k'), // Kingside castling
      ];
      expect(getCastleType(moves, 'white')).toBe('Kingside');
    });

    it('should return "Queenside" if the player castled queenside', () => {
      const moves = [
        mockMove('w', ''),
        mockMove('b', ''),
        mockMove('w', 'q'), // Queenside castling
      ];
      expect(getCastleType(moves, 'white')).toBe('Queenside');
    });

    it('should return "None" if the player never castled', () => {
      const moves = [
        mockMove('w', ''),
        mockMove('b', ''),
        mockMove('w', ''),
      ];
      expect(getCastleType(moves, 'white')).toBe('None');
    });
  });
});

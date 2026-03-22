export type GameState = 'START' | 'L1_MINDSET' | 'L2_CONTENT' | 'L3_CONVERSION' | 'END' | 'SUSPENDED';

export interface PlayerStats {
  xp: number;
  retentionRate: number; // Percentage
  trustScore: number; // Percentage
  conversionComplete: boolean;
  name: string;
}

export interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  stats: PlayerStats;
  updateStats: (updates: Partial<PlayerStats>) => void;
  playDing: () => void;
  playSwoosh: () => void;
  playBoom: () => void;
  showExplanation: (questionId: number, text: string) => void;
  hideExplanation: () => void;
  explanation: { visible: boolean; questionId: number | null; text: string };
  resetGame: () => void;
}

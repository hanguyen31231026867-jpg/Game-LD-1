import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, PlayerStats, GameContextType } from '../types';

const defaultStats: PlayerStats = {
  xp: 0,
  retentionRate: 100, // Starts at 100, or starts empty? Specs say: "Retention Rate: Quyết định bởi việc chọn đúng Hook trong 3s đầu". We'll start at 100 and minus 20% on fail.
  trustScore: 100, // Starts at 100
  conversionComplete: false,
  name: '',
};

const GameStateContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameStateContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>('START');
  const [stats, setStats] = useState<PlayerStats>(defaultStats);
  const [explanation, setExplanation] = useState<{ visible: boolean; questionId: number | null; text: string }>({
    visible: false,
    questionId: null,
    text: '',
  });

  const updateStats = (updates: Partial<PlayerStats>) => {
    setStats(prev => ({ ...prev, ...updates }));
  };

  const playDing = () => {
    const audio = new Audio('/ting_ting.mp3');
    audio.play().catch(e => console.log('Audio play failed', e));
  };

  const playSwoosh = () => {
    const audio = new Audio('/swoosh_swipe.mp3');
    audio.play().catch(e => console.log('Audio play failed', e));
  };

  const playBoom = () => {
    // Assuming swoosh_swipe.mp3 or specific boom.mp3
    const audio = new Audio('/swoosh_swipe.mp3'); // Fallback if no boom
    audio.play().catch(e => console.log('Audio play failed', e));
  };

  const showExplanation = (questionId: number, text: string) => {
    setExplanation({ visible: true, questionId, text });
  };

  const hideExplanation = () => {
    setExplanation({ visible: false, questionId: null, text: '' });
  };

  const resetGame = () => {
    setStats(defaultStats);
    setGameState('L1_MINDSET');
    hideExplanation();
  };

  return (
    <GameStateContext.Provider value={{
      gameState,
      setGameState,
      stats,
      updateStats,
      playDing,
      playSwoosh,
      playBoom,
      showExplanation,
      hideExplanation,
      explanation,
      resetGame
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

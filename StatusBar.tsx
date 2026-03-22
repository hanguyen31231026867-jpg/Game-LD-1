import React from 'react';
import { useGame } from '../context/GameStateContext';
import { Star, Shield, Eye } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { stats, gameState } = useGame();

  if (gameState === 'START' || gameState === 'END') return null;

  return (
    <div className="absolute top-16 left-0 right-0 px-4 z-10 flex flex-col gap-2 pointer-events-none">
      <div className="flex justify-between items-center text-xs">
        {/* XP */}
        <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="font-bold text-white">{stats.xp} XP</span>
        </div>

        {/* Trust Score */}
        <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20 flex items-center gap-1">
          <Shield className="w-3 h-3 text-green-400 fill-green-400" />
          <span className="font-bold text-white">{stats.trustScore}% Trust</span>
        </div>
      </div>

      {/* Retention Rate (Shows mainly from Level 2) */}
      <div className="w-full bg-black/60 backdrop-blur-md rounded-full border border-white/20 h-4 relative overflow-hidden flex items-center px-1">
        <div 
          className="absolute left-0 top-0 bottom-0 bg-tiktok-cyan transition-all duration-500 ease-out"
          style={{ width: `${Math.max(0, stats.retentionRate)}%` }}
        />
        <span className="relative z-10 text-[10px] font-bold text-white mix-blend-difference drop-shadow-md w-full text-center flex items-center justify-center gap-1">
          <Eye className="w-3 h-3" /> Retention Rate
        </span>
      </div>
    </div>
  );
};

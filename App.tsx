import React from 'react';
import { useGame } from './context/GameStateContext';
import { StatusBar } from './components/StatusBar';
import { FeedbackModal } from './components/FeedbackModal';
import { Level1Mindset } from './levels/Level1Mindset';
import { Level2ContentLab } from './levels/Level2ContentLab';
import { Level3Conversion } from './levels/Level3Conversion';
import { EndScreen } from './levels/EndScreen';

function App() {
  const { gameState, setGameState } = useGame();

  return (
    <div className="flex items-center justify-center min-h-screen bg-tiktok-darkgray font-sans selection:bg-tiktok-pink/30">
      {/* Mobile App Container */}
      <div className="w-full h-screen sm:max-w-[400px] sm:h-[850px] bg-tiktok-black sm:rounded-[40px] shadow-2xl overflow-hidden relative sm:border-[8px] sm:border-gray-900 flex flex-col">
        {/* TikTok App Header */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          <div className="text-tiktok-white font-bold text-lg drop-shadow-md">Sales Master</div>
        </div>

        <StatusBar />
        <FeedbackModal />

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative z-0 overflow-hidden">
          {gameState === 'START' && (
            <div className="flex-1 flex flex-col justify-center items-center p-6 relative">
              <h1 className="text-4xl font-black text-center mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-tiktok-cyan via-white to-tiktok-pink drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                TIKTOK<br />SALES MASTER
              </h1>
              <p className="text-center text-tiktok-text-gray mb-12 text-sm leading-relaxed max-w-[250px]">
                Trở thành chiến thần Social Selling thông qua 16 thử thách kịch tính!
              </p>
              
              <div className="w-full max-w-xs p-[1px] bg-gradient-to-r from-tiktok-cyan to-tiktok-pink rounded-xl mb-4">
                <button 
                  onClick={() => setGameState('L1_MINDSET')}
                  className="w-full py-4 rounded-xl bg-tiktok-black text-white font-bold text-lg hover:bg-gray-900 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Bắt Đầu Hành Trình
                </button>
              </div>
            </div>
          )}

          {gameState === 'L1_MINDSET' && <Level1Mindset />}
          {gameState === 'L2_CONTENT' && <Level2ContentLab />}
          {gameState === 'L3_CONVERSION' && <Level3Conversion />}
          {gameState === 'END' && <EndScreen />}
        </div>
      </div>
    </div>
  );
}

export default App;

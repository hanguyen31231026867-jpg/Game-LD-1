import React, { useRef } from 'react';
import { useGame } from '../context/GameStateContext';
import html2canvas from 'html2canvas';
import { Download, RotateCcw } from 'lucide-react';

export const EndScreen: React.FC = () => {
  const { stats, resetGame } = useGame();
  const cardRef = useRef<HTMLDivElement>(null);

  // Title Logic
  let title = "Tân binh TikTok";
  if (stats.xp >= 501 && stats.xp <= 800) title = "Chiến thần Content";
  if (stats.xp > 800) title = "Bậc thầy Social Selling";

  // Also if they didn't finish conversion, title might be adjusted, but based on specs it relies on XP.
  
  const exportImage = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#121212',
        scale: 2,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'TikTok_Sales_Master_Result.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Lỗi khi tải ảnh:', err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-tiktok-darkgray relative overflow-hidden">
      <div 
        ref={cardRef}
        className="w-full max-w-sm bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 shadow-[0_0_40px_rgba(37,244,238,0.1)] flex flex-col items-center relative z-10"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-tiktok-cyan to-tiktok-pink" />
        
        <h2 className="text-tiktok-cyan font-bold text-sm mb-2 tracking-widest uppercase">THÀNH TÍCH ĐẠT ĐƯỢC</h2>
        
        <div className="text-4xl font-black text-white mb-2 my-4 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          {title}
        </div>

        <div className="text-center mb-6">
          <p className="text-sm font-medium text-gray-400">Tham gia khóa Đào tạo</p>
          <h3 className="font-bold text-lg text-white">Social Selling on TikTok</h3>
        </div>

        <div className="w-full bg-gray-800/80 rounded-2xl p-5 md:p-6 mb-6 flex flex-col gap-4 border border-gray-700 shadow-inner">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-medium text-sm">Điểm Kinh Nghiệm (XP)</span>
            <span className="font-black text-yellow-400 text-2xl drop-shadow-md">{stats.xp}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-medium text-sm">Tỷ Lệ Giữ Chân</span>
            <span className="font-black text-tiktok-cyan text-xl">{stats.retentionRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-medium text-sm">Điểm Tin Cậy (Trust)</span>
            <span className="font-black text-green-400 text-xl">{stats.trustScore}%</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-600/50 pt-4 mt-1">
            <span className="text-gray-300 font-bold text-sm uppercase">Chốt Đơn</span>
            <span className={`font-black text-xl ${stats.conversionComplete ? 'text-tiktok-pink' : 'text-gray-500'}`}>
              {stats.conversionComplete ? 'THÀNH CÔNG' : 'THẤT BẠI'}
            </span>
          </div>
        </div>
        
        <p className="text-center text-[10px] text-gray-500">
          Chương trình L&D: TIKTOK SALES MASTER 2026
        </p>
      </div>

      <div className="w-full max-w-sm flex gap-4 mt-8 z-10">
        <button 
          onClick={exportImage}
          className="flex-1 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all border border-gray-600"
        >
          <Download className="w-5 h-5" /> Lưu Ảnh
        </button>
        <button 
          onClick={resetGame}
          className="flex-1 py-4 bg-tiktok-pink hover:brightness-110 text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_0_20px_rgba(254,44,85,0.4)]"
        >
          <RotateCcw className="w-5 h-5" /> Chơi Lại
        </button>
      </div>

      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-tiktok-cyan opacity-20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-tiktok-pink opacity-20 blur-[100px] pointer-events-none" />
    </div>
  );
};

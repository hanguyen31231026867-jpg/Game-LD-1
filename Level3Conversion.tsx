import React, { useState } from 'react';
import { useGame } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export const Level3Conversion: React.FC = () => {
  const { stats, updateStats, setGameState, playDing, playSwoosh, playBoom, showExplanation } = useGame();
  
  const [step, setStep] = useState(0); 
  const [suspended, setSuspended] = useState(false);

  const answer = (correct: boolean, explanationText: string, nextStep: number, qId: number, xpGain = 100) => {
    if (correct) {
      playDing();
      updateStats({ xp: stats.xp + xpGain });
      setStep(nextStep);
    } else {
      playSwoosh();
      showExplanation(qId, explanationText);
    }
  };

  const handlePolicyFail = () => {
    playBoom();
    setSuspended(true);
    updateStats({ trustScore: stats.trustScore - 50 });
  };

  const recoverFromSuspend = () => {
    setSuspended(false);
    showExplanation(8, "Luật TikTok Shop 2026: Cấm sử dụng hình ảnh Before/After hoặc hình ảnh so sánh vì dễ gây hiểu lầm về công dụng sản phẩm. Hãy sử dụng Feedback thực tế thay thế!");
  };

  if (suspended) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-red-900 absolute inset-0 z-50 p-6 animate-pulse">
        <AlertTriangle className="w-24 h-24 text-white mb-6" />
        <h1 className="text-3xl font-bold text-white mb-2 text-center">ACCOUNT SUSPENDED</h1>
        <p className="text-white text-center mb-8">Vi Phạm Chính Sách TikTok Shop 2026: Sử dụng hình ảnh Before/After.</p>
        <p className="text-red-200 text-sm mb-4">Trust Score -50%</p>
        <button 
          onClick={recoverFromSuspend}
          className="px-8 py-4 bg-white text-red-900 font-bold rounded-xl active:scale-95 transition-all"
        >
          Xem lại luật & Tiếp tục
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-end p-4 bg-tiktok-darkgray relative overflow-hidden pb-20">
      <div className="text-center absolute top-20 left-0 w-full z-0 opacity-20">
        <h2 className="text-5xl font-bold text-white uppercase tracking-widest">
          {step < 2 ? 'LÝ THUYẾT' : 'THỰC CHIẾN'}
        </h2>
      </div>

      <div className="w-full max-w-sm mx-auto z-10 bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-gray-800 flex flex-col justify-end min-h-[400px]">
        
        {step >= 2 && (
          <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-3 pr-2">
            <div className="self-start bg-gray-800 text-white p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm">
              Trời ơi, em ơi chị thấy cũng thích nhưng sợ mua về không hiệu quả em ạ 🥲
            </div>
            {step > 2 && (
              <div className="self-end bg-tiktok-pink text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm">
                (Đã xác định Insight: Fear - Sợ không hiệu quả, cần Proof)
              </div>
            )}
            {step > 3 && (
              <div className="self-end bg-tiktok-pink text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm">
                Dạ chị yên tâm, đây là Feedback 100% khách hàng thật nhà em ạ.
              </div>
            )}
            {step > 4 && (
              <div className="self-start bg-gray-800 text-white p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm">
                Thế cho chị 1 đơn về dùng thử nhé!
              </div>
            )}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="q2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-gray-300 text-sm mb-4">Câu 2: Insight chuyển đổi gồm:</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => answer(false, "Sai. Đó không phải gốc rễ của chuyển đổi.", 0, 2)} className="btn-dark p-3 text-sm">Trend – Music – Visual</button>
                <button onClick={() => answer(true, "", 1, 2)} className="btn-light p-3 text-sm">Pain – Fear – Trigger</button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="q13" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-gray-300 text-sm mb-4">Câu 13: Video nhiều view nhưng không có đơn, nguyên nhân chính là:</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => answer(true, "", 2, 13)} className="btn-light p-3 text-sm">Không xử lý fear (Nỗi sợ KH)</button>
                <button onClick={() => answer(false, "Nhiều view là content tốt, nhưng thiếu thuyết phục.", 1, 13)} className="btn-dark p-3 text-sm">Không chạy ads</button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="q11" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-white text-sm mb-4 font-bold border-l-2 border-tiktok-cyan pl-2">Chọn Insight để phản hồi:</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => answer(false, "Sai, họ đang nghi ngờ chất lượng.", 2, 11)} className="btn-dark p-3 text-sm text-left">Pain: thiếu tiền</button>
                <button onClick={() => answer(true, "", 3, 11)} className="btn-light p-3 text-sm text-left border-tiktok-cyan">Fear: không hiệu quả, cần proof</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="q15" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-white text-sm mb-4 font-bold border-l-2 border-tiktok-pink pl-2">Đâu là Proof (Bằng chứng) tốt nhất để gửi cho khách?</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => handlePolicyFail()} className="btn-dark p-3 text-sm text-center border-red-500/50 hover:bg-red-500/20">Ảnh Before/After siêu ảo</button>
                <button onClick={() => answer(true, "", 4, 15)} className="btn-light p-3 text-sm text-center">Feedback khách hàng thật</button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="q14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-white text-sm mb-4 font-bold border-l-2 border-green-400 pl-2">Khách đã chốt! Xài CTA nào hiệu quả nhất để đóng phiên?</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => answer(true, "", 5, 14, 200)} className="bg-green-600 hover:bg-green-500 p-3 text-white rounded-xl text-sm font-bold">Comment "TƯ VẤN" để được hỗ trợ / Mua hàng trong giỏ</button>
                <button onClick={() => answer(false, "CTA yếu, kém kích thích.", 4, 14)} className="btn-dark p-3 text-sm">Xem thêm / Mua ngay</button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
              <h2 className="text-3xl font-bold text-green-400 mb-2">CHỐT ĐƠN THÀNH CÔNG!</h2>
              <p className="text-gray-300 mb-6">Bạn đã xử lý Fear cực kỳ xuất sắc.</p>
              <button 
                onClick={() => { updateStats({ conversionComplete: true }); setGameState('END'); }}
                className="w-full py-4 bg-tiktok-pink text-white font-bold rounded-xl active:scale-95"
              >
                Xem Kết Quả Cuối Cùng
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

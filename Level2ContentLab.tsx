import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const scriptCards = [
  { id: '1', content: 'Problem', label: 'Nêu Vấn đề' },
  { id: '0', content: 'Hook', label: 'Hook (Thu hút)' },
  { id: '4', content: 'CTA', label: 'Kêu gọi hành động' },
  { id: '3', content: 'Proof', label: 'Bằng chứng (Feedback)' },
  { id: '2', content: 'Solution', label: 'Giải pháp' },
];

export const Level2ContentLab: React.FC = () => {
  const { stats, updateStats, setGameState, playDing, playSwoosh, showExplanation } = useGame();
  
  const [step, setStep] = useState(0); // 0 = Q3, 1 = Q12 (Timed), 2 = Q4 (DND), 3 = Q16
  const [timeLeft, setTimeLeft] = useState(3);
  const [swipeUp, setSwipeUp] = useState(false);
  const [cards, setCards] = useState(scriptCards);
  const [dndError, setDndError] = useState('');

  // Timer for Step 1
  useEffect(() => {
    if (step === 1 && !swipeUp) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        // Timeout Triggered
        handleTimeout();
      }
    }
  }, [step, timeLeft, swipeUp]);

  const handleTimeout = () => {
    setSwipeUp(true);
    playSwoosh();
    updateStats({ retentionRate: stats.retentionRate - 20 });
    // Show toast / explanation
    setTimeout(() => {
      showExplanation(12, "Nội dung không đủ hấp dẫn - Người xem đã lướt qua! Bạn có 3 giây để giữ chân họ bàng một Hook mạnh mẽ.");
      setStep(2); // move to next
      setSwipeUp(false);
    }, 1500);
  };

  const handleQ3 = (correct: boolean) => {
    if (correct) { playDing(); updateStats({ xp: stats.xp + 100 }); }
    else { playSwoosh(); showExplanation(3, "Người xem quyết định xem tiếp hay lướt qua trong 1-3 giây đầu tiên."); }
    setStep(1);
    setTimeLeft(3); // start timer for Q12
  };

  const handleQ12 = (correct: boolean) => {
    if (correct) {
      playDing();
      updateStats({ xp: stats.xp + 100 });
      showExplanation(12, "Đúng! Đánh trúng nỗi đau đám đông ('90% người đang sai...') là cách giữ chân hiệu quả nhất.");
      setStep(2);
    } else {
      handleTimeout(); // Treat wrong choice as failure swipe
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newCards = Array.from(cards);
    const [reorderedItem] = newCards.splice(result.source.index, 1);
    newCards.splice(result.destination.index, 0, reorderedItem);
    setCards(newCards);
    setDndError('');
  };

  const submitDND = () => {
    // Check order: Hook(0) -> Problem(1) -> Solution(2) -> Proof(3) -> CTA(4)
    const currentOrder = cards.map(c => c.content);
    const proofIndex = currentOrder.indexOf('Proof');
    const problemIndex = currentOrder.indexOf('Problem');

    if (proofIndex < problemIndex) {
      setDndError("Khách hàng chưa thấy vấn đề, bằng chứng này vô nghĩa!");
      playSwoosh();
      return;
    }

    const correctOrder = ['Hook', 'Problem', 'Solution', 'Proof', 'CTA'];
    const isCorrect = correctOrder.every((val, index) => val === currentOrder[index]);

    if (isCorrect) {
      playDing();
      updateStats({ xp: stats.xp + 200 });
      setStep(3);
    } else {
      setDndError("Thứ tự chưa chính xác. Hãy sắp xếp lại: Hook -> Problem -> Solution -> Proof -> CTA.");
      playSwoosh();
    }
  };

  const handleQ16 = (correct: boolean) => {
    if (correct) { playDing(); updateStats({ xp: stats.xp + 100 }); }
    else { playSwoosh(); showExplanation(16, "Video kẹt view thường do Completion rate (Tỷ lệ xem hết video) thấp."); }
    setGameState('L3_CONVERSION');
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <AnimatePresence>
        {swipeUp && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-black z-40 flex items-center justify-center pointer-events-none"
          >
            <div className="text-white text-2xl font-bold">Lướt qua!</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-sm bg-tiktok-black border border-tiktok-gray p-6 rounded-2xl shadow-xl z-20 overflow-y-auto">
        <div className="text-tiktok-cyan font-bold text-sm mb-4">
          GIAI ĐOẠN 2: THE CONTENT LAB
        </div>

        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-bold text-white mb-6">Vì sao video phải "đúng ngay từ đầu"?</h2>
            <div className="flex flex-col gap-3">
              <button onClick={() => handleQ3(false)} className="btn-dark">Do chi phí cao</button>
              <button onClick={() => handleQ3(true)} className="btn-dark">Người xem quyết định trong 1–3 giây</button>
              <button onClick={() => handleQ3(false)} className="btn-dark">TikTok chỉ xét 3 giây đầu</button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white text-red-500">CHỌN HOT HOOK (Còn {timeLeft}s)</h2>
              <div className="text-3xl font-bold text-red-500 animate-pulse">{timeLeft}</div>
            </div>
            <p className="text-gray-300 mb-6">Hook nào hiệu quả nhất để giữ chân?</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => handleQ12(false)} className="btn-dark">"Sản phẩm này rất tốt"</button>
              <button onClick={() => handleQ12(true)} className="btn-dark">"90% người đang sai ở bước này..."</button>
              <button onClick={() => handleQ12(false)} className="btn-dark">"Hôm nay review..."</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-lg font-bold text-white mb-2">Sắp xếp Kịch Bản (Kéo thả)</h2>
            <p className="text-sm text-gray-400 mb-4">Hãy sắp xếp theo đúng cấu trúc tối ưu (Hook, Problem...)</p>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="scriptList">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-2 mb-4">
                    {cards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-800 p-3 rounded-lg text-white border border-gray-700 flex items-center justify-between"
                          >
                            <span>{index + 1}. {card.label}</span>
                            <span className="text-gray-500 text-xl">≡</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            
            {dndError && <div className="text-red-400 text-sm mb-4 font-bold bg-red-900/30 p-2 rounded">{dndError}</div>}
            
            <button onClick={submitDND} className="w-full py-3 bg-tiktok-pink text-white font-bold rounded-xl mt-2">
              Hoàn thành Kịch Bản
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-bold text-white mb-6">Video bị "kẹt view" thường do:</h2>
            <div className="flex flex-col gap-3">
              <button onClick={() => handleQ16(false)} className="btn-dark">Thiếu follower</button>
              <button onClick={() => handleQ16(true)} className="btn-dark">Completion rate thấp</button>
              <button onClick={() => handleQ16(false)} className="btn-dark">Không chạy ads</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useGame } from '../context/GameStateContext';
import { level1Questions, Answer } from '../data/questions';
import { motion } from 'framer-motion';

export const Level1Mindset: React.FC = () => {
  const { stats, updateStats, setGameState, playDing, playSwoosh, showExplanation } = useGame();
  const [currentIdx, setCurrentIdx] = useState(0);

  const question = level1Questions[currentIdx];

  const handleAnswer = (answer: Answer) => {
    if (answer.isCorrect) {
      playDing();
      updateStats({ xp: stats.xp + 100 });
      nextQuestion();
    } else {
      playSwoosh();
      showExplanation(question.id, question.explanation);
      // Wait for user to close modal, but we can advance question anyway or wait.
      // Easiest is to wait. But the showExplanation sets higher priority state. We'll advance when explanation is closed? 
      // Actually, we can just let them retry or automatically move to next. The prompt says "Thêm Modal... giải thích sau mỗi câu trả lời sai... Nút 'Học nhanh' xuất hiện ngay trên màn hình kết quả câu hỏi".
      // Let's implement such that if wrong, they see modal, then move to next. For now, move to next and modal pops up.
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    if (currentIdx < level1Questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setGameState('L2_CONTENT');
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-tiktok-darkgray relative overflow-hidden">
      <motion.div 
        key={currentIdx}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        className="w-full max-w-sm bg-tiktok-black border border-tiktok-gray p-6 rounded-2xl shadow-xl z-20"
      >
        <div className="text-tiktok-cyan font-bold text-sm mb-2">
          GIAI ĐOẠN 1: PROFILE SETUP
        </div>
        <h2 className="text-xl font-bold text-white mb-6 leading-relaxed">
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {question.answers.map((ans) => (
            <button
              key={ans.id}
              onClick={() => handleAnswer(ans)}
              className="w-full text-left p-4 rounded-xl bg-gray-800 hover:bg-tiktok-pink/20 hover:border-tiktok-pink border border-transparent transition-all active:scale-95 text-gray-200"
            >
              {ans.text}
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          Tiến trình: {currentIdx + 1} / {level1Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

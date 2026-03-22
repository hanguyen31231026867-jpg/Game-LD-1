import React from 'react';
import { useGame } from '../context/GameStateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X } from 'lucide-react';

export const FeedbackModal: React.FC = () => {
  const { explanation, hideExplanation } = useGame();

  return (
    <AnimatePresence>
      {explanation.visible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gray-900 border border-tiktok-gray rounded-2xl p-6 w-full max-w-sm shadow-2xl relative"
          >
            <button 
              onClick={hideExplanation}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-tiktok-pink/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-tiktok-pink" />
              </div>
              <h3 className="text-xl font-bold text-white">Học Nhanh (L&D)</h3>
            </div>
            
            <p className="text-gray-200 mb-6 leading-relaxed">
              {explanation.text}
            </p>
            
            <button 
              onClick={hideExplanation}
              className="w-full py-3 rounded-xl bg-tiktok-cyan text-black font-bold text-lg hover:brightness-110 transition-all active:scale-95"
            >
              Đã Hiểu & Tiếp Tục
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

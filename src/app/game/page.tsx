'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '@/data/questions';

export default function Game() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isRuleCard, setIsRuleCard] = useState(true);

    const goToNextQuestion = () => {
        if (isRuleCard) {
            setIsRuleCard(false);
            setDirection(1);
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setDirection(1);
        }
    };

    const goToPreviousQuestion = () => {
        if (!isRuleCard && currentQuestionIndex === 0) {
            setIsRuleCard(true);
            setDirection(-1);
            return;
        }

        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setDirection(-1);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => goToNextQuestion(),
        onSwipedRight: () => goToPreviousQuestion(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: false
    });

    const variants = {
        enter: (direction) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => {
            return {
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 pb-24 bg-gradient-to-b from-indigo-100 to-purple-100">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-indigo-800">Questions</h1>
                {!isRuleCard && (
                    <p className="mt-2 text-gray-600">
                        質問 {currentQuestionIndex + 1} / {questions.length}
                    </p>
                )}
            </div>

            <div
                {...swipeHandlers}
                className="w-full max-w-md"
            >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={isRuleCard ? 'rules' : currentQuestionIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="p-6 bg-white rounded-xl shadow-lg"
                        style={{ minHeight: '200px' }}
                    >
                        {isRuleCard ? (
                            <div>
                                <h2 className="mb-4 text-xl font-semibold text-indigo-700">ルール</h2>
                                <ul className="ml-5 list-disc text-gray-700">
                                    <li className="mb-2">1題ずつ、交代に質問を読みあげる</li>
                                    <li className="mb-2">質問を読み上げた方が、先に回答。その後に、もう1人が回答する</li>
                                    <li className="mb-2">質問を飛ばしてはならない</li>
                                </ul>
                                <div className="mt-6 text-sm text-center text-gray-500">
                                    右にスワイプして質問を始める
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="mb-4 text-xl font-semibold text-indigo-700">Q{currentQuestionIndex + 1}</h2>
                                <p className="text-xl font-medium text-gray-800">{questions[currentQuestionIndex]}</p>
                                <div className="flex justify-between mt-6 text-sm text-gray-500">
                                    <span>← 前の質問</span>
                                    <span>次の質問 →</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 bg-white bg-opacity-90 border-t border-gray-200 shadow-lg">
                <div className="flex space-x-4 max-w-md w-full">
                    <button
                        onClick={goToPreviousQuestion}
                        disabled={isRuleCard && currentQuestionIndex === 0}
                        className="w-1/2 px-4 py-3 text-indigo-600 transition-colors duration-300 bg-white rounded-lg shadow hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        前へ
                    </button>
                    <button
                        onClick={goToNextQuestion}
                        disabled={!isRuleCard && currentQuestionIndex === questions.length - 1}
                        className="w-1/2 px-4 py-3 text-white transition-colors duration-300 bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        次へ
                    </button>
                </div>
            </div>
        </div>
    );
}
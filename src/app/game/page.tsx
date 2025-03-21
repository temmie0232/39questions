'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '@/data/questions';
import Link from 'next/link';

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
        preventScrollOnSwipe: true,
        trackMouse: false
    });

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 pb-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <motion.div
                className="flex items-center justify-between w-full max-w-md mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/" className="flex items-center text-indigo-600 transition-colors hover:text-indigo-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 111.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    ホームへ
                </Link>

                {!isRuleCard && (
                    <div className="flex items-center justify-center px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
                        {currentQuestionIndex + 1} / {questions.length}
                    </div>
                )}
            </motion.div>

            <div
                {...swipeHandlers}
                className="w-full max-w-md perspective"
            >
                <div className="relative" style={{ minHeight: '280px' }}>
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
                            className="absolute inset-0 p-8 bg-white rounded-2xl shadow-lg shadow-indigo-100/50 border border-indigo-50"
                        >
                            {isRuleCard ? (
                                <div>
                                    <h2 className="mb-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">ルール</h2>
                                    <ul className="space-y-4 text-gray-700">
                                        <li className="flex items-center">
                                            <span className="flex items-center justify-center w-6 h-6 mr-3 text-xs font-bold text-white bg-indigo-600 rounded-full">1</span>
                                            1題ずつ、交代に質問を読みあげる
                                        </li>
                                        <li className="flex items-center">
                                            <span className="flex items-center justify-center w-6 h-6 mr-3 text-xs font-bold text-white bg-indigo-600 rounded-full">2</span>
                                            質問を読み上げた方が、先に回答。その後に、もう1人が回答する
                                        </li>
                                        <li className="flex items-center">
                                            <span className="flex items-center justify-center w-6 h-6 mr-3 text-xs font-bold text-white bg-indigo-600 rounded-full">3</span>
                                            質問を飛ばしてはならない
                                        </li>
                                    </ul>
                                    <motion.div
                                        className="flex items-center justify-center mt-8 text-sm text-indigo-500"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        スライドして質問を始める
                                    </motion.div>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center mb-6">
                                        <span className="inline-flex items-center justify-center w-8 h-8 mr-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
                                            {currentQuestionIndex + 1}
                                        </span>
                                        <div className="h-px flex-grow bg-gradient-to-r from-indigo-200 to-purple-200"></div>
                                    </div>
                                    <p className="flex-grow text-xl font-medium leading-relaxed text-gray-800">
                                        {questions[currentQuestionIndex]}
                                    </p>
                                    <div className="flex justify-between mt-6 text-sm text-indigo-500">
                                        <motion.span
                                            whileHover={{ x: -3 }}
                                            className="flex items-center cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            前の質問
                                        </motion.span>
                                        <motion.span
                                            whileHover={{ x: 3 }}
                                            className="flex items-center cursor-pointer"
                                        >
                                            次の質問
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </motion.span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 py-5 bg-white border-t border-indigo-100 shadow-lg">
                <div className="flex justify-center px-4 mx-auto max-w-md">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={goToPreviousQuestion}
                        disabled={isRuleCard && currentQuestionIndex === 0}
                        className="w-1/2 px-6 py-3 mr-3 font-medium text-indigo-600 transition-all duration-300 bg-indigo-50 rounded-xl hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        前へ
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={goToNextQuestion}
                        disabled={!isRuleCard && currentQuestionIndex === questions.length - 1}
                        className="w-1/2 px-6 py-3 font-medium text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        次へ
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
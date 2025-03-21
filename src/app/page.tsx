"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-2 text-5xl font-bold text-center text-indigo-900">
          <span className="inline-block">36</span>
          <span className="inline-block ml-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Questions</span>
        </h1>
        <p className="mb-12 text-lg text-center text-indigo-700/80 max-w-md">
          やってみよ
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/game"
            className="px-8 py-4 text-lg font-medium text-white transition-all duration-300 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            始める
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 text-sm text-center text-indigo-500/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        心理学者が作った質問リスト
      </motion.div>
    </div>
  );
}
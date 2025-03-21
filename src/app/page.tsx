import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-indigo-100 to-purple-100">
      <h1 className="mb-8 text-3xl font-bold text-center text-indigo-800">36の質問ゲーム</h1>
      <p className="mb-6 text-center text-gray-700">
        このゲームは、二人の人が互いをより深く知るための36の質問に答えていくものです。
        研究によると、これらの質問に誠実に答えることで、親密さが増すと言われています。
      </p>
      <Link
        href="/game"
        className="px-6 py-3 text-lg font-medium text-white transition-colors duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        ゲームを始める
      </Link>
    </div>
  );
}
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { api, formatTimestamp } from '../../lib/scan-api';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface Block {
  blockNumber: string;
  timeStamp: string;
  blockMiner: string;
  blockReward: string;
  uncleInclusionRewards: string;
  uncles: string[];
}

export default function BlocksPage() {
  const [currentBlock, setCurrentBlock] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = async () => {
    try {
      const block = await api.getBlockNumber();
      setCurrentBlock(block);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  // 生成最近 20 个区块的模拟列表
  const blocks = currentBlock > 0
    ? Array.from({ length: 20 }, (_, i) => currentBlock - i).filter(n => n > 0)
    : [];

  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>区块列表 | XUL Chain Scanner</title>
      </Head>

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>返回首页</span>
            </Link>
            <span className="text-slate-600">|</span>
            <h1 className="text-white font-semibold">区块列表</h1>
          </div>
          <button
            onClick={() => { setRefreshing(true); fetchData(); }}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm">刷新</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 text-sm">
              最新区块: <span className="text-white font-mono font-bold">#{currentBlock.toLocaleString()}</span>
            </span>
            <span className="text-slate-500 text-xs">每 15 秒自动刷新</span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500">加载中...</div>
          ) : (
            <div className="divide-y divide-slate-800">
              {blocks.map((blockNum) => (
                <div key={blockNum} className="flex items-center justify-between px-6 py-4 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 text-xs font-bold">BK</span>
                    </div>
                    <div>
                      <a
                        href={`https://scan.rswl.ai/block/${blockNum}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-mono font-medium"
                      >
                        #{blockNum.toLocaleString()}
                      </a>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {blockNum === currentBlock ? '最新区块' : `${currentBlock - blockNum} 个区块前`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <a
                      href={`https://scan.rswl.ai/block/${blockNum}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-white px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      在 scan.rswl.ai 查看 →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

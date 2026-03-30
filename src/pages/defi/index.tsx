import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Droplets, ArrowRightLeft, ExternalLink } from 'lucide-react';

const POOLS = [
  { pair: 'XUL / USDT', address: '0x9466113e4b78b66FB2863e1C36670D47EA276Ca9', tvl: 'TBD', apy: 'TBD', volume24h: 'TBD', fee: '0.3%' },
  { pair: 'XUL / USDC', address: '0x9466113e4b78b66FB2863e1C36670D47EA276Ca9', tvl: 'TBD', apy: 'TBD', volume24h: 'TBD', fee: '0.3%' },
  { pair: 'XUL / WBTC', address: '0x9466113e4b78b66FB2863e1C36670D47EA276Ca9', tvl: 'TBD', apy: 'TBD', volume24h: 'TBD', fee: '0.3%' },
  { pair: 'XUL / WETH', address: '0x9466113e4b78b66FB2863e1C36670D47EA276Ca9', tvl: 'TBD', apy: 'TBD', volume24h: 'TBD', fee: '0.3%' },
];

export default function DeFiPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>DeFi 仪表板 | XUL Chain Scanner</title>
      </Head>

      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>
          <span className="text-slate-600">|</span>
          <h1 className="text-white font-semibold">DeFi 仪表板</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { title: '总锁定价值 (TVL)', value: '统计中...', icon: <Droplets className="w-6 h-6" />, color: 'text-blue-400' },
            { title: '24h 交易量', value: '统计中...', icon: <ArrowRightLeft className="w-6 h-6" />, color: 'text-green-400' },
            { title: '流动性池数量', value: `${POOLS.length} 个`, icon: <TrendingUp className="w-6 h-6" />, color: 'text-purple-400' },
          ].map((stat) => (
            <div key={stat.title} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 bg-slate-800 rounded-lg ${stat.color}`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 流动性池列表 */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">流动性池</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-6 py-3 text-slate-400 text-sm font-medium">交易对</th>
                  <th className="text-right px-6 py-3 text-slate-400 text-sm font-medium">TVL</th>
                  <th className="text-right px-6 py-3 text-slate-400 text-sm font-medium">APY</th>
                  <th className="text-right px-6 py-3 text-slate-400 text-sm font-medium">24h 交易量</th>
                  <th className="text-right px-6 py-3 text-slate-400 text-sm font-medium">手续费</th>
                  <th className="text-right px-6 py-3 text-slate-400 text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {POOLS.map((pool) => (
                  <tr key={pool.pair} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">X</div>
                          <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">U</div>
                        </div>
                        <span className="text-white font-medium">{pool.pair}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400">{pool.tvl}</td>
                    <td className="px-6 py-4 text-right text-green-400">{pool.apy}</td>
                    <td className="px-6 py-4 text-right text-slate-400">{pool.volume24h}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">{pool.fee}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`https://scan.rswl.ai/address/${pool.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">TVL 和交易量数据正在接入中，敬请期待 🚀</p>
          </div>
        </div>
      </main>
    </div>
  );
}

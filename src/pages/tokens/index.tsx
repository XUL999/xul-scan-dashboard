import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';

const OFFICIAL_TOKENS = [
  { name: 'WXULV2', symbol: 'WXUL', address: '0x3111Baf82B89becc5B636d10fdeA1d2697F209F4', type: 'Wrapped Native', verified: true },
  { name: 'Wrapped USDT', symbol: 'WUSDT', address: '0x79be35563947b6D194b3f0A22c6D4a10F7Cba5B8', type: 'Stablecoin', verified: true },
  { name: 'Wrapped USDC', symbol: 'WUSDC', address: '0x41Bf8fACF9af7aB03EF4dbeD5239699d2FB2a6b8', type: 'Stablecoin', verified: true },
  { name: 'Wrapped BTC', symbol: 'WBTC', address: '0x1A39DB2188Bf238293BE9c4706C0119cA271266f', type: 'Wrapped', verified: true },
  { name: 'Wrapped ETH', symbol: 'WETH', address: '0x3dE47F28888D90BACcD7f40D068653104A60B70F', type: 'Wrapped', verified: true },
];

const TYPE_COLORS: Record<string, string> = {
  'Wrapped Native': 'bg-blue-500/20 text-blue-400',
  'Stablecoin': 'bg-green-500/20 text-green-400',
  'Wrapped': 'bg-purple-500/20 text-purple-400',
};

export default function TokensPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>代币列表 | XUL Chain Scanner</title>
      </Head>

      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>
          <span className="text-slate-600">|</span>
          <h1 className="text-white font-semibold">官方代币列表</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800">
            <p className="text-slate-400 text-sm">共 {OFFICIAL_TOKENS.length} 个官方代币</p>
          </div>
          <div className="divide-y divide-slate-800">
            {OFFICIAL_TOKENS.map((token) => (
              <div key={token.address} className="flex items-center justify-between px-6 py-4 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{token.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{token.name}</span>
                      <span className="text-slate-500 text-sm">({token.symbol})</span>
                      {token.verified && (
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <p className="text-slate-500 text-xs font-mono mt-0.5">{token.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${TYPE_COLORS[token.type] || 'bg-slate-700 text-slate-400'}`}>
                    {token.type}
                  </span>
                  <a
                    href={`https://scan.rswl.ai/token/${token.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

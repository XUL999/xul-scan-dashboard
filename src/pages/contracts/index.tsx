import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle, Shield } from 'lucide-react';

const OFFICIAL_CONTRACTS = [
  { name: 'WXULV2', address: '0x3111Baf82B89becc5B636d10fdeA1d2697F209F4', category: 'Token', audited: true, desc: '升级版包装 XUL 代币' },
  { name: 'XULSwapFactoryV2', address: '0x9466113e4b78b66FB2863e1C36670D47EA276Ca9', category: 'DEX', audited: true, desc: 'V2 交易对工厂合约' },
  { name: 'XULSwapRouterV2', address: '0x1AAdFfA792e71D1e75FB61CA53E6949352B5e18B', category: 'DEX', audited: true, desc: 'V2 路由合约，支持多跳交易' },
  { name: 'X402PaymentProcessorV2', address: '0x1D754Fb5A8D1db7B83DDb2D6Fb8fD1365C8A6263', category: 'Payment', audited: true, desc: 'X402 支付协议 V2' },
  { name: 'WXUL', address: '0xf6c896656d8f05dC287187749ccEE04FE5589275', category: 'Token', audited: false, desc: '原版包装 XUL 代币 (V1)' },
  { name: 'XULSwapFactory', address: '0x0A7e1C43582D9b617360F279105Febb9236664A9', category: 'DEX', audited: false, desc: 'V1 交易对工厂合约' },
  { name: 'XULSwapRouter', address: '0x9fE62F9F607feFA5806b8B36D174550Aa755917d', category: 'DEX', audited: false, desc: 'V1 路由合约' },
  { name: 'XULSmartWallet', address: '0x47887c4b47E9CE70d38B58207073b286fDb34C86', category: 'AI', audited: false, desc: 'ERC-4337 智能钱包' },
  { name: 'XULAIAgentRegistry', address: '0xa1cD6f5547106903f24E1D69ADE4e9fc45E9c5f4', category: 'AI', audited: false, desc: 'AI Agent 注册表' },
  { name: 'XULzkMLVerifier', address: '0x3477b6D7694a482117f21adD3eA5460b9f3Cc0e8', category: 'AI', audited: false, desc: 'zkML 验证器' },
  { name: 'XULDePIN', address: '0x060e5a6c96B8D78bF4Ac6eF0c03cBfa8B944D8ec', category: 'DePIN', audited: false, desc: 'DePIN 设备注册' },
  { name: 'XULTranslator', address: '0xA0E46D446ae01f0E32b327cB4ef928aB7b339A5b', category: 'Utility', audited: false, desc: '15语言链上翻译器' },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Token': 'bg-blue-500/20 text-blue-400',
  'DEX': 'bg-green-500/20 text-green-400',
  'Payment': 'bg-yellow-500/20 text-yellow-400',
  'AI': 'bg-purple-500/20 text-purple-400',
  'DePIN': 'bg-orange-500/20 text-orange-400',
  'Utility': 'bg-slate-500/20 text-slate-400',
};

export default function ContractsPage() {
  const [filter, setFilter] = React.useState('All');
  const categories = ['All', 'Token', 'DEX', 'Payment', 'AI', 'DePIN', 'Utility'];
  const filtered = filter === 'All' ? OFFICIAL_CONTRACTS : OFFICIAL_CONTRACTS.filter(c => c.category === filter);

  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>合约列表 | XUL Chain Scanner</title>
      </Head>

      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>
          <span className="text-slate-600">|</span>
          <h1 className="text-white font-semibold">官方合约列表</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 分类过滤 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <p className="text-slate-400 text-sm">显示 {filtered.length} / {OFFICIAL_CONTRACTS.length} 个合约</p>
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <span className="flex items-center space-x-1"><Shield className="w-3 h-3 text-green-400" /><span>已审计</span></span>
              <span className="flex items-center space-x-1"><CheckCircle className="w-3 h-3 text-blue-400" /><span>官方</span></span>
            </div>
          </div>
          <div className="divide-y divide-slate-800">
            {filtered.map((contract) => (
              <div key={contract.address} className="flex items-center justify-between px-6 py-4 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center space-y-1">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    {contract.audited && <Shield className="w-4 h-4 text-green-400" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{contract.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[contract.category]}`}>
                        {contract.category}
                      </span>
                      {contract.audited && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                          ✓ 已审计
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs font-mono mt-0.5">{contract.address}</p>
                    <p className="text-slate-600 text-xs mt-0.5">{contract.desc}</p>
                  </div>
                </div>
                <a
                  href={`https://scan.rswl.ai/address/${contract.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors ml-4 flex-shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import Head from 'next/head';
import OverviewStats from '../components/StatsCards';
import TransactionList from '../components/TransactionList';
import { Search, Menu, X } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/address/${searchQuery.trim()}`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>XUL Chain Scanner | 增强型区块浏览器</title>
        <meta name="description" content="XUL Chain 增强型区块浏览器 - 交易追踪、合约分析、DeFi 仪表板" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">X</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">XUL Scan</h1>
                <p className="text-xs text-slate-400">增强型区块浏览器</p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索地址、交易哈希、代币..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 pl-11 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
              </div>
            </form>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-white hover:text-blue-400 transition-colors font-medium">首页</a>
              <a href="/blocks" className="text-slate-400 hover:text-white transition-colors">区块</a>
              <a href="/transactions" className="text-slate-400 hover:text-white transition-colors">交易</a>
              <a href="/tokens" className="text-slate-400 hover:text-white transition-colors">代币</a>
              <a href="/contracts" className="text-slate-400 hover:text-white transition-colors">合约</a>
              <a href="/defi" className="text-slate-400 hover:text-white transition-colors">DeFi</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800">
            <form onSubmit={handleSearch} className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索地址、交易哈希..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 pl-11 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
              </div>
            </form>
            <nav className="px-4 pb-4 space-y-2">
              <a href="/" className="block text-white hover:bg-slate-800 px-4 py-2 rounded-lg">首页</a>
              <a href="/blocks" className="block text-slate-400 hover:bg-slate-800 px-4 py-2 rounded-lg">区块</a>
              <a href="/transactions" className="block text-slate-400 hover:bg-slate-800 px-4 py-2 rounded-lg">交易</a>
              <a href="/tokens" className="block text-slate-400 hover:bg-slate-800 px-4 py-2 rounded-lg">代币</a>
              <a href="/contracts" className="block text-slate-400 hover:bg-slate-800 px-4 py-2 rounded-lg">合约</a>
              <a href="/defi" className="block text-slate-400 hover:bg-slate-800 px-4 py-2 rounded-lg">DeFi</a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl p-6 mb-8 border border-blue-500/20">
          <h2 className="text-2xl font-bold text-white mb-2">
            欢迎使用 XUL Chain 增强型扫描器
          </h2>
          <p className="text-slate-400">
            实时追踪交易、分析合约、监控 DeFi 生态 - 基于 scan.rswl.ai API 构建
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a 
              href="https://pro.rswl.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              连接 RPC
            </a>
            <a 
              href="https://discord.gg/kkwqHEgu8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              加入社区
            </a>
          </div>
        </div>

        {/* Stats Overview */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">网络概览</h3>
          <OverviewStats />
        </section>

        {/* Latest Transactions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">最新交易</h3>
            <a 
              href="/transactions" 
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              查看全部 →
            </a>
          </div>
          <TransactionList limit={10} />
        </section>

        {/* Quick Links */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold text-white mb-4">官方合约</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'WXULV2', address: '0x3111Baf82B89becc5B636d10fdeA1d2697F209F4', type: 'Token' },
              { name: 'XULSwapFactoryV2', address: '0x9466113e4b78b66FB2863e1C36670D47EA276Ca9', type: 'DEX' },
              { name: 'XULSwapRouterV2', address: '0x1AAdFfA792e71D1e75FB61CA53E6949352B5e18B', type: 'DEX' },
              { name: 'X402PaymentProcessorV2', address: '0x1D754Fb5A8D1db7B83DDb2D6Fb8fD1365C8A6263', type: 'Payment' },
              { name: 'WUSDT', address: '0x79be35563947b6D194b3f0A22c6D4a10F7Cba5B8', type: 'Token' },
              { name: 'WUSDC', address: '0x41Bf8fACF9af7aB03EF4dbeD5239699d2FB2a6b8', type: 'Token' },
            ].map((contract) => (
              <div 
                key={contract.address}
                className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{contract.name}</span>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                    {contract.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono break-all">
                  {contract.address}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">X</span>
              </div>
              <span className="text-slate-400">XUL Chain Scanner</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <a href="#" className="hover:text-white transition-colors">文档</a>
              <a href="#" className="hover:text-white transition-colors">API</a>
              <a href="#" className="hover:text-white transition-colors">支持</a>
              <span>Powered by scan.rswl.ai</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import TransactionList from '../../components/TransactionList';
import { ArrowLeft } from 'lucide-react';

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Head>
        <title>交易列表 | XUL Chain Scanner</title>
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
            <h1 className="text-white font-semibold">交易列表</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <TransactionList limit={50} />
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import { ExternalLink, ArrowUpRight, ArrowDownLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { api, formatAddress, formatBalance, formatTimestamp, getContractInfo } from '../lib/scan-api';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  timeStamp: string;
  isError: string;
  txreceipt_status: string;
  contractAddress?: string;
}

interface TransactionListProps {
  address?: string;
  limit?: number;
}

export const TransactionList: React.FC<TransactionListProps> = ({ address, limit = 20 }) => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTxs = async () => {
      try {
        const txs = address 
          ? await api.getTransactions(address, limit)
          : await api.getTransactions('0xC2F803f72033210718dbF150301b5A88Bb2C12CC', limit);
        setTransactions(txs.slice(0, limit));
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTxs();
  }, [address, limit]);

  const getTxType = (tx: Transaction) => {
    if (tx.contractAddress && !tx.to) return 'CREATE';
    if (tx.to === '0x') return 'CREATE';
    if (tx.value && tx.value !== '0') return 'TRANSFER';
    return 'CALL';
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-slate-800/50 rounded-lg p-4 animate-pulse">
            <div className="flex justify-between">
              <div className="h-4 bg-slate-700 rounded w-32"></div>
              <div className="h-4 bg-slate-700 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => {
        const txType = getTxType(tx);
        const isError = tx.isError === '1' || tx.txreceipt_status === '0';
        const fromInfo = getContractInfo(tx.from);
        const toInfo = tx.to ? getContractInfo(tx.to) : null;
        
        return (
          <div 
            key={tx.hash}
            className="bg-slate-800/50 hover:bg-slate-800 rounded-lg p-4 transition-colors border border-slate-700/50 hover:border-slate-600"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${txType === 'TRANSFER' ? 'bg-blue-500/20 text-blue-400' : txType === 'CREATE' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-700 text-slate-400'}`}>
                  {txType === 'TRANSFER' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${txType === 'TRANSFER' ? 'bg-blue-500/20 text-blue-400' : txType === 'CREATE' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-700 text-slate-400'}`}>
                      {txType}
                    </span>
                    {isError ? (
                      <span className="flex items-center text-xs text-red-400">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Failed
                      </span>
                    ) : (
                      <span className="flex items-center text-xs text-green-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Success
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-slate-300 mt-1">
                    {formatAddress(tx.hash, 10, 8)}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {formatBalance(tx.value)} XUL
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {formatTimestamp(parseInt(tx.timeStamp))}
                </p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-700/50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500">From:</span>
                  <span className={`font-mono ${fromInfo.verified ? 'text-blue-400' : 'text-slate-400'}`}>
                    {formatAddress(tx.from)}
                  </span>
                  {fromInfo.verified && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">
                      {fromInfo.name}
                    </span>
                  )}
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600" />
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500">To:</span>
                  <span className={`font-mono ${toInfo?.verified ? 'text-blue-400' : 'text-slate-400'}`}>
                    {tx.to ? formatAddress(tx.to) : '(Contract Creation)'}
                  </span>
                  {toInfo?.verified && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">
                      {toInfo.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Gas: {formatBalance(tx.gasUsed, 0)}</span>
              <a 
                href={`${api.baseUrl}/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300"
              >
                View Details <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;

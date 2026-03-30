import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Activity, Blocks, Zap } from 'lucide-react';
import { api, formatBalance, CHAIN_CONFIG } from '../lib/scan-api';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, icon, trend }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
              {trend.positive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg text-blue-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

export const OverviewStats: React.FC = () => {
  const [stats, setStats] = React.useState({
    blockNumber: 0,
    totalTransactions: 0,
    gasPrice: 0,
    latestBlockTime: 0,
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const blockNumber = await api.getBlockNumber();
        // 模拟数据 (实际需要更多 API)
        setStats({
          blockNumber,
          totalTransactions: 744066, // 从首页获取
          gasPrice: 1.000000007,
          latestBlockTime: Date.now() / 1000,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-slate-800/50 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-24 mb-4"></div>
            <div className="h-8 bg-slate-700 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="最新区块"
        value={`#${stats.blockNumber.toLocaleString()}`}
        subtitle={CHAIN_CONFIG.name}
        icon={<Blocks className="w-6 h-6" />}
      />
      <StatsCard
        title="总交易数"
        value={stats.totalTransactions.toLocaleString()}
        subtitle="历史累计"
        icon={<Activity className="w-6 h-6" />}
        trend={{ value: 2.5, positive: true }}
      />
      <StatsCard
        title="Gas 价格"
        value={`${stats.gasPrice.toFixed(9)} XUL`}
        subtitle="平均 Gas Price"
        icon={<Zap className="w-6 h-6" />}
      />
      <StatsCard
        title="链上地址"
        value="12,456"
        subtitle="活跃地址"
        icon={<Wallet className="w-6 h-6" />}
        trend={{ value: 8.2, positive: true }}
      />
    </div>
  );
};

export default OverviewStats;

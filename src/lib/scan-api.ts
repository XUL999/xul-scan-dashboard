// XUL Chain Scanner API 封装
const BASE_URL = 'https://scan.rswl.ai/api';

// Chain 配置
export const CHAIN_CONFIG = {
  id: 12309,
  name: 'XUL Chain',
  symbol: 'XUL',
  rpc: 'https://pro.rswl.ai',
  explorer: 'https://scan.rswl.ai',
};

// 官方合约地址 (大写)
export const OFFICIAL_CONTRACTS: Record<string, { name: string; category: string }> = {
  '0X3111BAF82B89BECC5B636D10FDEA1D2697F209F4': { name: 'WXULV2', category: 'Token' },
  '0X9466113E4B78B66FB2863E1C36670D47EA276CA9': { name: 'XULSwapFactoryV2', category: 'DEX' },
  '0X1AADFFA792E71D1E75FB61CA53E6949352B5E18B': { name: 'XULSwapRouterV2', category: 'DEX' },
  '0X1D754FB5A8D1DB7B83DDB2D6FB8FD1365C8A6263': { name: 'X402PaymentProcessorV2', category: 'Payment' },
  '0XF6C896656D8F05DC287187749CCEE04FE5589275': { name: 'WXUL', category: 'Token' },
  '0X79BE35563947B6D194B3F0A22C6D4A10F7CBA5B8': { name: 'WUSDT', category: 'Token' },
  '0X41BF8FACF9AF7AB03EF4DBED5239699D2FB2A6B8': { name: 'WUSDC', category: 'Token' },
  '0X1A39DB2188BF238293BE9C4706C0119CA271266F': { name: 'WBTC', category: 'Token' },
  '0X3DE47F28888D90BACD7F40D068653104A60B70F': { name: 'WETH', category: 'Token' },
  '0XC2F803F72033210718DBF150301B5A88BB2C12CC': { name: 'Deployer', category: 'System' },
};

// API 封装
class XULScanAPI {
  public baseUrl: string;
  
  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }
  
  // 获取最新区块号
  async getBlockNumber(): Promise<number> {
    const response = await fetch(`${this.baseUrl}?module=block&action=eth_block_number`);
    const data = await response.json();
    return parseInt(data.result, 16);
  }
  
  // 获取地址余额
  async getBalance(address: string): Promise<string> {
    const response = await fetch(
      `${this.baseUrl}?module=account&action=balance&address=${address}`
    );
    const data = await response.json();
    return data.result;
  }
  
  // 获取交易列表
  async getTransactions(address: string, limit: number = 50): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${limit}`
    );
    const data = await response.json();
    return data.status === '1' ? data.result : [];
  }
  
  // 获取合约创建的代币
  async getTokensCreated(address: string): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100`
    );
    const data = await response.json();
    return data.status === '1' ? data.result : [];
  }
  
  // 获取内部交易
  async getInternalTransactions(address: string): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&filter=internal`
    );
    const data = await response.json();
    return data.status === '1' ? data.result : [];
  }
  
  // 获取区块详情
  async getBlock(blockNumber: number): Promise<any> {
    const response = await fetch(
      `${this.baseUrl}?module=block&action=getblockreward&blockno=${blockNumber}`
    );
    const data = await response.json();
    return data.status === '1' ? data.result : null;
  }
  
  // 获取合约列表 (已验证)
  async getVerifiedContracts(limit: number = 50): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}?module=contract&action=listcontracts&page=1&offset=${limit}`
    );
    const data = await response.json();
    return data.status === '1' ? data.result : [];
  }
  
  // 批量查询余额
  async getBalances(addresses: string[]): Promise<Record<string, string>> {
    const results: Record<string, string> = {};
    await Promise.all(
      addresses.map(async (addr) => {
        results[addr.toLowerCase()] = await this.getBalance(addr);
      })
    );
    return results;
  }
}

// 工具函数
export const formatAddress = (address: string, start: number = 6, end: number = 4): string => {
  if (!address) return '';
  return `${address.slice(0, start + 2)}...${address.slice(-end)}`;
};

export const formatBalance = (wei: string, decimals: number = 18): string => {
  if (!wei) return '0';
  const ether = parseFloat(wei) / Math.pow(10, decimals);
  if (ether < 0.0001) return ether.toExponential(4);
  return ether.toLocaleString(undefined, { maximumFractionDigits: 4 });
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getContractInfo = (address: string): { name: string; category: string; verified: boolean } => {
  const key = address.toUpperCase();
  if (OFFICIAL_CONTRACTS[key]) {
    return { ...OFFICIAL_CONTRACTS[key], verified: true };
  }
  return { name: 'Unknown', category: 'Unverified', verified: false };
};

export const getTransactionStatus = (tx: any): { status: string; color: string } => {
  if (tx.isError === '1' || tx.txreceipt_status === '0') {
    return { status: 'Failed', color: 'text-red-500' };
  }
  return { status: 'Success', color: 'text-green-500' };
};

export const api = new XULScanAPI();

export default api;

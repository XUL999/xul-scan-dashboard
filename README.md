# XUL Chain 增强型扫描器

基于 scan.rswl.ai API 构建的 Next.js 区块浏览器仪表板。

## ✨ 功能特性

- 📊 **网络概览** - 实时区块、Gas 价格、交易统计
- 📈 **交易追踪** - 最新交易列表、状态监控
- 🔍 **智能搜索** - 地址、交易哈希、代币搜索
- 📱 **响应式设计** - 支持移动端和桌面端
- 🌙 **深色主题** - 现代化的深色 UI
- 🔗 **官方合约标记** - 自动识别官方合约
- ⛽ **Gas 分析** - 交易 Gas 消耗追踪

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
```

打开 http://localhost:3000

### 生产构建

```bash
npm run build
npm start
```

## 📡 API 使用

仪表板使用 scan.rswl.ai 公开 API：

```typescript
import api from './lib/scan-api';

// 获取区块号
const blockNumber = await api.getBlockNumber();

// 获取地址余额
const balance = await api.getBalance('0x...');

// 获取交易列表
const txs = await api.getTransactions('0x...');
```

## 🗂️ 项目结构

```
src/
├── components/     # React 组件
│   ├── StatsCards.tsx
│   └── TransactionList.tsx
├── lib/           # 工具库
│   └── scan-api.ts    # API 封装
├── pages/         # Next.js 页面
│   └── index.tsx
└── styles/        # 样式文件
    └── globals.css
```

## 🌐 支持的网络

| 网络 | Chain ID | RPC |
|------|----------|-----|
| XUL Chain | 12309 | https://pro.rswl.ai |

## 📝 官方合约

已在代码中内置以下官方合约：


| 合约 | 地址 | 类型 |
|------|------|------|
| WXULV2 | 0x3111Baf82B89becc5B636d10fdeA1d2697F209F4 | Token |
| XULSwapFactoryV2 | 0x9466113e4b78b66FB2863e1C36670D47EA276Ca9 | DEX |
| XULSwapRouterV2 | 0x1AAdFfA792e71D1e75FB61CA53E6949352B5e18B | DEX |
| X402PaymentProcessorV2 | 0x1D754Fb5A8D1db7B83DDb2D6Fb8fD1365C8A6263 | Payment |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

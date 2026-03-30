# scan.rswl.ai API 文档

## 基础信息

| 项目 | 值 |
|------|------|
| 基础 URL | `https://scan.rswl.ai/api` |
| 数据格式 | JSON |
| 编码 | UTF-8 |

## 可用模块

### 1. 区块模块 (block)

#### 获取最新区块号
```
GET /api?module=block&action=eth_block_number
```

**响应:**
```json
{
  "jsonrpc": "2.0",
  "result": "0xb5a7e",
  "id": 1
}
```

#### 获取区块详情
```
GET /api?module=block&action=getblockreward&blockno={block_number}
```

### 2. 账户模块 (account)

#### 获取地址余额
```
GET /api?module=account&action=balance&address={address}
```

**参数:**
- `address`: 钱包地址

**响应:**
```json
{
  "message": "OK",
  "result": "10137383322085477208",
  "status": "1"
}
```

#### 获取交易列表
```
GET /api?module=account&action=txlist&address={address}&startblock={start}&endblock={end}&page={page}&offset={offset}
```

**参数:**
- `address`: 钱包地址
- `startblock`: 起始区块 (默认 0)
- `endblock`: 结束区块 (默认 99999999)
- `page`: 页码 (默认 1)
- `offset`: 每页数量 (默认 50)

#### 获取代币转账
```
GET /api?module=account&action=tokentx&address={address}&startblock={start}&endblock={end}
```

#### 获取内部交易
```
GET /api?module=account&action=txlist&address={address}&filter=internal
```

### 3. 合约模块 (contract)

#### 获取已验证合约列表
```
GET /api?module=contract&action=listcontracts&page={page}&offset={offset}
```

#### 获取合约 ABI
```
GET /api?module=contract&action=getabi&address={address}
```

#### 验证合约
```
POST /api?module=contract&action=verify
```

**参数:**
- `address`: 合约地址
- `sourceCode`: 合约源码
- `contractName`: 合约名称
- `compilerVersion`: 编译器版本
- `optimization`: 是否优化 (0/1)
- `runs`: 优化运行次数

### 4. 交易模块 (transaction)

#### 获取交易详情
```
GET /api?module=transaction&action=gettxinfo&txhash={hash}
```

#### 获取交易状态
```
GET /api?module=transaction&action=gettxreceiptstatus&txhash={hash}
```

### 5. 代币模块 (token)

#### 获取代币信息
```
GET /api?module=token&action=getToken&contractaddress={address}
```

#### 获取代币持有者
```
GET /api?module=token&action=getTokenHolders&contractaddress={address}
```

## 错误响应

```json
{
  "message": "Unknown action",
  "result": null,
  "status": "0"
}
```

## 状态码

| status | 含义 |
|--------|------|
| 1 | 成功 |
| 0 | 失败 |

## 使用示例

### JavaScript
```javascript
const API_BASE = 'https://scan.rswl.ai/api';

// 获取余额
const balance = await fetch(
  `${API_BASE}?module=account&action=balance&address=0xC2F803f72033210718dbF150301b5A88Bb2C12CC`
).then(r => r.json());

console.log(balance.result); // "10137383322085477208"
```

### Python
```python
import requests

API_BASE = 'https://scan.rswl.ai/api'

# 获取交易列表
params = {
    'module': 'account',
    'action': 'txlist',
    'address': '0xC2F803f72033210718dbF150301b5A88Bb2C12CC',
    'startblock': 0,
    'endblock': 99999999,
    'page': 1,
    'offset': 10
}

response = requests.get(API_BASE, params=params)
data = response.json()

print(data['result']) # 交易列表
```

## 速率限制

- 每分钟请求数: 100
- 每日请求数: 10,000

## 官方 SDK

```typescript
// 使用官方封装
import { api, CHAIN_CONFIG, formatBalance } from './lib/scan-api';

const balance = await api.getBalance('0x...');
const txs = await api.getTransactions('0x...');
```

## 支持的链

| 链名 | Chain ID |
|------|----------|
| XUL Chain | 12309 |

## 注意事项

1. 所有地址参数支持大小写
2. 区块号可以是十进制或十六进制
3. 返回的余额单位为 Wei
4. 使用 `formatBalance()` 转换为人可读格式

---

**最后更新**: 2026-03-30

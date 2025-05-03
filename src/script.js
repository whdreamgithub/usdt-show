// 模拟加密货币数据
const cryptoData = [
    {
        rank: 1,
        name: "Bitcoin",
        symbol: "BTC",
        price: 36254.78,
        change24h: 2.34,
        volume24h: 18543256789,
        marketCap: 708543256789,
        sparkline: [35000, 35200, 35500, 35300, 35800, 36000, 36254]
    },
    {
        rank: 2,
        name: "Ethereum",
        symbol: "ETH",
        price: 2043.56,
        change24h: -1.23,
        volume24h: 9854321567,
        marketCap: 245432156789,
        sparkline: [2080, 2075, 2060, 2050, 2045, 2040, 2043]
    },
    {
        rank: 3,
        name: "Binance Coin",
        symbol: "BNB",
        price: 245.67,
        change24h: 0.56,
        volume24h: 1543215678,
        marketCap: 45432156789,
        sparkline: [240, 242, 243, 244, 245, 245.5, 245.67]
    },
    {
        rank: 4,
        name: "Ripple",
        symbol: "XRP",
        price: 0.6234,
        change24h: 5.67,
        volume24h: 2543215678,
        marketCap: 35432156789,
        sparkline: [0.59, 0.595, 0.60, 0.61, 0.615, 0.62, 0.6234]
    },
    {
        rank: 5,
        name: "Solana",
        symbol: "SOL",
        price: 58.92,
        change24h: -3.45,
        volume24h: 1432156789,
        marketCap: 25432156789,
        sparkline: [61, 60.5, 60, 59.5, 59, 58.5, 58.92]
    },
    {
        rank: 6,
        name: "Cardano",
        symbol: "ADA",
        price: 0.3845,
        change24h: 1.23,
        volume24h: 432156789,
        marketCap: 15432156789,
        sparkline: [0.38, 0.381, 0.382, 0.383, 0.384, 0.3842, 0.3845]
    },
    {
        rank: 7,
        name: "Dogecoin",
        symbol: "DOGE",
        price: 0.0856,
        change24h: -0.78,
        volume24h: 321567890,
        marketCap: 12156789012,
        sparkline: [0.086, 0.0859, 0.0858, 0.0857, 0.0856, 0.0856, 0.0856]
    },
    {
        rank: 8,
        name: "Polkadot",
        symbol: "DOT",
        price: 5.34,
        change24h: 2.12,
        volume24h: 215678901,
        marketCap: 10156789012,
        sparkline: [5.2, 5.25, 5.28, 5.30, 5.32, 5.33, 5.34]
    },
    {
        rank: 9,
        name: "Polygon",
        symbol: "MATIC",
        price: 0.7845,
        change24h: 3.45,
        volume24h: 156789012,
        marketCap: 7567890123,
        sparkline: [0.76, 0.765, 0.77, 0.775, 0.78, 0.782, 0.7845]
    },
    {
        rank: 10,
        name: "Shiba Inu",
        symbol: "SHIB",
        price: 0.00000876,
        change24h: -2.34,
        volume24h: 56789012,
        marketCap: 5567890123,
        sparkline: [0.000009, 0.0000089, 0.0000088, 0.0000087, 0.0000087, 0.0000087, 0.00000876]
    }
];

// 模拟聊天消息
const chatMessages = [
    { user: "CryptoTrader88", message: "你们怎么看BTC最近的走势？", time: "2分钟前" },
    { user: "MoonLambos", message: "我觉得很快就要突破4万了！", time: "1分钟前" },
    { user: "BearMarketPro", message: "别太乐观，RSI已经超买了", time: "刚刚" },
    { user: "AltcoinGuru", message: "ETH/BTC汇率在上升，alt season要来了？", time: "刚刚" }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 填充行情表格
    fillMarketTable();
    
    // 填充聊天消息
    fillChatMessages();
    
    // 初始化图表
    initCharts();
    
    // 设置警报按钮事件
    setupAlertButton();
    
    // 设置搜索功能
    setupSearch();
    
    // 设置语言切换
    setupLanguageSelect();
    
    // 设置关注按钮事件
    setupWatchButtons();
    
    // 设置聊天输入事件
    setupChatInput();
});

// 填充行情表格
function fillMarketTable() {
    const tableBody = document.querySelector('.market-table tbody');
    
    cryptoData.forEach(crypto => {
        const row = document.createElement('tr');
        
        // 创建涨跌颜色类
        const changeClass = crypto.change24h >= 0 ? 'positive' : 'negative';
        
        // 创建走势图占位符
        const sparklineCanvas = document.createElement('canvas');
        sparklineCanvas.width = 100;
        sparklineCanvas.height = 30;
        sparklineCanvas.className = 'sparkline';
        
        const sparklineContainer = document.createElement('div');
        sparklineContainer.appendChild(sparklineCanvas);
        
        row.innerHTML = `
            <td>${crypto.rank}</td>
            <td><strong>${crypto.name}</strong> <span class="text-secondary">${crypto.symbol}</span></td>
            <td>$${crypto.price.toLocaleString()}</td>
            <td class="${changeClass}">${crypto.change24h >= 0 ? '+' : ''}${crypto.change24h.toFixed(2)}%</td>
            <td>$${(crypto.volume24h / 1000000).toFixed(2)}M</td>
            <td>$${(crypto.marketCap / 1000000000).toFixed(2)}B</td>
            <td></td>
            <td><button class="watch-btn">关注</button></td>
        `;
        
        // 将走势图容器添加到表格单元格
        const sparklineCell = row.querySelector('td:nth-child(7)');
        sparklineCell.appendChild(sparklineContainer);
        
        tableBody.appendChild(row);
        
        // 绘制走势图
        drawSparkline(sparklineCanvas, crypto.sparkline, changeClass);
    });
}

// 绘制走势图
function drawSparkline(canvas, data, colorClass) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1; // 防止除以0
    const step = width / (data.length - 1);
    
    // 设置线条颜色
    if (colorClass === 'positive') {
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--positive');
    } else {
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--negative');
    }
    
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = index * step;
        const y = height - ((value - min) / range * height);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
}

// 填充聊天消息
function fillChatMessages() {
    const chatContainer = document.querySelector('.chat-messages');
    
    chatMessages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <strong>${msg.user}:</strong> ${msg.message} <span class="chat-time">${msg.time}</span>
        `;
        chatContainer.appendChild(messageElement);
    });
    
    // 滚动到底部
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 初始化图表
function initCharts() {
    // 这里应该是实际的图表库初始化代码
    // 由于我们使用的是传统JS，没有引入图表库，所以使用占位符
    
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    // 创建简单的SVG图表作为占位
    chart1.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 300 150" class="chart-svg">
            <path d="M0,150 L50,120 L100,130 L150,110 L200,90 L250,70 L300,50" 
                  stroke="${getComputedStyle(document.documentElement).getPropertyValue('--positive')}" 
                  fill="none" stroke-width="2" />
            <text x="10" y="20" fill="${getComputedStyle(document.documentElement).getPropertyValue('--text-primary')}">BTC/USDT</text>
            <text x="200" y="20" fill="${getComputedStyle(document.documentElement).getPropertyValue('--positive')}">↑ 2.34% 过去24小时</text>
        </svg>
    `;
    
    chart2.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 300 150" class="chart-svg">
            <path d="M0,50 L50,70 L100,80 L150,90 L200,100 L250,120 L300,130" 
                  stroke="${getComputedStyle(document.documentElement).getPropertyValue('--negative')}" 
                  fill="none" stroke-width="2" />
            <text x="10" y="20" fill="${getComputedStyle(document.documentElement).getPropertyValue('--text-primary')}">ETH/USDT</text>
            <text x="200" y="20" fill="${getComputedStyle(document.documentElement).getPropertyValue('--negative')}">↓ 1.23% 过去24小时</text>
        </svg>
    `;
}

// 设置警报按钮事件
function setupAlertButton() {
    const alertBtn = document.querySelector('.alert-btn');
    
    alertBtn.addEventListener('click', function() {
        // 创建警报设置模态框
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>设置价格警报</h3>
                <div class="form-group">
                    <label>选择币种</label>
                    <select class="crypto-select">
                        ${cryptoData.map(crypto => `<option value="${crypto.symbol}">${crypto.name} (${crypto.symbol})</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>价格条件</label>
                    <select class="condition-select">
                        <option value="above">高于</option>
                        <option value="below">低于</option>
                    </select>
                    <input type="number" class="price-input" placeholder="输入价格">
                </div>
                <button class="set-alert-btn">设置警报</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 关闭模态框
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // 点击模态框外部关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // 设置警报
        modal.querySelector('.set-alert-btn').addEventListener('click', function() {
            const selectedCrypto = modal.querySelector('.crypto-select').value;
            const condition = modal.querySelector('.condition-select').value;
            const price = modal.querySelector('.price-input').value;
            
            if (!price) {
                alert('请输入价格');
                return;
            }
            
            alert(`已设置警报: 当${selectedCrypto}价格${condition === 'above' ? '高于' : '低于'}$${price}时通知`);
            document.body.removeChild(modal);
        });
    });
}

// 设置搜索功能
function setupSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query) {
            const results = cryptoData.filter(crypto => 
                crypto.name.toLowerCase().includes(query) || 
                crypto.symbol.toLowerCase().includes(query)
            );
            
            if (results.length > 0) {
                // 高亮显示匹配的行
                document.querySelectorAll('.market-table tbody tr').forEach(row => {
                    row.style.backgroundColor = '';
                });
                
                results.forEach(result => {
                    const rows = document.querySelectorAll('.market-table tbody tr');
                    rows.forEach(row => {
                        if (row.querySelector('td:nth-child(2) strong').textContent === result.name) {
                            row.style.backgroundColor = 'rgba(41, 98, 255, 0.2)';
                            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    });
                });
                
                // 显示结果通知
                showNotification(`找到 ${results.length} 个匹配结果`);
            } else {
                showNotification('没有找到匹配的加密货币', 'error');
            }
        } else {
            // 清除搜索高亮
            document.querySelectorAll('.market-table tbody tr').forEach(row => {
                row.style.backgroundColor = '';
            });
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// 设置语言切换
function setupLanguageSelect() {
    const languageSelect = document.querySelector('.language-select');
    
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        showNotification(`语言已切换至 ${this.options[this.selectedIndex].text}`);
        // 实际应用中这里会有多语言切换逻辑
    });
}

// 设置关注按钮事件
function setupWatchButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('watch-btn')) {
            const row = e.target.closest('tr');
            const cryptoName = row.querySelector('td:nth-child(2) strong').textContent;
            const cryptoSymbol = row.querySelector('td:nth-child(2) span').textContent;
            
            if (e.target.textContent === '关注') {
                e.target.textContent = '已关注';
                e.target.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--positive');
                showNotification(`已关注 ${cryptoName} (${cryptoSymbol})`);
            } else {
                e.target.textContent = '关注';
                e.target.style.backgroundColor = '';
                showNotification(`已取消关注 ${cryptoName} (${cryptoSymbol})`);
            }
        }
    });
}

// 设置聊天输入事件
function setupChatInput() {
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    const chatMessagesContainer = document.querySelector('.chat-messages');
    
    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message) {
            // 模拟用户发送消息
            const newMessage = {
                user: "我",
                message: message,
                time: "刚刚"
            };
            
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message my-message';
            messageElement.innerHTML = `
                <strong>${newMessage.user}:</strong> ${newMessage.message} <span class="chat-time">${newMessage.time}</span>
            `;
            
            chatMessagesContainer.appendChild(messageElement);
            chatInput.value = '';
            
            // 滚动到底部
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
            
            // 模拟回复
            setTimeout(() => {
                const replies = [
                    "有趣的观点！",
                    "我不同意这个看法。",
                    "这让我想起了2017年的行情。",
                    "技术指标支持这个说法吗？"
                ];
                
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                const botMessage = {
                    user: "CryptoBot_" + Math.floor(Math.random() * 1000),
                    message: randomReply,
                    time: "刚刚"
                };
                
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'chat-message';
                botMessageElement.innerHTML = `
                    <strong>${botMessage.user}:</strong> ${botMessage.message} <span class="chat-time">${botMessage.time}</span>
                `;
                
                chatMessagesContainer.appendChild(botMessageElement);
                chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
            }, 1000 + Math.random() * 2000);
        }
    }
    
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// 显示通知
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 自动消失
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加通知样式
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        animation: slideIn 0.3s forwards;
    }
    
    .notification.success {
        background-color: var(--positive);
    }
    
    .notification.error {
        background-color: var(--negative);
    }
    
    .fade-out {
        animation: fadeOut 0.3s forwards;
    }
    
    @keyframes slideIn {
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
    
    /* 模态框样式 */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .modal-content {
        background-color: var(--background-light);
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
    }
    
    .form-group select, .form-group input {
        width: 100%;
        padding: 8px;
        background-color: var(--background-darker);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        border-radius: 4px;
    }
    
    .set-alert-btn {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
    }
    
    /* 聊天消息样式 */
    .chat-message {
        margin-bottom: 10px;
        padding: 8px 12px;
        background-color: var(--background-light);
        border-radius: 4px;
    }
    
    .my-message {
        background-color: rgba(41, 98, 255, 0.2);
    }
    
    .chat-time {
        color: var(--text-secondary);
        font-size: 0.8rem;
        margin-left: 10px;
    }
`;
document.head.appendChild(notificationStyles);
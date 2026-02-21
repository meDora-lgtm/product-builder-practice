document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const numbersDisplay = document.getElementById('numbers-display');
    const historyList = document.getElementById('history-list');
    const themeToggle = document.getElementById('theme-toggle');
    const clearHistoryBtn = document.getElementById('clear-history');

    // Lotto Logic
    const generateLottoNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    const getBallColor = (num) => {
        if (num <= 10) return 'var(--lotto-1)';
        if (num <= 20) return 'var(--lotto-11)';
        if (num <= 30) return 'var(--lotto-21)';
        if (num <= 40) return 'var(--lotto-31)';
        return 'var(--lotto-41)';
    };

    const createBall = (num, isSmall = false) => {
        const ball = document.createElement('div');
        ball.className = isSmall ? 'history-ball' : 'number-ball';
        ball.textContent = num;
        ball.style.backgroundColor = getBallColor(num);
        return ball;
    };

    const updateDisplay = (numbers) => {
        numbersDisplay.innerHTML = '';
        numbers.forEach((num, index) => {
            setTimeout(() => {
                const ball = createBall(num);
                numbersDisplay.appendChild(ball);
            }, index * 100);
        });
    };

    const addToHistory = (numbers) => {
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        const item = document.createElement('li');
        item.className = 'history-item';
        
        const timeSpan = document.createElement('span');
        timeSpan.textContent = timeStr;
        
        const ballsDiv = document.createElement('div');
        ballsDiv.className = 'history-balls';
        numbers.forEach(num => {
            ballsDiv.appendChild(createBall(num, true));
        });

        item.appendChild(timeSpan);
        item.appendChild(ballsDiv);
        historyList.prepend(item);

        // Save to local storage
        saveHistory();
    };

    const saveHistory = () => {
        const historyData = Array.from(historyList.children).map(li => {
            const time = li.querySelector('span').textContent;
            const balls = Array.from(li.querySelectorAll('.history-ball')).map(b => b.textContent);
            return { time, balls };
        });
        localStorage.setItem('lottoHistory', JSON.stringify(historyData.slice(0, 10)));
    };

    const loadHistory = () => {
        const saved = localStorage.getItem('lottoHistory');
        if (saved) {
            const data = JSON.parse(saved);
            data.reverse().forEach(entry => {
                const item = document.createElement('li');
                item.className = 'history-item';
                const timeSpan = document.createElement('span');
                timeSpan.textContent = entry.time;
                const ballsDiv = document.createElement('div');
                ballsDiv.className = 'history-balls';
                entry.balls.forEach(num => ballsDiv.appendChild(createBall(num, true)));
                item.appendChild(timeSpan);
                item.appendChild(ballsDiv);
                historyList.prepend(item);
            });
        }
    };

    // Theme Logic
    const toggleTheme = () => {
        const body = document.body;
        const icon = themeToggle.querySelector('.icon');
        
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            icon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            icon.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    };

    // Init Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        themeToggle.querySelector('.icon').textContent = '☀️';
    }

    // Event Listeners
    generateBtn.addEventListener('click', () => {
        const numbers = generateLottoNumbers();
        updateDisplay(numbers);
        addToHistory(numbers);
    });

    themeToggle.addEventListener('click', toggleTheme);

    clearHistoryBtn.addEventListener('click', () => {
        historyList.innerHTML = '';
        localStorage.removeItem('lottoHistory');
    });

    // Load initial history
    loadHistory();
});

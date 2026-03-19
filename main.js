document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const generateBtn = document.getElementById('generate-btn');
    const resultArea = document.getElementById('result-area');
    const topBtn = document.getElementById('top-btn');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');

    // 1. 테마 관리
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // 2. 탑 버튼
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. 로또 번호 생성 (보너스 포함)
    function getLottoNumbers() {
        const numbers = [];
        while (numbers.length < 7) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        const main = numbers.slice(0, 6).sort((a, b) => a - b);
        const bonus = numbers[6];
        return { main, bonus };
    }

    function createLottoRow(lottoData) {
        const row = document.createElement('div');
        row.className = 'lotto-row';
        
        lottoData.main.forEach(num => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.textContent = num;
            row.appendChild(ball);
        });

        const plus = document.createElement('span');
        plus.className = 'bonus-plus';
        plus.textContent = '+';
        row.appendChild(plus);

        const bonusBall = document.createElement('div');
        bonusBall.className = 'ball bonus';
        bonusBall.textContent = lottoData.bonus;
        row.appendChild(bonusBall);
        
        return row;
    }

    // 4. 히스토리 관리
    function saveHistory(allSets) {
        const history = JSON.parse(localStorage.getItem('lottoHistory') || '[]');
        const newEntry = {
            date: new Date().toLocaleString(),
            sets: allSets
        };
        history.unshift(newEntry);
        // 최근 20개만 유지
        if (history.length > 20) history.pop();
        localStorage.setItem('lottoHistory', JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        const history = JSON.parse(localStorage.getItem('lottoHistory') || '[]');
        if (history.length === 0) {
            historyList.innerHTML = '<p class="empty-msg">아직 생성된 번호가 없습니다.</p>';
            return;
        }

        historyList.innerHTML = '';
        history.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'history-item';
            
            const dateSpan = document.createElement('span');
            dateSpan.className = 'history-date';
            dateSpan.textContent = entry.date;
            item.appendChild(dateSpan);

            entry.sets.forEach(set => {
                item.appendChild(createLottoRow(set));
            });

            historyList.appendChild(item);
        });
    }

    clearHistoryBtn.addEventListener('click', () => {
        if (confirm('모든 히스토리를 초기화하시겠습니까?')) {
            localStorage.removeItem('lottoHistory');
            renderHistory();
        }
    });

    // 5. 번호 생성 버튼 이벤트
    generateBtn.addEventListener('click', () => {
        resultArea.innerHTML = '';
        const currentSets = [];

        for (let i = 0; i < 5; i++) {
            const lottoData = getLottoNumbers();
            currentSets.push(lottoData);
            resultArea.appendChild(createLottoRow(lottoData));
        }
        
        saveHistory(currentSets);
    });

    // 초기 실행
    renderHistory();
});

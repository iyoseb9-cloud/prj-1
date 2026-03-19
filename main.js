document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const generateBtn = document.getElementById('generate-btn');
    const resultArea = document.getElementById('result-area');
    const topBtn = document.getElementById('top-btn');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');

    // 모달 요소
    const modal = document.getElementById('custom-modal');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalCancel = document.getElementById('modal-cancel');

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

    // 모달 제어
    clearHistoryBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });

    modalConfirm.addEventListener('click', () => {
        localStorage.removeItem('lottoHistory');
        renderHistory();
        modal.classList.remove('show');
    });

    modalCancel.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // 배경 클릭 시 모달 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
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

    renderHistory();
});

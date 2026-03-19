document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const generateBtn = document.getElementById('generate-btn');
    const resultArea = document.getElementById('result-area');
    const topBtn = document.getElementById('top-btn');

    // 1. 테마 관리 (로컬 스토리지 사용)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // 2. 탑 버튼 (좌측 하단)
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 3. 로또 번호 생성 함수
    function getLottoNumbers() {
        const numbers = [];
        while (numbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        return numbers.sort((a, b) => a - b);
    }

    // 4. 번호 생성 버튼 이벤트
    generateBtn.addEventListener('click', () => {
        resultArea.innerHTML = ''; // 화면 초기화

        // 한 번 클릭에 5세트 생성
        for (let i = 0; i < 5; i++) {
            const row = document.createElement('div');
            row.className = 'lotto-row';
            
            const numbers = getLottoNumbers();
            numbers.forEach(num => {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.textContent = num;
                row.appendChild(ball);
            });
            
            resultArea.appendChild(row);
        }
    });
});

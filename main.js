document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const generateBtn = document.getElementById('generate-btn');
  const resultsContainer = document.getElementById('lotto-results');
  const body = document.body;

  // 테마 관리
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // 로또 번호 생성 함수
  function generateLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  }

  // 버튼 클릭 이벤트
  generateBtn.addEventListener('click', () => {
    resultsContainer.innerHTML = ''; // 이전 결과 초기화

    // 5세트 생성
    for (let i = 0; i < 5; i++) {
      const set = generateLottoNumbers();
      const setDiv = document.createElement('div');
      setDiv.className = 'lotto-set';
      
      set.forEach(num => {
        const ball = document.createElement('div');
        ball.className = 'lotto-ball';
        ball.textContent = num;
        setDiv.appendChild(ball);
      });
      
      resultsContainer.appendChild(setDiv);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  // 로컬 스토리지에서 저장된 테마 불러오기
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.textContent = 'Switch to Light Mode';
  }

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    let currentTheme = 'light';
    if (body.classList.contains('dark-mode')) {
      currentTheme = 'dark';
      toggleButton.textContent = 'Switch to Light Mode';
    } else {
      toggleButton.textContent = 'Switch to Dark Mode';
    }
    
    // 선택한 테마 저장
    localStorage.setItem('theme', currentTheme);
  });
});

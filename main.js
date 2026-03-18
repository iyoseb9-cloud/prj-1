document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // 이전에 설정된 테마가 있다면 불러옴
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = 'Light Mode';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      toggleBtn.textContent = 'Light Mode';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleBtn.textContent = 'Dark Mode';
      localStorage.setItem('theme', 'light');
    }
  });
});

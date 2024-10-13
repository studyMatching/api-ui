//사이드 내비게이션바 클릭 시 색상 블록 생성
const navColorBlock = document.querySelectorAll('.side-nav a');

function handleClick(event) {
  navColorBlock.forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');
}

navColorBlock.forEach((e) => {
  e.addEventListener('click', handleClick);
});


//사이드 내비게이션바 클릭 시 해당 페이지 노출
document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.side-nav a');
  const mainContent = document.querySelector('.page-content');
  
  navItems.forEach(item => {
      item.addEventListener('click', function(e) {
          e.preventDefault();
          const pageTitle = this.textContent.trim();
          mainContent.innerHTML = `<h1>${pageTitle}</h1>`;
      });
  });
});


//다크 테마 설정
const themeToggles = document.querySelectorAll('.theme-toggle');
const body = document.body;

function setTheme(isDark) {
  if (isDark) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
  localStorage.setItem('darkMode', isDark);
}

themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    setTheme(!body.classList.contains('dark-mode'));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  setTheme(localStorage.getItem('darkMode') === 'true');
});
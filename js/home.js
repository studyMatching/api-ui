// 사이드 내비게이션바 클릭 시 색상 블록 생성
const navColorBlock = document.querySelectorAll('.side-nav a');

function handleClick(event) {
  navColorBlock.forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');
}

navColorBlock.forEach((e) => {
  e.addEventListener('click', handleClick);
});

// 다크 테마 설정
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

// 홈 버튼을 눌렀을 때 홈 콘텐츠 로드 및 초기 설정
document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.side-nav a');
  const mainContent = document.querySelector('.page-content');
  const homeTemplate = document.querySelector('#home-content');

  function loadHomeContent() {
    mainContent.innerHTML = homeTemplate.innerHTML;
  }

  // 기본 홈 콘텐츠 로드
  loadHomeContent();

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const pageTitle = this.textContent.trim();
      
      if (pageTitle === '홈') {
        // 홈 버튼을 눌렀을 때 홈 콘텐츠 로드
        loadHomeContent();
      } else {
        // 다른 페이지 항목 처리
        mainContent.innerHTML = `<h1>${pageTitle}</h1>`;
      }
    });
  });

  // 캐러셀 슬라이드 관련
  const slides = document.querySelector(".slides");
  const indicators = document.querySelectorAll(".indicator");
  let currentSlide = 1;
  const totalSlides = indicators.length;

  // 첫 번째와 마지막 슬라이드 복사본 만들기
  const firstSlideClone = slides.firstElementChild.cloneNode(true);
  const lastSlideClone = slides.lastElementChild.cloneNode(true);
  
  // 복사본을 슬라이드에 추가
  slides.appendChild(firstSlideClone); // 첫 번째 슬라이드 복사본을 마지막에 추가
  slides.insertBefore(lastSlideClone, slides.firstElementChild); // 마지막 슬라이드 복사본을 처음에 추가

  slides.style.transform = `translateX(-100%)`; // 첫 번째 슬라이드를 기본으로 보이게 설정

  const updateSlide = () => {
    slides.style.transition = "transform 0.5s ease";
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    indicators.forEach(ind => ind.classList.remove("active"));
    indicators[(currentSlide - 1 + totalSlides) % totalSlides].classList.add("active");
  };

  // 다음 슬라이드로 이동하는 함수
  const goToNextSlide = () => {
    currentSlide++;
    updateSlide();

    // 복사된 슬라이드가 보일 때 실제 첫 번째 슬라이드로 이동
    if (currentSlide === totalSlides + 1) { 
      setTimeout(() => {
        slides.style.transition = "none";
        currentSlide = 1; 
        slides.style.transform = `translateX(-100%)`;
      }, 500);
    }
  };

  // 이전 슬라이드로 이동하는 함수
  const goToPreviousSlide = () => {
    currentSlide--;
    updateSlide();

    if (currentSlide === 0) {
      setTimeout(() => {
        slides.style.transition = "none";
        currentSlide = totalSlides;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      }, 500);
    }
  };

  // 인디케이터 클릭 시 슬라이드 이동
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index + 1;
      updateSlide();
    });
  });

  // 3초마다 자동으로 슬라이드 넘김
  const autoSlide = setInterval(goToNextSlide, 3000);

  // 슬라이드 클릭 시 자동 슬라이딩 멈춤
  //slides.addEventListener('mouseover', () => clearInterval(autoSlide));
  //slides.addEventListener('mouseleave', () => setInterval(goToNextSlide, 3000));
});

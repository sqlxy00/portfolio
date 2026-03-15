/**
 * 相澤ポートフォリオ - インタラクション制御
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. スポットライト効果 (マウス追従)
  const spotlight = document.getElementById('spotlight');
  
  const updateSpotlightOpacity = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    spotlight.style.opacity = isLight ? '0.8' : '0.5';
  };

  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    spotlight.style.setProperty('--x', x + '%');
    spotlight.style.setProperty('--y', y + '%');
    
    updateSpotlightOpacity();
  });

  // 2. スクロールプログレスバー
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";
  });

  // 3. ローディング演出
  const startTime = Date.now();
  const duration = 5000; // 5秒のシミュレーション
  const counterDisplay = document.getElementById('loader-percent');
  const loaderProgressBar = document.getElementById('loader-progress-bar');

  if (loaderProgressBar) {
    setTimeout(() => {
        loaderProgressBar.style.width = '100%';
    }, 50);
  }

  const updateCounter = () => {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(Math.floor((elapsed / duration) * 100), 100);
    
    if (counterDisplay) {
      counterDisplay.textContent = progress.toString().padStart(2, '0');
    }
    
    if (elapsed < duration) {
      requestAnimationFrame(updateCounter);
    } else {
      finishLoading();
    }
  };

  const finishLoading = () => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('fade-out');
    document.body.classList.add('loaded');
    initAOS();
  };

  updateCounter();

  // 4. スクロール出現アニメーション (Intersection Observer)
  function initAOS() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
  }

  // 5. カードの3Dホバー演出
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });

  // 6. テーマ切り替え (ライトモード/ダークモード)
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      if (isLight) {
        root.removeAttribute('data-theme');
        themeBtn.textContent = 'LIGHT MODE';
      } else {
        root.setAttribute('data-theme', 'light');
        themeBtn.textContent = 'DARK MODE';
      }
      updateSpotlightOpacity();
    });
  }
});
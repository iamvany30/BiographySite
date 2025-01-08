// Переключение темы
const themeToggleButton = document.querySelector('.theme-toggle');

themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Можно изменить цвет кнопки, чтобы отобразить текущее состояние
  if (document.body.classList.contains('dark-mode')) {
    themeToggleButton.textContent = 'Светлая тема';
  } else {
    themeToggleButton.textContent = 'Тёмная тема';
  }
});

// Прокрутка страницы вверх
const scrollToTopButton = document.querySelector('.scroll-to-top');

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Показать/скрыть кнопку прокрутки
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

// Получаем кнопку
const scrollToTopBtn = document.querySelector('.scroll-to-top');

// Функция для отображения или скрытия кнопки
function toggleScrollToTopButton() {
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = 'block'; // Показываем кнопку
  } else {
    scrollToTopBtn.style.display = 'none'; // Скрываем кнопку
  }
}

// Функция для прокрутки наверх
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Слушаем событие прокрутки страницы
window.addEventListener('scroll', toggleScrollToTopButton);

// Обработчик клика по кнопке
scrollToTopBtn.addEventListener('click', scrollToTop);

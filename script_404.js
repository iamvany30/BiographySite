document.addEventListener("DOMContentLoaded", function () {
  const questionCount = 10;  // Количество вопросов
  const questionContainer = document.body;  // Контейнер для вопросов
  const screenHeight = window.innerHeight;  // Высота экрана
  const screenWidth = window.innerWidth;  // Ширина экрана
  const texts = ["Что?", "Где?", "Куда?", "404", "What?", "Where?", "WTF"];  // Массив с текстами
  const questions = [];

  // Генерация вопросов
  for (let i = 0; i < questionCount; i++) {
    const question = document.createElement('div');
    question.classList.add('question');
    
    // Случайный выбор текста
    question.textContent = texts[Math.floor(Math.random() * texts.length)];

    // Случайные начальные координаты
    let xPos = Math.random() * (screenWidth - 200);  // Горизонтальная позиция
    let yPos = Math.random() * (screenHeight - 200);  // Вертикальная позиция, не выходящая за пределы экрана

    // Устанавливаем вопрос в контейнер
    question.style.left = `${xPos}px`;  // Устанавливаем горизонтальное положение
    question.style.top = `${yPos}px`;  // Устанавливаем вертикальное положение

    // Начальная прозрачность для анимации
    question.style.opacity = '0';
    question.style.transition = 'opacity 0.5s ease-in-out';  // Плавное появление
    question.style.pointerEvents = 'auto';  // Включаем возможность клика по вопросу

    setTimeout(() => {
      question.style.opacity = '1';  // Плавное появление после создания
    }, 100);  // Задержка на 100ms, чтобы анимация начала работать

    questionContainer.appendChild(question);

    // Добавляем вопрос в массив для отслеживания
    questions.push({
      el: question,
      x: xPos,
      y: yPos,
      directionX: Math.random() > 0.5 ? 1 : -1,
      directionY: Math.random() > 0.5 ? 1 : -1,
      speed: Math.random() * 2 + 1.5,  // Оставлена высокая скорость для плавности
      isRemoved: false,  // Добавляем свойство для отслеживания, удален ли вопрос
    });
  }

  // Функция для движения вопроса
  function moveQuestion() {
    setInterval(() => {
      questions.forEach((q) => {
        if (q.isRemoved) return;  // Если вопрос был удалён, пропускаем его

        // Плавное движение с учётом скорости
        q.x += q.directionX * q.speed;
        q.y += q.directionY * q.speed;

        // Проверка на столкновение с краями экрана
        if (q.x <= 0 || q.x >= screenWidth - 100) {
          q.directionX *= -1;  // Меняем направление по горизонтали
        }

        if (q.y <= 0 || q.y >= screenHeight - 100) {
          q.directionY *= -1;  // Меняем направление по вертикали
        }

        // Столкновение с другими вопросами
        questions.forEach((otherQ) => {
          if (q !== otherQ && !otherQ.isRemoved) {  // Игнорируем удаленные вопросы
            const distance = Math.sqrt(Math.pow(q.x - otherQ.x, 2) + Math.pow(q.y - otherQ.y, 2));

            // Если вопросы слишком близки друг к другу
            if (distance < 100) {  // Порог близости для столкновения
              // Расчёт корректировки позиции для предотвращения пересечения
              const angle = Math.atan2(q.y - otherQ.y, q.x - otherQ.x);
              const overlap = 100 - distance;  // Порог перекрытия

              // Отодвигаем оба вопроса на основе угла столкновения
              q.x += Math.cos(angle) * overlap * 0.5;
              q.y += Math.sin(angle) * overlap * 0.5;

              otherQ.x -= Math.cos(angle) * overlap * 0.5;
              otherQ.y -= Math.sin(angle) * overlap * 0.5;
            }
          }
        });

        // Проверка, если вопрос выходит за пределы экрана
        if (q.x < 0 || q.x > screenWidth || q.y < 0 || q.y > screenHeight - 100) {
          // Плавное исчезновение и перемещение в новую позицию
          q.el.style.opacity = '0';
          setTimeout(() => {
            q.x = Math.random() * (screenWidth - 200);
            q.y = Math.random() * (screenHeight - 200);

            // Плавное возвращение и появление
            q.el.style.left = `${q.x}px`;
            q.el.style.top = `${q.y}px`;
            q.el.style.opacity = '1';
          }, 500);  // Задержка, чтобы исчезновение было плавным
        }

        // Обновляем позицию вопроса
        q.el.style.left = `${q.x}px`;
        q.el.style.top = `${q.y}px`;
      });
    }, 20);  // Обновление каждую 1/50 секунды для плавности
  }

  // Удаление вопросов по клику
  document.addEventListener('click', function (event) {
    questions.forEach((q) => {
      const rect = q.el.getBoundingClientRect();
      // Проверяем, был ли клик по вопросу
      if (
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom
      ) {
        q.el.style.opacity = '0';
        setTimeout(() => {
          q.el.remove();  // Удаляем вопрос с экрана
          q.isRemoved = true;  // Отмечаем вопрос как удалённый
        }, 500);  // Задержка перед удалением
      }
    });
  });

  // Запуск движения вопросов
  moveQuestion();
});

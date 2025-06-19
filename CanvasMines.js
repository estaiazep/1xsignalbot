const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Функция для установки фиксированного размера канваса
function resizeCanvas() {
    const size = 210; // Уменьшено с 224 до 210 пикселей для лучшего баланса
    canvas.width = size;
    canvas.height = size;

    const totalSpacing = size * 0.06; // Увеличено с 0.05 до 0.06 для лучших отступов
    const availableSize = size - totalSpacing; // Размер доступного пространства для квадратов

    rectSize = availableSize / gridSize; // Размер каждого прямоугольника
    spacing = totalSpacing / (gridSize - 1); // Отступ между квадратами

    createGrid(); // Пересоздаем сетку после изменения размера
    drawGrid(); // Перерисовываем сетку
}

// Вызов resizeCanvas при загрузке страницы
window.addEventListener('load', resizeCanvas);

// Загрузка изображений
const rectangleImg = new Image();
rectangleImg.src = "RectangleMines.svg";
const starImg = new Image();
starImg.src = "StarMines.svg";

// Кастомизируемые переменные - оптимизированы для баланса
let gridSize = 5;           // Размер сетки (количество прямоугольников в ряду/столбце)
let rectSize = 100;         // Размер одного прямоугольника (пересчитывается динамически)
let spacing = 8;            // Отступы между квадратами (пересчитываются динамически)
let pieceCount = 30;        // Уменьшено количество частиц с 40 до 30 для производительности
let pieceMinSize = 3;       // Уменьшен минимальный размер частицы
let pieceMaxSize = 8;       // Уменьшен максимальный размер частицы
let pieceSpeedFactor = 0.04; // Уменьшен фактор скорости разлета частиц
let pieceColor = '#0168CF'; // Цвет прямоугольников и частиц
let starSize = 32;          // Уменьшен размер звезды с 40 до 32

const rectangles = [];
const pieces = [];
const stars = []; // Массив для хранения звёзд

// Функция для создания начальной сетки
function createGrid() {
    rectangles.length = 0; // Очистка массива перед пересозданием

    // Добавляем небольшой отступ от краев канваса
    const offsetX = 8;
    const offsetY = 8;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            rectangles.push({
                x: j * (rectSize + spacing) + offsetX, // Позиция по X с учетом отступов
                y: i * (rectSize + spacing) + offsetY, // Позиция по Y с учетом отступов
                size: rectSize,              // Размер прямоугольника
                color: pieceColor,
                index: i * gridSize + j,
            });
        }
    }
}

// Функция для рисования изображения прямоугольника
function drawRectangleImage(x, y, size) {
    ctx.drawImage(rectangleImg, x, y, size, size); // Рисуем изображение
}

// Функция для рисования сетки
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас перед перерисовкой
    ctx.fillStyle = "#090E1D"; // Цвет фона
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Заполнение фона
    rectangles.forEach(rect => {
        drawRectangleImage(rect.x, rect.y, rect.size); // Рисуем прямоугольник изображением
    });
}

// Функция для рисования звезды с использованием изображения
function drawStarImage(x, y, size) {
    ctx.drawImage(starImg, x - size / 2, y - size / 2, size, size); // Центрируем изображение звезды
}

// Функция для рисования звёзд
function drawStars() {
    stars.forEach(star => {
        drawStarImage(star.x, star.y, starSize); // Рисуем звезду из изображения
    });
}

// Функция для создания частиц
function createPieces(rect) {
    for (let i = 0; i < pieceCount; i++) {
        const angle = Math.random() * 2 * Math.PI; // Случайный угол
        const distance = Math.random() * 80 + 25; // Уменьшена дистанция разлета для компактности

        pieces.push({
            x: rect.x + rect.size / 2,
            y: rect.y + rect.size / 2,
            vx: Math.cos(angle) * distance, // Скорость по оси X
            vy: Math.sin(angle) * distance, // Скорость по оси Y
            size: pieceMinSize + Math.random() * (pieceMaxSize - pieceMinSize), // Размер частички
            color: rect.color, // Цвет частички такой же, как у квадрата
            opacity: 1,
        });
    }
}

// Функция для анимации частиц
function animatePieces() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка канваса
    drawGrid(); // Перерисовка сетки
    drawStars(); // Рисуем звезды

    // Перемещение и отрисовка частиц
    pieces.forEach((piece, index) => {
        piece.x += piece.vx * pieceSpeedFactor; // Уменьшаем скорость по оси X
        piece.y += piece.vy * pieceSpeedFactor; // Уменьшаем скорость по оси Y
        piece.opacity -= 0.015; // Уменьшена скорость исчезновения

        ctx.fillStyle = `rgba(${parseInt(piece.color.slice(1, 3), 16)}, ${parseInt(piece.color.slice(3, 5), 16)}, ${parseInt(piece.color.slice(5, 7), 16)}, ${piece.opacity})`;
        ctx.fillRect(piece.x, piece.y, piece.size, piece.size); // Рисуем квадратные частицы

        // Удаляем частицы, когда они становятся невидимыми или выходят за границы канваса
        if (piece.opacity <= 0 || piece.y > canvas.height || piece.x < 0 || piece.x > canvas.width) {
            pieces.splice(index, 1);
        }
    });

    requestAnimationFrame(animatePieces); // Запуск следующего кадра
}

// Запуск начальной отрисовки и анимации
createGrid();
starImg.onload = animatePieces; // Запускаем анимацию только после загрузки изображения звезды

// Функция для удаления случайных квадратов
function removeRandomRectangles(count) {
    // Сбрасываем состояние
    rectangles.length = 0;
    pieces.length = 0;
    stars.length = 0;

    createGrid(); // Создаем новую сетку
    let removed = 0;

    function removeNextRectangle() {
        if (removed < count && rectangles.length > 0) {
            const randomIndex = Math.floor(Math.random() * rectangles.length); // Случайный индекс
            if (rectangles[randomIndex]) {
                stars.push({
                    x: rectangles[randomIndex].x + rectangles[randomIndex].size / 2, // Центр квадрата
                    y: rectangles[randomIndex].y + rectangles[randomIndex].size / 2, // Центр квадрата
                });
                createPieces(rectangles[randomIndex]); // Создаём частицы для выбранного квадрата
                rectangles.splice(randomIndex, 1); // Удаляем случайный прямоугольник
            }
            removed++;

            // Удаляем следующий квадрат через 500 мс (ускорено с 600)
            setTimeout(removeNextRectangle, 500);
        }
    }

    removeNextRectangle(); // Начать удаление квадратов
}

// Функция для обработки сценариев удаления
function handleScenario(input) {
    switch (input) {
        case 1:
            removeRandomRectangles(getRandomIndex()); // Уничтожить случайное количество квадратов
            break;
        case 3:
            removeRandomRectangles(getRandomIndex()); // Уничтожить случайное количество квадратов
            break;
        case 5:
            removeRandomRectangles(getRandomIndex()); // Уничтожить случайное количество квадратов
            break;
        case 7:
            removeRandomRectangles(getRandomIndex()); // Уничтожить случайное количество квадратов
            break;
        default:
            console.log('Нет сценария для этого значения'); // Обработка неизвестных значений
            break;
    }
}

function getRandomIndex() {
    return parseInt((Math.random() * (10-3)+3).toFixed(0)); // Используем parseInt для точности
}

// Функция для центрирования канваса
function centerCanvas() {
    if (canvas) {
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
    }
}

// Вызываем центрирование после инициализации
window.addEventListener('load', function() {
    setTimeout(() => {
        centerCanvas();
        resizeCanvas();
    }, 100);
});

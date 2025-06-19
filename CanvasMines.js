const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Функция для установки фиксированного размера канваса
function resizeCanvas() {
    const size = 210; // Размер канваса
    canvas.width = size;
    canvas.height = size;

    const totalSpacing = size * 0.06; // Отступы
    const availableSize = size - totalSpacing;

    rectSize = availableSize / gridSize;
    spacing = totalSpacing / (gridSize - 1);

    createGrid();
    drawGrid();
}

// Вызов resizeCanvas при загрузке страницы
window.addEventListener('load', resizeCanvas);

// Загрузка изображений
const rectangleImg = new Image();
rectangleImg.src = "RectangleMines.svg";
const starImg = new Image();
starImg.src = "StarMines.svg";

// Кастомизируемые переменные
let gridSize = 5;
let rectSize = 100;
let spacing = 8;
let pieceCount = 30;
let pieceMinSize = 3;
let pieceMaxSize = 8;
let pieceSpeedFactor = 0.04;
let pieceColor = '#0168CF';
let starSize = 32;

const rectangles = [];
const pieces = [];
const stars = [];

// Функция для создания начальной сетки
function createGrid() {
    rectangles.length = 0;

    // Увеличиваем отступ сверху для сдвига вниз
    const offsetX = 8;
    const offsetY = 15; // Увеличено с 8 до 15 - сдвигает сетку ниже

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            rectangles.push({
                x: j * (rectSize + spacing) + offsetX,
                y: i * (rectSize + spacing) + offsetY, // ← ЭТО сдвигает сетку ниже
                size: rectSize,
                color: pieceColor,
                index: i * gridSize + j,
            });
        }
    }
}

// Функция для рисования изображения прямоугольника
function drawRectangleImage(x, y, size) {
    ctx.drawImage(rectangleImg, x, y, size, size);
}

// Функция для рисования сетки
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#090E1D";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    rectangles.forEach(rect => {
        drawRectangleImage(rect.x, rect.y, rect.size);
    });
}

// Функция для рисования звезды с использованием изображения
function drawStarImage(x, y, size) {
    ctx.drawImage(starImg, x - size / 2, y - size / 2, size, size);
}

// Функция для рисования звёзд
function drawStars() {
    stars.forEach(star => {
        drawStarImage(star.x, star.y, starSize);
    });
}

// Функция для создания частиц
function createPieces(rect) {
    for (let i = 0; i < pieceCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 80 + 25;

        pieces.push({
            x: rect.x + rect.size / 2,
            y: rect.y + rect.size / 2,
            vx: Math.cos(angle) * distance,
            vy: Math.sin(angle) * distance,
            size: pieceMinSize + Math.random() * (pieceMaxSize - pieceMinSize),
            color: rect.color,
            opacity: 1,
        });
    }
}

// Функция для анимации частиц
function animatePieces() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawStars();

    pieces.forEach((piece, index) => {
        piece.x += piece.vx * pieceSpeedFactor;
        piece.y += piece.vy * pieceSpeedFactor;
        piece.opacity -= 0.015;

        ctx.fillStyle = `rgba(${parseInt(piece.color.slice(1, 3), 16)}, ${parseInt(piece.color.slice(3, 5), 16)}, ${parseInt(piece.color.slice(5, 7), 16)}, ${piece.opacity})`;
        ctx.fillRect(piece.x, piece.y, piece.size, piece.size);

        if (piece.opacity <= 0 || piece.y > canvas.height || piece.x < 0 || piece.x > canvas.width) {
            pieces.splice(index, 1);
        }
    });

    requestAnimationFrame(animatePieces);
}

// Запуск начальной отрисовки и анимации
createGrid();
starImg.onload = animatePieces;

// Функция для удаления случайных квадратов
function removeRandomRectangles(count) {
    rectangles.length = 0;
    pieces.length = 0;
    stars.length = 0;

    createGrid();
    let removed = 0;

    function removeNextRectangle() {
        if (removed < count && rectangles.length > 0) {
            const randomIndex = Math.floor(Math.random() * rectangles.length);
            if (rectangles[randomIndex]) {
                stars.push({
                    x: rectangles[randomIndex].x + rectangles[randomIndex].size / 2,
                    y: rectangles[randomIndex].y + rectangles[randomIndex].size / 2,
                });
                createPieces(rectangles[randomIndex]);
                rectangles.splice(randomIndex, 1);
            }
            removed++;

            setTimeout(removeNextRectangle, 500);
        }
    }

    removeNextRectangle();
}

// Функция для обработки сценариев удаления
function handleScenario(input) {
    switch (input) {
        case 1:
            removeRandomRectangles(getRandomIndex());
            break;
        case 3:
            removeRandomRectangles(getRandomIndex());
            break;
        case 5:
            removeRandomRectangles(getRandomIndex());
            break;
        case 7:
            removeRandomRectangles(getRandomIndex());
            break;
        default:
            console.log('Нет сценария для этого значения');
            break;
    }
}

function getRandomIndex() {
    return parseInt((Math.random() * (10-3)+3).toFixed(0));
}

// Функция для центрирования канваса
function centerCanvas() {
    if (canvas) {
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
        // Добавляем небольшой отступ сверху для канваса
        canvas.style.marginTop = '5px'; // ← ЭТО тоже сдвигает канвас ниже
    }
}

// Вызываем центрирование после инициализации
window.addEventListener('load', function() {
    setTimeout(() => {
        centerCanvas();
        resizeCanvas();
    }, 100);
});

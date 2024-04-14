// Получение элементов из HTML-документа
const diceValue1 = document.getElementById('diceValue1');
const diceValue2 = document.getElementById('diceValue2');
const diceSum = document.getElementById('diceSum');
const startBtn = document.getElementById('startBtn');
const playerMove = document.getElementById('playerMove');
const playerScoresElements = document.querySelectorAll('.playerinfo p:nth-child(2)');


// Получение элементов из HTML-документа
const playerNameInput = document.getElementById('playerNameInput');
const setNameBtn = document.getElementById('setNameBtn');
const playerInfoElements = document.querySelectorAll('.playerinfo p:first-child');


// Объявляем массив для хранения имен игроков
let playerNames = [];

// Добавляем обработчик события на кнопку "Отправить"
setNameBtn.addEventListener('click', setPlayerName);

// Функция для установки имени текущего игрока
function setPlayerName() {
    const playerName = playerNameInput.value;
    
    // Сохраняем имя текущего игрока в массив
    playerNames[currentPlayer] = playerName;
    
    // Устанавливаем имя для текущего игрока с иконкой
    playerInfoElements[currentPlayer].innerHTML = `<i class="fa-solid fa-splotch"></i>${playerName}`;

    console.log(`Имя ${playerName} установлено для игрока ${currentPlayer + 1}`);
    
    // Очищаем поле ввода имени
    playerNameInput.value = '';
    
    // Увеличиваем номер текущего игрока
    currentPlayer = (currentPlayer + 1) % 4;

    document.querySelector('.textbox p').innerHTML = `Укажите имя для ${currentPlayer} игрока`
}

// Объявляем переменные
let currentPlayer = 0;
let playerScores = [0, 0, 0, 0];

// Добавляем обработчик события на кнопку
startBtn.addEventListener('click', handleClick);

// Функция для обновления информации о текущем ходе
function updateCurrentPlayerInfo() {
    playerMove.innerHTML = `Ход игрока ${playerNames[currentPlayer]}`;
}

// Функция для обработки нажатия кнопки
function handleClick() {
    console.log(`Обрабатывается ход игрока ${playerNames[currentPlayer]}`);
    
    // Генерация случайных чисел (бросок кубика)
    const [random1, random2] = generateRandomNumbers();
    const sum = random1 + random2;

    // Добавление очков текущему игроку
    playerScores[currentPlayer] += sum;

    // Обновление интерфейса
    updateUI(random1, random2, sum, playerNames[currentPlayer]);

    // Обновление счета игроков
    updatePlayerScores();

    // Проверка, достиг ли текущий игрок 100 очков
    if (playerScores[currentPlayer] >= 100) {
        console.log(`Игрок ${playerNames[currentPlayer]} победил!`);
        alert(`Игрок ${playerNames[currentPlayer]} победил!`);
        startBtn.disabled = true; // Отключение кнопки, чтобы остановить игру
        return;
    }

    // Переход к следующему игроку
    currentPlayer = (currentPlayer + 1) % 4;
    
    // Обновляем информацию о текущем ходе
    updateCurrentPlayerInfo();
}


// Функция для генерации случайных чисел (бросок кубика)
function generateRandomNumbers() {
    const random1 = Math.floor(Math.random() * 6) + 1;
    const random2 = Math.floor(Math.random() * 6) + 1;
    
    return [random1, random2];
}

// Функция для обновления интерфейса
function updateUI(random1, random2, sum, playerNumber) {
    diceValue1.innerHTML = `${random1}`;
    diceValue2.innerHTML = `${random2}`;
    diceSum.innerHTML = `Сумма: ${sum}`;
    console.log(`Игрок ${playerNumber} бросил кубики: ${random1} и ${random2}. Сумма: ${sum}`);
}

// Функция для обновления счета игроков
function updatePlayerScores() {
    playerScoresElements.forEach((scoreElement, index) => {
        scoreElement.innerHTML = `Счет: ${playerScores[index]}<i class="fa-solid fa-heart"></i>`;
    });
    console.log(`Счет игроков: ${playerScores.join(', ')}`);
}

// Получение элемента кнопки сброса
const resetBtn = document.getElementById('resetBtn');

// Добавление обработчика события на кнопку сброса
resetBtn.addEventListener('click', resetGame);

// Функция для сброса игры
function resetGame() {
    // Сброс переменных состояния игры
    currentPlayer = 0;
    playerScores = [0, 0, 0, 0];
    
    // Обновление интерфейса
    updateUI(0, 0, 0, 1); // Обнуляем броски и сумму
    updatePlayerScores(); // Обнуляем счет игроков
    playerMove.innerHTML = 'Ход игрока Player1'; // Возвращаем ход первому игроку
    startBtn.disabled = false; // Включаем кнопку начала игры
    console.log('Игра сброшена');
}

const activateEnterName = document.getElementById('activateGame')

activateEnterName.addEventListener('click', activateEnterNameFunc)

function activateEnterNameFunc() {
    document.querySelector('.startanimation').style.display = 'none';
    document.querySelector('.enternamebox').style.display = 'flex'
}

const startGameBtn = document.getElementById('startGameBtn')

startGameBtn.addEventListener('click', activateGameFunc)

function activateGameFunc() {
    document.querySelector('.enternamebox').style.display = 'none'

    document.querySelector('.container').style.display = 'flex'
    document.querySelector('.playercount').style.display = 'flex'
}


// Список всех файлов для предзагрузки
const preloadConfig = {
    images: [
        "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/GlutenFreeNiceWombatFloof-x_IDxtwcgejY48Qg/c7037cdd-f4e5-4b06-95bb-e762a2a1bea3/preview.jpg",
        "https://photoshop-kopona.com/uploads/posts/2020-03/1585408104_plane-6.jpg",
        "https://static-cdn.jtvnw.net"
    ],
    sounds: [
        "https://www.soundjay.com/mechanical/sounds/explosion-01.mp3",
        "https://www.myinstants.com/media/sounds/cannon.mp3",
        "https://www.myinstants.com/media/sounds/ia-nasral-v-turbinu-samoleta.mp3",
        "nobody.mp3",
        "idk.mp3",
        "https://www.myinstants.com/media/sounds/otbivka-dlia-shou.mp3"
    ]
};

// Кэш для предзагруженных аудио
const audioCache = {};

// Функция предзагрузки с обработкой ошибок
function startPreload() {
    // Грузим картинки
    preloadConfig.images.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onerror = () => console.log(`Не удалось загрузить изображение: ${url}`);
    });

    // Грузим звуки в кэш
    preloadConfig.sounds.forEach(url => {
        const audio = new Audio();
        audio.src = url;
        audio.preload = "auto";
        audio.onerror = () => console.log(`Не удалось загрузить звук: ${url}`);
        audioCache[url] = audio;
    });
}

// Функция для безопасного воспроизведения звука
function playSound(url) {
    if (audioCache[url]) {
        // Используем кэшированный аудио элемент
        const audio = audioCache[url].cloneNode();
        audio.play().catch(e => console.log("Ошибка воспроизведения:", e));
    } else {
        // Если нет в кэше, создаём новый
        const audio = new Audio(url);
        audio.play().catch(e => console.log("Ошибка воспроизведения:", e));
    }
}

// Функция тряски экрана
function triggerShake() {
    document.body.classList.add('shake-active');
    setTimeout(() => {
        document.body.classList.remove('shake-active');
    }, 300);
}

// Функция сброса стилей кнопки
function resetButtonStyles() {
    btn.style = '';
    btn.classList.remove('rainbow-active');
    btn.innerText = 'Нажми меня';
    btn.style.backgroundColor = '#4CAF50';
    btn.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.5)';
    btn.style.opacity = '1';
    btn.style.transform = '';
    btn.style.pointerEvents = 'auto';
}

// Получаем кнопку и проверяем её существование
const btn = document.getElementById('mainButton');
if (!btn) {
    console.error('Кнопка с id "mainButton" не найдена!');
}

// Массив эффектов
const effects = [
    explodeButton,
    crushButton,
    dj,
    blue,
    crushButton2,
    nobody,
    nothing
];

// Запускаем предзагрузку
startPreload();

// Обработчик клика
if (btn) {
    btn.addEventListener('click', () => {
        btn.style.pointerEvents = 'none';
        
        const randomIndex = Math.floor(Math.random() * effects.length);
        effects[randomIndex]();

        setTimeout(() => {
            location.reload();
        }, 5000);
    });
}

// --- ЭФФЕКТ 1: ВЗРЫВ ---
function explodeButton() {
    btn.style.opacity = '0';
    const rect = btn.getBoundingClientRect();
    playSound("https://www.soundjay.com/mechanical/sounds/explosion-01.mp3");
    
    const konElement = document.getElementById('kon');
    if (konElement) konElement.innerText = "Концовка: 1 (ВЗРЫВ)";
    
    for (let i = 0; i < 30; i++) {
        const shard = document.createElement('div');
        shard.className = 'shard';
        triggerShake();
        shard.style.left = rect.left + rect.width / 2 + 'px';
        shard.style.top = rect.top + rect.height / 2 + 'px';
        shard.style.setProperty('--dx', (Math.random() - 0.5) * 600 + 'px');
        shard.style.setProperty('--dy', (Math.random() - 0.5) * 600 + 'px');
        shard.style.animation = `explode 1s ease-out forwards`;
        document.body.appendChild(shard);
        setTimeout(() => shard.remove(), 1000);
    }
}

// --- ЭФФЕКТ 2: ПРЕСС ---
function crushButton() {
    const crusher = document.createElement('div');
    crusher.className = 'crusher';
    
    const imageUrl = "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/GlutenFreeNiceWombatFloof-x_IDxtwcgejY48Qg/c7037cdd-f4e5-4b06-95bb-e762a2a1bea3/preview.jpg"; 
    crusher.style.backgroundImage = `url('${imageUrl}')`;

    document.body.appendChild(crusher);
    crusher.style.animation = "crush-down 0.4s ease-in forwards";

    setTimeout(() => {
        playSound("https://www.myinstants.com/media/sounds/cannon.mp3");
        triggerShake();
        
        const konElement = document.getElementById('kon');
        if (konElement) konElement.innerText = "Концовка: 2 (T2X2)";
        
        btn.style.transition = "transform 0s";
        btn.style.transform = "scaleY(0.1) translateY(300px)"; 
    }, 400);
    
    setTimeout(() => {
        crusher.remove();
    }, 1000);
}

// --- ЭФФЕКТ 3: ДИДЖЕЙ ---
function dj() {
    playSound("https://www.myinstants.com/media/sounds/otbivka-dlia-shou.mp3");
    triggerShake();
    
    const konElement = document.getElementById('kon');
    if (konElement) konElement.innerText = "Концовка: 3 (Диджей)";

    btn.classList.add('rainbow-active');

    // Добавляем стили для rainbow эффекта
    const style = document.createElement('style');
    style.textContent = `
        .rainbow-active {
            animation: rainbow 2s linear infinite;
        }
        @keyframes rainbow {
            0% { background-color: #ff0000; }
            16% { background-color: #ffff00; }
            33% { background-color: #00ff00; }
            50% { background-color: #00ffff; }
            66% { background-color: #0000ff; }
            83% { background-color: #ff00ff; }
            100% { background-color: #ff0000; }
        }
    `;
    document.head.appendChild(style);

    // Тряска в ритм
    const interval = setInterval(triggerShake, 500);
    setTimeout(() => clearInterval(interval), 4000);
}

// --- ЭФФЕКТ 4: ОУ МАЙ ---
function blue() {
    triggerShake();
    
    const konElement = document.getElementById('kon');
    if (konElement) konElement.innerText = "Концовка: 4 (Оу Май)";
    
    playSound("https://www.myinstants.com/media/sounds/ia-nasral-v-turbinu-samoleta.mp3");
    btn.style.backgroundColor = 'blue';
    btn.style.boxShadow = '0 0 15px blue';
    btn.innerText = "ТЫ ТЕПЕРЬ ГОЛУБОЙ :)";
}

// --- ЭФФЕКТ 5: САМОЛЁТ ---
function crushButton2() {
    const crusher = document.createElement('div');
    crusher.className = 'crusher';
    
    const imageUrl = "https://photoshop-kopona.com/uploads/posts/2020-03/1585408104_plane-6.jpg"; 
    crusher.style.backgroundImage = `url('${imageUrl}')`;

    document.body.appendChild(crusher);
    crusher.style.animation = "crush-left 1.4s forwards";
    btn.style.animation = "crush-leftbtn 1.4s forwards";

    setTimeout(() => {
        btn.style.animation = "none"; 
        btn.style.transition = "transform 0.1s ease-out"; 
        playSound("https://www.myinstants.com/media/sounds/cannon.mp3");
        triggerShake();
        
        const konElement = document.getElementById('kon');
        if (konElement) konElement.innerText = "Концовка: 5 (Самолёт)";
        
        document.body.style.backgroundColor = "#272727"; 
    }, 400);
    
    setTimeout(() => {
        crusher.remove();
    }, 1500);
}

// --- ЭФФЕКТ 6: ПУСТОТА ---
function nobody() {
    triggerShake();
    playSound("nobody.mp3");
    btn.style.backgroundColor = 'black';
    btn.style.boxShadow = '0 0 15px black';
    btn.innerText = "Ты больше не в сознании. ты ничего не чувствуешь.";
    document.body.style.backgroundColor = "#0c0c0c";
    
    const konElement = document.getElementById('kon');
    if (konElement) konElement.innerText = "Концовка: 6 (Пустота.)";
    
    const versionElement = document.getElementById('version');
    if (versionElement) versionElement.innerText = "D.E.A.T.H";
}

// --- ЭФФЕКТ 7: ПОВЕЗЛО ---
function nothing() {
    playSound("idk.mp3");
    btn.innerText = "Тебе повезло. Ничего не произошло.";
    
    const konElement = document.getElementById('kon');
    if (konElement) konElement.innerText = "Концовка: 7 (Повезло)";
    
    setTimeout(() => {
        resetButtonStyles();
    }, 3000);
}

document.head.appendChild(styleElement);
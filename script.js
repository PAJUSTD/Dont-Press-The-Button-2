const btn = document.getElementById('mainButton');

// Теперь у нас два крутых эффекта
const effects = [
    explodeButton,
    crushButton,
    dj,
    blue,
    crushButton2,
    nobody,
    nothing
];

function triggerShake() {
    // Добавляем класс тряски к body
    document.body.classList.add('shake-active');

    // Удаляем класс через 300мс, чтобы можно было трясти снова
    setTimeout(() => {
        document.body.classList.remove('shake-active');
    }, 300);
}


btn.addEventListener('click', () => {
    btn.style.pointerEvents = 'none'; // Блокируем сразу
    
    const randomIndex = Math.floor(Math.random() * effects.length);
    effects[randomIndex]();

    // Перезагрузка через 5 секунд
    setTimeout(() => {
        location.reload();
    }, 5000);
});

// --- ЭФФЕКТ 1: ВЗРЫВ (тот, что мы делали раньше) ---
function explodeButton() {
    btn.style.opacity = '0';
    const rect = btn.getBoundingClientRect();
    const sound2 = new Audio("https://www.soundjay.com/mechanical_c2026/sounds/explosion-01.mp3")
    sound2.play();
    document.getElementById('kon').innerText = "Концовка: 1 (ВЗРЫВ)";
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
// --- ЭФФЕКТ 2: ПРЕСС (НОВЫЙ) ---
function crushButton() {
    const crusher = document.createElement('div');
    crusher.className = 'crusher';
    
    // Прямая ссылка на прозрачную наковальню для примера
    const imageUrl = "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/GlutenFreeNiceWombatFloof-x_IDxtwcgejY48Qg/c7037cdd-f4e5-4b06-95bb-e762a2a1bea3/preview.jpg"; 
    crusher.style.backgroundImage = `url('${imageUrl}')`;

    document.body.appendChild(crusher);
    crusher.style.animation = "crush-down 0.4s ease-in forwards";

    setTimeout(() => {
        const sound = new Audio("https://www.myinstants.com/media/sounds/cannon.mp3")
        sound.play();
        triggerShake();
        document.getElementById('kon').innerText = "Концовка: 2 (T2X2)";
        btn.style.transition = "transform 0s";
        btn.style.transform = "scaleY(0.1) translateY(300px)"; 
        setTimeout(() => {
        }, 100);
    }, 400);
}
function dj() {
    new Audio("theme2.mp3").play();
    triggerShake();
   document.getElementById('kon').innerText = "Концовка: 3 ()";

    btn.classList.add('rainbow-active');

    // Тряска в ритм (каждые 400мс)
    const interval = setInterval(triggerShake, 500);
}


function blue() {
    triggerShake();
   document.getElementById('kon').innerText = "Концовка: 4 (Оу Май)";
    const sound = new Audio("https://www.myinstants.com/media/sounds/ia-nasral-v-turbinu-samoleta.mp3").play()
    btn.style.backgroundColor = 'blue';
    btn.style.boxShadow = '0 0 15px blue'; // Добавили параметры тени
    btn.innerText = "ТЫ ТЕПЕРЬ ГОЛУБОЙ :)";
}

function crushButton2() {
    const crusher = document.createElement('div');
    crusher.className = 'crusher';
    
    // Прямая ссылка на прозрачную наковальню для примера
    const imageUrl = "https://photoshop-kopona.com/uploads/posts/2020-03/1585408104_plane-6.jpg "; 
    crusher.style.backgroundImage = `url('${imageUrl}')`;

    document.body.appendChild(crusher);
    crusher.style.animation = "crush-left 1.4s forwards";
    btn.style.animation = "crush-leftbtn 1.4s forwards";

    setTimeout(() => {
        btn.style.animation = "none"; 
        btn.style.transition = "transform 0.1s ease-out"; 
        const sound = new Audio("https://www.myinstants.com/media/sounds/cannon.mp3")
        sound.play();
        triggerShake();
        
        
        document.getElementById('kon').innerText = "Концовка: 5 (Самолёт)";
        document.body.style.backgroundColor = "#272727"; 
        setTimeout(() => {
        }, 100);
    }, 400);
}


function nobody() {
    triggerShake();
    const sound = new Audio("nobody.mp3").play()
    btn.style.backgroundColor = 'black';
    btn.style.boxShadow = '0 0 15px black'; // Добавили параметры тени
    btn.innerText = "Ты больше не в сознании. ты ничего не чувствуешь.";
    document.body.style.backgroundColor = "#0c0c0c";
    document.getElementById('kon').innerText = "Концовка: 6 (Пустота.)";
    document.getElementById('version').innerText = "D.E.A.T.H";
}


function nothing() {
    const sound = new Audio("idk.mp3").play()
    btn.innerText = "Тебе повезло. Ничего не произошло.";
    document.getElementById('kon').innerText = "Концовка: 7 (Повезло)";
}
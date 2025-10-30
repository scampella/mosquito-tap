const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mosquito;
let speed = 2;
let score = 0;
let splashes = [];
let bgColor = "#f0f0f0";

// 🎧 Добавляем звуки
const buzzSound = new Audio("sounds/buzz.mp3");
buzzSound.loop = true;
buzzSound.volume = 0.2;

const hitSound = new Audio("sounds/hit.mp3");

// 🪰 Создание комара
function createMosquito() {
    const size = 60;
    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);
    const vx = (Math.random() - 0.5) * speed * 3;
    const vy = (Math.random() - 0.5) * speed * 3;
    return { x, y, vx, vy, size };
}

// 🩸 Брызги крови
function createSplash(x, y) {
    for (let i = 0; i < 15; i++) {
        splashes.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1
        });
    }
}

function drawSplashes() {
    for (let s of splashes) {
        ctx.fillStyle = `rgba(200,0,0,${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fill();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.03;
    }
    splashes = splashes.filter(s => s.life > 0);
}

function drawMosquito() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.ellipse(mosquito.x, mosquito.y, mosquito.size / 2, mosquito.size / 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // крылышки
    ctx.fillStyle = "rgba(150,150,255,0.6)";
    ctx.beginPath();
    ctx.ellipse(mosquito.x - 15, mosquito.y - 20, 15, 8, -0.5, 0, Math.PI * 2);
    ctx.ellipse(mosquito.x + 15, mosquito.y - 20, 15, 8, 0.5, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    mosquito.x += mosquito.vx;
    mosquito.y += mosquito.vy;

    if (mosquito.x < 0 || mosquito.x > canvas.width) mosquito.vx *= -1;
    if (mosquito.y < 0 || mosquito.y > canvas.height) mosquito.vy *= -1;

    drawMosquito();
    drawSplashes();

    ctx.fillStyle = "black";
    ctx.font = "bold 28px Arial";
    ctx.fillText(`Очки: ${score}`, 20, 40);

    // 🌙 Смена фона после 10 очков
    if (score >= 10) bgColor = "#001122";
    if (score >= 10) ctx.fillStyle = "white";

    requestAnimationFrame(update);
}

// 🔧 Обработка кликов
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - mosquito.x;
    const dy = y - mosquito.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mosquito.size / 2) {
        score++;
        speed += 0.2;
        hitSound.currentTime = 0;
        hitSound.play();
        createSplash(mosquito.x, mosquito.y);
        mosquito = createMosquito();
    }
});

// 🚀 Старт
window.onload = () => {
    mosquito = createMosquito();
    update();
    buzzSound.play();
};

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mosquito;
let speed = 2;
let score = 0;

function createMosquito() {
    const size = 60;
    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);
    const vx = (Math.random() - 0.5) * speed * 3;
    const vy = (Math.random() - 0.5) * speed * 3;

    return { x, y, vx, vy, size };
}

function drawMosquito() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(mosquito.x, mosquito.y, mosquito.size / 2, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    mosquito.x += mosquito.vx;
    mosquito.y += mosquito.vy;

    if (mosquito.x < 0 || mosquito.x > canvas.width) mosquito.vx *= -1;
    if (mosquito.y < 0 || mosquito.y > canvas.height) mosquito.vy *= -1;

    drawMosquito();

    ctx.fillStyle = "black";
    ctx.font = "bold 28px Arial";
    ctx.fillText(`Очки: ${score}`, 20, 40);

    requestAnimationFrame(update);
}

// 🔧 Исправление: корректное вычисление клика
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - mosquito.x;
    const dy = y - mosquito.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mosquito.size / 2) {
        score++;
        speed += 0.2; // увеличиваем скорость с каждым попаданием
        mosquito = createMosquito();
    }
});

window.onload = () => {
    mosquito = createMosquito();
    update();
};

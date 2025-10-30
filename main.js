const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mosquito;
let speed = 2; // ✅ сначала объявляем speed
let score = 0;

function createMosquito() {
    const size = 50;
    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);
    const vx = (Math.random() - 0.5) * speed * 2;
    const vy = (Math.random() - 0.5) * speed * 2;

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

    // Отскоки от стен
    if (mosquito.x < 0 || mosquito.x > canvas.width) mosquito.vx *= -1;
    if (mosquito.y < 0 || mosquito.y > canvas.height) mosquito.vy *= -1;

    drawMosquito();

    // Очки
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText(`Очки: ${score}`, 20, 40);

    requestAnimationFrame(update);
}

canvas.addEventListener("click", (e) => {
    const dx = e.clientX - mosquito.x;
    const dy = e.clientY - mosquito.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mosquito.size / 2) {
        score++;
        mosquito = createMosquito();
    }
});

window.onload = () => {
    mosquito = createMosquito();
    update();
};

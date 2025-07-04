// Partículas flotantes
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 100;

// Posición del mouse
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

for(let i = 0; i < numParticles; i++){
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3
    });
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
    });
}

function update(){
    particles.forEach(p => {
        let dx = (mouse.x - p.x) * 0.001;
        let dy = (mouse.y - p.y) * 0.001;
        p.x += p.dx + dx;
        p.y += p.dy + dy;

        if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
}

function animate(){
    draw();
    update();
    requestAnimationFrame(animate);
}

// Mouse interactividad solo para desktop
if (window.innerWidth > 768) {
    window.addEventListener('mousemove', function(e){
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
}

// Ajuste de tamaño al redimensionar
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.x = canvas.width / 2;
    mouse.y = canvas.height / 2;
});

animate();

// Redirección con fade out
document.addEventListener('click', function(){
    document.body.style.transition = "opacity 1s";
    document.body.style.opacity = "0";

    setTimeout(() => {
        const targetUrl = location.origin + "/html/Inicio.html";  // Ajusta la ruta si es necesario
        console.log("Redirigiendo a:", targetUrl);
        window.location.href = targetUrl;
    }, 1000);
});

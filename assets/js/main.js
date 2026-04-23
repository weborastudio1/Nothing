/* Cursor */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let x = 0, y = 0, rx = 0, ry = 0;

document.addEventListener("mousemove", e => {
  x = e.clientX;
  y = e.clientY;
});

function cursorLoop() {
  if (!cursor || !ring) return;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
  rx += (x - rx) * 0.1;
  ry += (y - ry) * 0.1;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

/* Canvas Particles */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let w, h;
const particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 0.5,
    vx: Math.random() * 0.3,
    vy: Math.random() * 0.3
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(0,240,255,0.6)";
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x > w || p.y > h) {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
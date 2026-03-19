const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

let width, height;
const fontSize = 24;
let columns = 0;
let rainDrops = [];
let speeds = [];

// Characters: Katakana + Alphanumeric
const katakana = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    // Initialize rainDrops at random starting positions (above the screen)
    rainDrops = Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));
    // Initialize speeds for each raindrop
    speeds = Array(columns).fill(1).map(() => Math.random() * 0.5 + 0.5); // Speed between 0.5 and 1.0
}

function draw() {
    // Semi-transparent black rectangle creates the "trailing" effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0F0'; // Matrix Green
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const char = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        // Draw the character
        if (Math.random() > 0.98) {
            // Head of the drop (very soft, dimmed)
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.1)';
            ctx.fillStyle = 'rgba(192, 224, 192, 0.5)';
        } else {
            // Normal characters (no glow, very dim)
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(0, 92, 12, 0.3)';
        }

        ctx.fillText(char, x, y);

        // Reset drop to top if it leaves the screen (with a random delay)
        if (y > height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i] += speeds[i];
    }
    // Clear shadow for next frame performance
    ctx.shadowBlur = 0;
}

// Initialize and start loop
window.addEventListener('resize', resize);
resize();
setInterval(draw, 35); // Approx 30fps

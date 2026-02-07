// Particle System
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 + 0.5;
        this.color = '#2A2A2A'; // Ash Grey
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size); // Square particles for 8-bit feel
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    animateParticles();
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Window resize handling
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Dialogue System
const dialogueContainer = document.querySelector('.dialogue-container');
const portraitImg = document.querySelector('.portrait-frame img');
const nameTag = document.querySelector('.name-tag');
const dialogueText = document.querySelector('.dialogue-text');

// Placeholder data since files are missing
const characters = {
    hero: {
        name: "Hero",
        sprite: "harshpromlp-idle-v1.png", // Will break if missing, but following spec
        color: "#00FFFF"
    },
    partner: {
        name: "Partner",
        sprite: "nanlp-idle-v1.png",
        color: "#FF4500"
    }
};

function showDialogue(charKey, text, onComplete) {
    if (!dialogueContainer) return;
    
    const char = characters[charKey];
    if (!char) return;

    dialogueContainer.style.display = 'flex';
    nameTag.textContent = char.name;
    nameTag.style.color = char.color;
    
    // Typewriter effect
    dialogueText.textContent = '';
    let i = 0;
    const speed = 50; 
    
    function typeWriter() {
        if (i < text.length) {
            dialogueText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            if (onComplete) onComplete();
        }
    }
    
    // Set sprite source (using placeholder if actual file fails to load could be handled via onerror)
    portraitImg.src = char.sprite;
    portraitImg.onerror = function() {
        this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%23ccc%22%20width%3D%22100%22%20height%3D%22100%22%2F%3E%3Ctext%20fill%3D%22%23333%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E%3F%3C%2Ftext%3E%3C%2Fsvg%3E';
    };

    typeWriter();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    
    // Example usage for testing
    // setTimeout(() => showDialogue('hero', 'Where... am I? The static is so loud.'), 1000);
});

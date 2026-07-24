document.addEventListener('DOMContentLoaded', () => {
    // Background Space Dust / Stars Canvas Animation
    const canvas = document.createElement('canvas');
    canvas.id = 'space-canvas';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = 120;

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.6,
            alpha: Math.random(),
            speed: Math.random() * 0.15 + 0.05,
            angle: Math.random() * Math.PI * 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            // මඳක් ඉහළට හෝ දෙපැත්තට චලනය වීම (Floating effect)
            p.y -= p.speed;
            p.x += Math.sin(p.angle) * 0.2;
            p.angle += 0.01;

            // උඩටම ගිය පසු නැවත පහළින් මතුවීම
            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }

            // තරු බැබළෙන ස්වභාවය (Twinkling effect)
            p.alpha += (Math.random() - 0.5) * 0.04;
            if (p.alpha < 0.1) p.alpha = 0.1;
            if (p.alpha > 0.9) p.alpha = 0.9;
        });

        requestAnimationFrame(animate);
    }

    animate();
});

// Pair Code Page එක සඳහා (අවශ්‍ය නම්)
async function getPairCode() {
    const phoneInput = document.getElementById('phone');
    const waitingDiv = document.getElementById('waiting');
    const codeDisplay = document.getElementById('code-display');

    if (!phoneInput) return;

    const phone = phoneInput.value.trim();

    if (!phone) {
        alert('කරුණාකර රටේ කේතය සමඟ ඔබේ වට්ස්ඇප් අංකය ඇතුළත් කරන්න! (උදා: 9477xxxxxxx)');
        return;
    }

    if (waitingDiv) waitingDiv.style.display = 'block';
    if (codeDisplay) codeDisplay.innerHTML = '';

    try {
        const response = await fetch(`/pair?phone=${phone}`);
        const data = await response.json();

        if (waitingDiv) waitingDiv.style.display = 'none';
        
        if (data.code && codeDisplay) {
            codeDisplay.innerHTML = data.code;
            navigator.clipboard.writeText(data.code);
        } else if (codeDisplay) {
            codeDisplay.innerHTML = "Error: Could not get code!";
        }
    } catch (error) {
        if (waitingDiv) waitingDiv.style.display = 'none';
        if (codeDisplay) {
            codeDisplay.innerHTML = "Connection Error!";
        }
    }
}

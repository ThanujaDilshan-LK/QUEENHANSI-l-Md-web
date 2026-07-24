// Section Navigation Logic
function showSection(sectionName) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    if (sectionName === 'buy') {
        document.getElementById('buy-section').classList.add('active');
    } else if (sectionName === 'pair') {
        document.getElementById('pair-section').classList.add('active');
    } else {
        document.getElementById('home-section').classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Direct Buy Order to WhatsApp Number (0741933159)
function buyPlan(planName, price) {
    const phoneNumber = "94741933159"; // Your WhatsApp Number
    const message = `Hello QUEENHANSI-MD Admin,\n\nI want to buy the *${planName}* (LKR ${price}).\nPlease send me bank account / payment details.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Real-Time Pair Code Functionality (prabath.top Style)
async function getPairCode() {
    const phoneInput = document.getElementById('phone').value.trim();
    const resultDiv = document.getElementById('pair-result');

    if (!phoneInput || phoneInput.length < 10) {
        resultDiv.innerHTML = `<p style="color: #ff5252; margin-top: 15px; font-weight: bold;">Please enter a valid WhatsApp number with country code!</p>`;
        return;
    }

    resultDiv.innerHTML = `<p style="color: #00e676; margin-top: 15px;"><i class="fa-solid fa-spinner fa-spin"></i> Connecting to Pair Server...</p>`;

    try {
        // [IMPORTANT] Replace this URL with your active Baileys Pair Code API server URL if you have one.
        // E.g., const response = await fetch(`https://your-pair-server.onrender.com/code?number=${phoneInput}`);
        
        // Simulating Backend API Request
        setTimeout(() => {
            // Random formatted Pair Code generation for simulation
            const randomCode = generateRandomPairCode();
            
            resultDiv.innerHTML = `
                <div style="margin-top: 15px;">
                    <p style="color: #aaa; font-size: 0.85rem;">Your WhatsApp Pair Code:</p>
                    <div class="pair-code-display">
                        <span id="code-text">${randomCode}</span>
                        <button class="copy-btn" onclick="copyPairCode('${randomCode}')">
                            <i class="fa-solid fa-copy"></i> Copy
                        </button>
                    </div>
                    <p style="color: #888; font-size: 0.8rem; margin-top: 10px;">
                        Open WhatsApp -> Linked Devices -> Link with Phone Number and enter the code above.
                    </p>
                </div>
            `;
        }, 2000);

    } catch (error) {
        resultDiv.innerHTML = `<p style="color: #ff5252; margin-top: 15px;">Failed to generate code. Please try again later.</p>`;
    }
}

// Utility: Copy Pair Code to Clipboard
function copyPairCode(code) {
    navigator.clipboard.writeText(code);
    alert("Pair Code Copied: " + code);
}

// Utility: Dummy Pair Code Generator
function generateRandomPairCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let part1 = "", part2 = "";
    for (let i = 0; i < 4; i++) part1 += chars.charAt(Math.floor(Math.random() * chars.length));
    for (let i = 0; i < 4; i++) part2 += chars.charAt(Math.floor(Math.random() * chars.length));
    return `${part1}-${part2}`;
}

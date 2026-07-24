// Section Navigation
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

// Buy Plan via WhatsApp Direct Link
function buyPlan(planName, price) {
    const phoneNumber = "94741933159"; // Your WhatsApp Number
    const message = `Hello QUEENHANSI-MD,\nI would like to purchase the *${planName}* (LKR ${price}).\nPlease send me the payment details and instructions.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Pair Code UI Handling
function getPairCode() {
    const phoneInput = document.getElementById('phone').value.trim();
    const resultDiv = document.getElementById('pair-result');

    if (!phoneInput || phoneInput.length < 10) {
        resultDiv.innerHTML = `<p style="color: #ff5252; margin-top: 10px;">Please enter a valid WhatsApp phone number!</p>`;
        return;
    }

    resultDiv.innerHTML = `<p style="color: #00e676; margin-top: 15px;"><i class="fa-solid fa-spinner fa-spin"></i> Generating Pair Code...</p>`;

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div style="background: #00e676; color: #000; font-weight: bold; font-size: 1.5rem; padding: 12px; border-radius: 8px; margin-top: 15px; letter-spacing: 5px;">
                QH92-K82A
            </div>
            <p style="color: #aaa; font-size: 0.8rem; margin-top: 8px;">Check your WhatsApp notification to enter this code in Linked Devices.</p>
        `;
    }, 2000);
}

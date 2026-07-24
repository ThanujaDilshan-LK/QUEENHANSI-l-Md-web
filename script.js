async function getPairCode() {
    const phoneInput = document.getElementById('phoneNumber').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    const loadingDiv = document.getElementById('loading');
    const resultContainer = document.getElementById('resultContainer');
    const pairCodeDisplay = document.getElementById('pairCodeDisplay');

    // Phone number validation
    if (!phoneInput) {
        alert("Please enter your WhatsApp number.");
        return;
    }

    // Hide previous results & show loading
    submitBtn.style.display = 'none';
    resultContainer.style.display = 'none';
    loadingDiv.style.display = 'block';

    try {
        // මෙතනට ඔයාගේ Backend API ලින්ක් එක දාන්න පුළුවන් (e.g., Render URL)
        // const response = await fetch(`https://your-api.onrender.com/code?number=${phoneInput}`);
        
        // Backend එකක් නැති නිසා, තත්පර 2කින් Code එකක් generate වෙන විදිහට හදලා තියෙන්නේ.
        setTimeout(() => {
            const code = generateDummyCode();
            
            loadingDiv.style.display = 'none';
            resultContainer.style.display = 'block';
            submitBtn.style.display = 'block';
            
            pairCodeDisplay.innerText = code;
        }, 2000);

    } catch (error) {
        alert("Error generating pair code. Please try again.");
        loadingDiv.style.display = 'none';
        submitBtn.style.display = 'block';
    }
}

function generateDummyCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
        if (i === 4) code += "-";
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function copyCode() {
    const codeText = document.getElementById('pairCodeDisplay').innerText;
    if (codeText && codeText !== "----") {
        navigator.clipboard.writeText(codeText);
        alert("Pair Code Copied to Clipboard!");
    }
}

// ඔයා කලින් ඉල්ලපු විදිහට WhatsApp එකට මැසේජ් එක යන "Buy Bot" Function එක
function buyBot() {
    const phoneNumber = "94741933159"; // ඔයාගේ නම්බර් එක
    const message = "Hello QUEENHANSI-MD,\nI want to buy the Bot Script. Please provide the details.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

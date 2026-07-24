document.addEventListener('DOMContentLoaded', () => {
    console.log("QUEENHANSI-MD Website Loaded Successfully!");

    // Link card click effect enhancements (Optional smooth handling)
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // ඔබට අවශ්‍ය නම් click කරන විට වෙනත් විශේෂ ක්‍රියාවක් (effects) මෙතැනට එකතු කළ හැක
        });
    });
});

// Pair Code Page එක සඳහා (Pair.html එකේදී භාවිතා කිරීමට)
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
        // ඔබගේ බොට් සර්වර් හෝ API ලින්ක් එක මෙතැනට ලබා දෙන්න
        const response = await fetch(`/pair?phone=${phone}`);
        const data = await response.json();

        if (waitingDiv) waitingDiv.style.display = 'none';
        
        if (data.code && codeDisplay) {
            codeDisplay.innerHTML = data.code;
            
            // Code එක Automatic Copy කරගැනීමට අවශ්‍ය නම්
            navigator.clipboard.writeText(data.code).then(() => {
                console.log('Pair code copied to clipboard!');
            });
        } else if (codeDisplay) {
            codeDisplay.innerHTML = "Error: Could not get code!";
        }
    } catch (error) {
        if (waitingDiv) waitingDiv.style.display = 'none';
        if (codeDisplay) {
            codeDisplay.innerHTML = "Connection Error! Check your backend server.";
        }
    }
}

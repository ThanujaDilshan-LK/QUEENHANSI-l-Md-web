const text =
"Powerful WhatsApp Bot • Fast • Secure • Modern";

let i = 0;

function typing() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 70);
  } else {
    setTimeout(() => {
      document.getElementById("typing").innerHTML = "";
      i = 0;
      typing();
    }, 2000);
  }
}

typing();

// Fade-in animation
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  cards.forEach((card) => {
    const position = card.getBoundingClientRect().top;
    const screen = window.innerHeight;

    if (position < screen - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// Initial card state
cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  card.style.transition = "0.6s";
});

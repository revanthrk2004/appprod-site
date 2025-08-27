console.log("Script loaded!");
document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: "#2F77F1" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 2 },
      line_linked: {
        enable: true,
        distance: 200,
        color: "#2F77F1",
        opacity: 0.9,
        width: 1
      },
      move: { enable: true, speed: 1.5 }
    },
interactivity: {
  detect_on: "canvas",
  events: {
    onhover: { enable: true, mode: "repulse" },
    onclick: { enable: true, mode: "push" },
    resize: true
  },
  modes: {
    grab: { distance: 400, line_linked: { opacity: 1 } },
    bubble: { distance: 400, size: 40, duration: 2, opacity: 8 },
    repulse: { distance: 100 },
    push: { particles_nb: 6 },
    remove: { particles_nb: 2 }
  }
}
,
    retina_detect: true
  });
});


// Carousel Functionality
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".project-slide");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Auto-slide every 6 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}, 6000);

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});



document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = this.name.value;
  const email = this.email.value;
  const message = this.message.value;

  try {
    const res = await fetch('https://appprod-contact-api.onrender.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    if (data.success) {
      showToast(
        `<i class="fas fa-check-circle"></i> Your message has been sent to App Prod. A team member will get back to you shortly.`,
        'success'
      );
      this.reset();
    } else {
      showToast(`<i class="fas fa-exclamation-circle"></i> ${data.error}`, 'error');
    }
  } catch (err) {
    showToast(`<i class="fas fa-server"></i> Server error. Please try again later.`, 'error');
  }
});

function showToast(message, type) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
let hasExited = true; // start assuming it's offscreen

function animateCounters() {
  const counters = document.querySelectorAll(".count");
  const duration = 2000; // Total animation time in milliseconds
  const frameRate = 60; // Adjust for smoother or faster animation
  const totalFrames = duration / (1000 / frameRate);

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    let frame = 0;

    const increment = target / totalFrames;

    const updateCount = () => {
      frame++;
      current += increment;

      if (frame < totalFrames) {
        counter.innerText = Math.floor(current);
        setTimeout(updateCount, 1000 / frameRate);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}


function isFullyInView(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function isFullyOutOfView(el) {
  const rect = el.getBoundingClientRect();
  return rect.bottom < 0 || rect.top > window.innerHeight;
}

window.addEventListener("scroll", () => {
  const metrics = document.querySelector(".metrics");

  if (isFullyOutOfView(metrics)) {
    hasExited = true;
  }

  if (isFullyInView(metrics) && hasExited) {
    hasExited = false;
    animateCounters();
  }
});

const glitchWords = ["DATA", "CODE", "DROP", "SYNC", "FORM", "BOTS", "CORE", "PLAN", "EXEC", "PROD"];
let glitchIndex = 0;

function cycleGlitchWords() {
  const glitchEl = document.getElementById("glitch-word");
  if (!glitchEl) return;

  setInterval(() => {
    glitchEl.classList.remove("glitch-text");
    void glitchEl.offsetWidth; // force reflow to restart animation
    glitchEl.textContent = glitchWords[glitchIndex];
    glitchEl.classList.add("glitch-text");

    glitchIndex = (glitchIndex + 1) % glitchWords.length;
  }, 1900); // every 3 seconds
}

document.addEventListener("DOMContentLoaded", cycleGlitchWords);

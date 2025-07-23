// Particles Background
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
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
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

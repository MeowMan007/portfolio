/* ==========================================================================
   🌳 ARSHAL'S AESTHETIC BACKGROUND TREE & DYNAMIC WIND SCRIPTS
   ========================================================================== */

let currentWind = 0.35;
let targetWind = 0.35;
let isGusting = false;
let windDirection = 1; // 1 = rightward, -1 = leftward

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWindGust();
  initSkillsFilter();
  initScrollReveal();
  initLeafCanvas();
  initPollenTrail();
  initAutomaticWind();
  initContactForm();
});

/* --- Navbar Interactivity --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars-staggered';
    }
  });

  // Close menu and toggle icon when link clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    });
  });
}

/* --- Dynamic Wind Gust Trigger (Universal logic for manual & auto) --- */
function triggerWindGust(dir) {
  if (isGusting) return;
  isGusting = true;

  const windBtn = document.getElementById('wind-gust-btn');
  const branchBg = document.querySelector('.profile-branch-bg');

  if (windBtn) windBtn.classList.add('active');

  if (branchBg) {
    if (dir > 0) {
      branchBg.classList.add('wind-active-right');
      branchBg.classList.remove('wind-active-left');
    } else {
      branchBg.classList.add('wind-active-left');
      branchBg.classList.remove('wind-active-right');
    }
  }

  // Set target wind speed: positive (right) or negative (left)
  targetWind = dir * 6.0;

  // Decay wind back to default gradually
  setTimeout(() => {
    targetWind = 0.35;
    setTimeout(() => {
      isGusting = false;
      if (windBtn) windBtn.classList.remove('active');
      if (branchBg) {
        branchBg.classList.remove('wind-active-right', 'wind-active-left');
      }
    }, 2800);
  }, 2200);
}

/* --- Manual Wind click override --- */
function initWindGust() {
  const windBtn = document.getElementById('wind-gust-btn');
  if (!windBtn) return;

  windBtn.addEventListener('click', () => {
    // Choose a random direction on manual click
    const manualDir = Math.random() > 0.5 ? 1 : -1;
    triggerWindGust(manualDir);
  });
}

/* --- Automatic Periodical Wind Gusts (Both Directions) --- */
function initAutomaticWind() {
  // Trigger an automatic wind gust alternating directions every 18 seconds
  setInterval(() => {
    triggerWindGust(windDirection);
    windDirection = -windDirection; // Toggle direction for the next cycle
  }, 18000);
}

/* --- Skills Garden Filter --- */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skills-tab');
  const buds = document.querySelectorAll('.skill-bud');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      buds.forEach(bud => {
        const type = bud.getAttribute('data-type');
        if (category === 'all' || type === category) {
          bud.classList.add('show');
          bud.style.animation = 'none';
          bud.offsetHeight; // Reflow
          bud.style.animation = '';
        } else {
          bud.classList.remove('show');
        }
      });
    });
  });
}

/* --- Scroll Reveal (Blooming Elements) --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        if (entry.target.classList.contains('skills-section')) {
          const stems = entry.target.querySelectorAll('.bud-leaf');
          stems.forEach(stem => {
            stem.style.animation = 'none';
            stem.offsetHeight;
            stem.style.animation = '';
          });
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/* --- Leaf Background Canvas Drawing --- */
function initLeafCanvas() {
  const canvas = document.getElementById('petal-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let particles = [];

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }

    reset() {
      // Spawn on correct side based on wind direction
      if (currentWind > 1.8) {
        // Wind blowing right, spawn on the left edge
        this.x = Math.random() * (width * 0.3) - 50;
        this.y = Math.random() * height;
      } else if (currentWind < -1.8) {
        // Wind blowing left, spawn on the right edge
        this.x = width - (Math.random() * (width * 0.3)) + 50;
        this.y = Math.random() * height;
      } else {
        // Default floating down
        this.x = Math.random() * width;
        this.y = -35;
      }

      this.size = Math.random() * 8 + 8; // Slightly larger for detail
      this.speedY = Math.random() * 0.7 + 0.4;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.angle = Math.random() * 360;
      this.spin = Math.random() * 1.2 - 0.6;
      this.opacity = Math.random() * 0.32 + 0.28;
      this.swaySpeed = Math.random() * 0.015 + 0.005;
      this.swayOffset = Math.random() * Math.PI * 2;
    }

    update() {
      // Smoothly approach target wind speed
      currentWind += (targetWind - currentWind) * 0.035;

      this.y += this.speedY;
      this.swayOffset += this.swaySpeed;

      // Calculate gust offset
      const gustEffect = (Math.abs(currentWind) > 1) ? (currentWind * (0.8 + Math.random() * 0.4)) : currentWind;
      this.x += this.speedX + Math.sin(this.swayOffset) * 0.4 + gustEffect;

      if (Math.abs(currentWind) > 1.5) {
        this.angle += this.spin * 3.4;
        this.y += Math.abs(currentWind) * 0.1;
      } else {
        this.angle += this.spin;
      }

      // Recycle particles going off limits
      if (this.y > height + 35 || this.x < -45 || this.x > width + 60) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle * Math.PI / 180);

      // Draw organic lanceolate leaf with midrib & side veins
      ctx.fillStyle = `rgba(46, 204, 113, ${this.opacity})`;
      ctx.strokeStyle = `rgba(30, 130, 76, ${this.opacity * 0.6})`;
      ctx.lineWidth = 0.6;

      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.quadraticCurveTo(-this.size * 0.45, -this.size * 0.5, 0, 0);
      ctx.quadraticCurveTo(this.size * 0.45, -this.size * 0.5, 0, -this.size);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Midrib line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -this.size);
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.35})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Veins
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.3);
      ctx.lineTo(-this.size * 0.18, -this.size * 0.48);
      ctx.moveTo(0, -this.size * 0.3);
      ctx.lineTo(this.size * 0.18, -this.size * 0.48);

      ctx.moveTo(0, -this.size * 0.6);
      ctx.lineTo(-this.size * 0.18, -this.size * 0.78);
      ctx.moveTo(0, -this.size * 0.6);
      ctx.lineTo(this.size * 0.18, -this.size * 0.78);

      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.22})`;
      ctx.lineWidth = 0.4;
      ctx.stroke();

      ctx.restore();
    }
  }

  let maxParticles = Math.min(48, Math.floor(width / 30));
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* --- Sunshine Glow Cursor Trail --- */
function initPollenTrail() {
  const canvas = document.getElementById('pollen-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let particles = [];

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class TrailParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedX = Math.random() * 1.6 - 0.8;
      this.speedY = Math.random() * 1.6 - 0.8;
      this.life = 1.0;
      this.decay = Math.random() * 0.03 + 0.015;
      this.color = { r: 241, g: 196, b: 15 }; // golden sun spark
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life})`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
      particles.push(new TrailParticle(e.clientX, e.clientY));
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      for (let i = 0; i < 2; i++) {
        particles.push(new TrailParticle(e.touches[0].clientX, e.touches[0].clientY));
      }
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      if (p.life <= 0) {
        particles.splice(i, 1);
      } else {
        p.draw();
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* --- Client Contact Form AJAX Transition Handler --- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    if (!btn) return;
    btn.innerHTML = '<span>Sending Breeze...</span><i class="fa-solid fa-spinner fa-spin"></i>';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      const wrapper = contactForm.parentElement;
      if (!wrapper) return;
      wrapper.innerHTML = `
        <div class="success-message-bloom" style="animation: zoomIn 0.5s ease-out forwards;">
          <div class="success-icon">🍃</div>
          <h3>Breeze Carried Away!</h3>
          <p>
            Your message has been caught by the wind and delivered to Arshal's canopy. Bloom together soon!
          </p>
          <button class="btn btn-secondary" onclick="window.location.reload();">Send Another Message</button>
        </div>
      `;
    }, 1500);
  });
}

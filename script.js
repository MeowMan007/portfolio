/* ==========================================================================
   🌳 ARSHAL'S SEASONAL TREE & WIND INTERACTIVE SCRIPTS
   ========================================================================== */

let activeSeason = 'summer'; // Summer (rich green theme) is the normal season/default!
let currentWind = 0.35;
let targetWind = 0.35;
let isGusting = false;

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSeasonSelector();
  initWindGust();
  initSkillsFilter();
  initScrollReveal();
  initLeafCanvas();
  initPollenTrail();
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

/* --- Seasonal Switcher Logic --- */
function initSeasonSelector() {
  const buttons = document.querySelectorAll('.season-btn');
  const body = document.body;

  // Set default active button to Summer (normal season)
  buttons.forEach(b => {
    b.classList.remove('active');
    if (b.getAttribute('data-season') === 'summer') {
      b.classList.add('active');
    }
  });
  body.classList.remove('spring', 'summer', 'autumn', 'winter');
  body.classList.add('summer');
  activeSeason = 'summer';

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const season = btn.getAttribute('data-season');

      body.classList.remove('spring', 'summer', 'autumn', 'winter');
      body.classList.add(season);
      activeSeason = season;

      // Rotate logo icon briefly
      const logoIcon = document.querySelector('.floral-icon');
      if (logoIcon) {
        logoIcon.style.transition = 'transform 0.8s ease';
        logoIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
          logoIcon.style.transform = '';
        }, 800);
      }
    });
  });
}

/* --- Simulated Wind Gusts Trigger --- */
function initWindGust() {
  const windBtn = document.getElementById('wind-gust-btn');
  const treeContainer = document.querySelector('.tree-container');
  if (!windBtn) return;

  windBtn.addEventListener('click', () => {
    if (isGusting) return;
    isGusting = true;
    windBtn.classList.add('active');
    if (treeContainer) treeContainer.classList.add('windy');

    // Set target wind speed high
    targetWind = 5.8;

    // Decay wind back to default gradually
    setTimeout(() => {
      targetWind = 0.35;
      setTimeout(() => {
        isGusting = false;
        windBtn.classList.remove('active');
        if (treeContainer) treeContainer.classList.remove('windy');
      }, 2500);
    }, 2000); // Gust duration
  });
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

/* --- Leaf / Snow Background Canvas Drawing --- */
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
      if (currentWind > 2) {
        this.x = Math.random() * (width * 0.4) - 50;
        this.y = Math.random() * height;
      } else {
        this.x = Math.random() * width;
        this.y = -35;
      }

      this.size = Math.random() * 7 + 6;
      this.speedY = Math.random() * 0.65 + 0.35;
      this.speedX = Math.random() * 0.3 - 0.15;
      this.angle = Math.random() * 360;
      this.spin = Math.random() * 1.0 - 0.5;
      this.opacity = Math.random() * 0.35 + 0.22;
      this.swaySpeed = Math.random() * 0.015 + 0.005;
      this.swayOffset = Math.random() * Math.PI * 2;
    }

    update() {
      currentWind += (targetWind - currentWind) * 0.04;

      this.y += this.speedY;
      this.swayOffset += this.swaySpeed;

      const gustEffect = (currentWind > 1) ? (currentWind * (0.8 + Math.random() * 0.4)) : currentWind;
      this.x += this.speedX + Math.sin(this.swayOffset) * 0.35 + gustEffect;

      if (currentWind > 1.5) {
        this.angle += this.spin * 3.2;
        this.y += currentWind * 0.12;
      } else {
        this.angle += this.spin;
      }

      if (this.y > height + 35 || this.x < -35 || this.x > width + 50) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle * Math.PI / 180);
      ctx.lineWidth = 0.5;

      if (activeSeason === 'spring') {
        // Soft pale green spring leaf oval shape
        ctx.fillStyle = `rgba(111, 142, 125, ${this.opacity})`;
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size * 0.7, -this.size * 0.5, -this.size * 0.4, -this.size * 1.5, 0, -this.size * 1.8);
        ctx.bezierCurveTo(this.size * 0.4, -this.size * 1.5, this.size * 0.7, -this.size * 0.5, 0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

      } else if (activeSeason === 'summer') {
        // Rich Emerald Green Ribbed Oak/Elm Leaf
        ctx.fillStyle = `rgba(46, 204, 113, ${this.opacity})`;
        ctx.strokeStyle = `rgba(241, 196, 15, ${this.opacity * 0.3})`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        // Stylized pointed leaf
        ctx.quadraticCurveTo(-this.size * 0.9, -this.size * 0.8, 0, -this.size * 1.8);
        ctx.quadraticCurveTo(this.size * 0.9, -this.size * 0.8, 0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

      } else if (activeSeason === 'autumn') {
        // Maple / Orange Amber Oak Leaf
        ctx.fillStyle = `rgba(230, 126, 34, ${this.opacity})`;
        ctx.strokeStyle = `rgba(192, 57, 43, ${this.opacity * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-this.size * 0.5, -this.size * 0.3);
        ctx.lineTo(-this.size * 0.25, -this.size * 0.7);
        ctx.lineTo(-this.size * 0.65, -this.size * 1.0);
        ctx.lineTo(0, -this.size * 1.7);
        ctx.lineTo(this.size * 0.65, -this.size * 1.0);
        ctx.lineTo(this.size * 0.25, -this.size * 0.7);
        ctx.lineTo(this.size * 0.5, -this.size * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

      } else if (activeSeason === 'winter') {
        // Ice crystal / snowflake
        ctx.fillStyle = `rgba(236, 240, 241, ${this.opacity})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.restore();
    }
  }

  let maxParticles = Math.min(45, Math.floor(width / 32));
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

/* --- Interactive Sunshine cursor trail --- */
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
      this.decay = Math.random() * 0.035 + 0.015;

      // Setup golden trail spore tones based on season
      if (activeSeason === 'spring') {
        this.color = { r: 143, g: 188, b: 143 }; // soft green spark
      } else if (activeSeason === 'summer') {
        this.color = { r: 241, g: 196, b: 15 }; // golden sun spark
      } else if (activeSeason === 'autumn') {
        this.color = { r: 230, g: 126, b: 34 }; // amber embers
      } else if (activeSeason === 'winter') {
        this.color = { r: 82, g: 179, b: 217 }; // ice crystal spark
      }
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

  // Cursor movements
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

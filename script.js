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
  initSeasonScrollSpy();
  initScrollWindBoost();
  initNightMode();
  initTreeProgressCanvas();
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
      // 65% chance to spawn leaves directly from the tree branches!
      const treeEl = document.querySelector('.global-tree-backdrop');
      const rect = treeEl ? treeEl.getBoundingClientRect() : null;

      if (rect && Math.random() < 0.65 && window.innerWidth > 992) {
        // Active node spots matching the tree.png coordinates
        const nodes = [
          { px: 0.50, py: 0.82 }, // roots
          { px: 0.48, py: 0.65 }, // trunk
          { px: 0.44, py: 0.49 }, // center bifurcation
          { px: 0.32, py: 0.32 }, // upper left
          { px: 0.55, py: 0.18 }  // crown
        ];
        const chosenNode = nodes[Math.floor(Math.random() * nodes.length)];

        // Spawn around the branch coordinate
        this.x = rect.left + (chosenNode.px * rect.width) + (Math.random() * 60 - 30);
        this.y = rect.top + (chosenNode.py * rect.height) + (Math.random() * 40 - 20);
      } else {
        // Spawn on boundaries based on wind direction
        if (currentWind > 1.8) {
          this.x = Math.random() * (width * 0.3) - 50;
          this.y = Math.random() * height;
        } else if (currentWind < -1.8) {
          this.x = width - (Math.random() * (width * 0.3)) + 50;
          this.y = Math.random() * height;
        } else {
          this.x = Math.random() * width;
          this.y = -35;
        }
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

      if (document.body.classList.contains('season-winter')) {
        // Snow physics: falls vertically faster, drifts slightly with wind, less sway
        this.y += this.speedY * 2.2;
        this.x += this.speedX * 0.5 + Math.sin(this.swayOffset) * 0.2 + (currentWind * 0.4);
      } else {
        // Leaf physics
        this.y += this.speedY;
        this.swayOffset += this.swaySpeed;
        const gustEffect = (Math.abs(currentWind) > 1) ? (currentWind * (0.8 + Math.random() * 0.4)) : currentWind;
        this.x += this.speedX + Math.sin(this.swayOffset) * 0.4 + gustEffect;
      }

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

      // Winter snowflake drawing instead of leaves
      if (document.body.classList.contains('season-winter')) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.95})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
        return;
      }

      ctx.rotate(this.angle * Math.PI / 180);

      // Determine leaf colors based on active season
      let fillCol = `rgba(0, 237, 100, ${this.opacity})`; /* Spring green */
      let strokeCol = `rgba(0, 104, 74, ${this.opacity * 0.6})`;

      if (document.body.classList.contains('season-summer')) {
        // Lush summer forest green
        fillCol = `rgba(46, 125, 50, ${this.opacity})`;
        strokeCol = `rgba(27, 94, 32, ${this.opacity * 0.6})`;
      } else if (document.body.classList.contains('season-autumn')) {
        // Autumn gold, rust, orange, red
        const id = Math.floor(this.size + this.angle) % 3;
        if (id === 0) {
          fillCol = `rgba(211, 84, 0, ${this.opacity})`; /* Rust orange */
          strokeCol = `rgba(160, 64, 0, ${this.opacity * 0.6})`;
        } else if (id === 1) {
          fillCol = `rgba(243, 156, 18, ${this.opacity})`; /* Golden amber */
          strokeCol = `rgba(183, 149, 11, ${this.opacity * 0.5})`;
        } else {
          fillCol = `rgba(192, 57, 43, ${this.opacity})`; /* Maple red */
          strokeCol = `rgba(120, 40, 31, ${this.opacity * 0.6})`;
        }
      }

      // Draw organic lanceolate leaf with midrib & side veins
      ctx.fillStyle = fillCol;
      ctx.strokeStyle = strokeCol;
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

/* --- Scroll-Spy Season Switcher --- */
function initSeasonScrollSpy() {
  const sections = [
    { id: 'hero', season: 'spring' },
    { id: 'about', season: 'summer' },
    { id: 'experience', season: 'autumn' },
    { id: 'projects', season: 'autumn' },
    { id: 'skills', season: 'winter' },
    { id: 'contact', season: 'winter' }
  ];

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -30% 0px', // Trigger when section occupies the mid portion of viewport
    threshold: 0
  };

  const seasonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionConfig = sections.find(s => s.id === entry.target.id);
        if (sectionConfig) {
          document.body.classList.remove('season-spring', 'season-summer', 'season-autumn', 'season-winter');
          document.body.classList.add('season-' + sectionConfig.season);
        }
      }
    });
  }, observerOptions);

  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) seasonObserver.observe(el);
  });

  // Fallback scroll check to ensure seasons switch reliably on quick/extreme scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    let currentSeason = 'spring';

    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSeason = sec.season;
        }
      }
    }

    if (!document.body.classList.contains('season-' + currentSeason)) {
      document.body.classList.remove('season-spring', 'season-summer', 'season-autumn', 'season-winter');
      document.body.classList.add('season-' + currentSeason);
    }
  });
}

/* --- Scroll Wind Velocity Boost --- */
function initScrollWindBoost() {
  let lastScrollY = window.scrollY;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const delta = Math.abs(currentScrollY - lastScrollY);
    lastScrollY = currentScrollY;

    if (delta > 3) {
      // Direct proportion wind speed boost depending on scrolling speed
      const scrollWind = Math.min(4.8, delta * 0.08);
      // Wind bursts right/left alternates based on scroll position values
      targetWind = scrollWind * (currentScrollY % 2 === 0 ? 1 : -1);
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      targetWind = 0.35;
    }, 400);
  });
}

/* --- Night Mode Toggle Handler --- */
function initNightMode() {
  const toggleBtn = document.getElementById('night-mode-toggle');
  if (!toggleBtn) return;

  // Read saved client theme preference
  const isDarkMode = localStorage.getItem('theme-dark') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    const icon = toggleBtn.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-sun';
    toggleBtn.title = 'Switch to Day Mode ☀️';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = toggleBtn.querySelector('i');
    const currentlyDark = document.body.classList.contains('dark-mode');

    if (currentlyDark) {
      if (icon) icon.className = 'fa-solid fa-sun';
      toggleBtn.title = 'Switch to Day Mode ☀️';
      localStorage.setItem('theme-dark', 'true');
    } else {
      if (icon) icon.className = 'fa-solid fa-moon';
      toggleBtn.title = 'Switch to Night Mode 🌙';
      localStorage.setItem('theme-dark', 'false');
    }
  });
}

/* --- Interactive Tree Growth & Progress Canvas --- */
function initTreeProgressCanvas() {
  const canvas = document.getElementById('tree-progress-canvas');
  const backdrop = document.querySelector('.global-tree-backdrop');
  if (!canvas || !backdrop) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = backdrop.clientWidth;
  let height = canvas.height = backdrop.clientHeight;

  // Active nodes layout mapping coordinates (relative px, py)
  const nodes = [
    { px: 0.50, py: 0.82, exploded: false, color: '#00ED64', label: 'Start 🌸' },
    { px: 0.48, py: 0.65, exploded: false, color: '#FFD54F', label: 'Grow ☀️' },
    { px: 0.44, py: 0.49, exploded: false, color: '#FF7043', label: 'Evolve 🍂' },
    { px: 0.32, py: 0.32, exploded: false, color: '#4FC3F7', label: 'Expand ❄️' },
    { px: 0.55, py: 0.18, exploded: false, color: '#E8F5E9', label: 'Bloom 🍃' }
  ];

  let sparkParticles = [];
  let pulseAngle = 0;

  window.addEventListener('resize', () => {
    width = canvas.width = backdrop.clientWidth;
    height = canvas.height = backdrop.clientHeight;
  });

  function triggerSparkBurst(x, y, color) {
    for (let i = 0; i < 24; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      sparkParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.0, // slight rising drift
        size: Math.random() * 3 + 1.2,
        color: color,
        alpha: 1.0,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  // Animation Loop
  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Calculate Scroll Progress
    const scrollY = window.scrollY;
    const totalScrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalScrollRange > 0 ? Math.max(0, Math.min(1, scrollY / totalScrollRange)) : 0;

    pulseAngle += 0.05;

    // 1. Draw glowing sap stream climb
    if (progress > 0.01) {
      ctx.beginPath();
      const startX = nodes[0].px * width;
      const startY = nodes[0].py * height;
      ctx.moveTo(startX, startY);

      const segmentCount = nodes.length - 1;
      const progressScaled = progress * segmentCount;
      const activeSeg = Math.floor(progressScaled);
      const segFraction = progressScaled - activeSeg;

      for (let i = 0; i < segmentCount; i++) {
        const x1 = nodes[i].px * width;
        const y1 = nodes[i].py * height;
        const x2 = nodes[i + 1].px * width;
        const y2 = nodes[i + 1].py * height;

        if (i < activeSeg) {
          ctx.lineTo(x2, y2);
        } else if (i === activeSeg) {
          const curX = x1 + (x2 - x1) * segFraction;
          const curY = y1 + (y2 - y1) * segFraction;
          ctx.lineTo(curX, curY);
          break;
        }
      }

      ctx.strokeStyle = document.body.classList.contains('dark-mode') ? 'rgba(0, 237, 100, 0.78)' : 'rgba(0, 104, 74, 0.65)';
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // 2. Draw Nodes
    const activeSegIndex = Math.round(progress * (nodes.length - 1));

    nodes.forEach((node, idx) => {
      const nx = node.px * width;
      const ny = node.py * height;
      const isActive = idx <= activeSegIndex;

      // Handle spark explosion on scroll threshold crossing
      if (isActive && !node.exploded) {
        node.exploded = true;
        triggerSparkBurst(nx, ny, node.color);
      } else if (!isActive && node.exploded) {
        // Reset exploded flag if we scroll back up past the node
        node.exploded = false;
      }

      // Draw node backing glowing pulsing circle
      if (isActive) {
        const pulseRadius = 5.5 + Math.sin(pulseAngle) * 2;
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = node.color;

        ctx.beginPath();
        ctx.arc(nx, ny, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        // Inactive sleeping bud node
        ctx.fillStyle = document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 30, 43, 0.2)';
        ctx.beginPath();
        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 3. Draw and Update Active Sparks particles
    for (let i = sparkParticles.length - 1; i >= 0; i--) {
      const p = sparkParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        sparkParticles.splice(i, 1);
      } else {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // 4. Update the tree image transforms (scale/growth and sway) based on progress
    const treeImg = document.querySelector('.sapling-tree-img');
    if (treeImg) {
      let scale = 0.65 + (progress * 0.45); // sapling -> mature tree
      if (progress > 0.8) {
        scale = 1.10 - ((progress - 0.8) * 0.4); // Winter contraction
      }
      const sway = Math.sin(progress * Math.PI * 3.5) * 1.5; // slight rotation bend
      treeImg.style.transform = `scale(${scale}) rotate(${sway}deg)`;

      // Update filters matching scrolling seasons
      if (document.body.classList.contains('season-spring')) {
        treeImg.style.filter = 'drop-shadow(0 15px 35px rgba(0, 237, 100, 0.16)) saturate(1.15)';
      } else if (document.body.classList.contains('season-summer')) {
        treeImg.style.filter = 'drop-shadow(0 15px 35px rgba(39, 174, 96, 0.22)) saturate(1.4) brightness(1.05)';
      } else if (document.body.classList.contains('season-autumn')) {
        treeImg.style.filter = 'drop-shadow(0 15px 35px rgba(211, 84, 0, 0.22)) sepia(0.3) saturate(1.5) hue-rotate(-20deg)';
      } else if (document.body.classList.contains('season-winter')) {
        treeImg.style.filter = 'drop-shadow(0 15px 35px rgba(41, 128, 185, 0.18)) saturate(0.3) brightness(1.22) contrast(0.9)';
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}



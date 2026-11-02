/**
 * JADWA — Journey of Trade and Trust
 * Jadwa Al Afaq General Trading L.L.C • Dubai, UAE
 *
 * Main Application Script
 * Responsibilities: GSAP animation orchestration, hero intro, scroll-triggered
 * section reveals, ticker marquee, mobile menu, product modal lightbox,
 * category filter, product-grid reveal, smooth anchors, and footer.
 *
 * Sections:
 *  1.  Data Store — 11 Product Category definitions
 *  2.  Application Lifecycle Initialization
 *  3.  Preloader Timeline & Hero Intro Chaining
 *  4.  Hero Intro Animation (Clean Fade-Up Sequence)
 *  5.  Hero Scroll Scrub
 *  6.  Marquee / Ticker Strip
 *  7.  General ScrollTrigger Animations
 *  8.  Scroll Progress Indicator
 *  9.  Navbar Glass Transition & Active Link
 *  10. Smooth Anchor Scrolling
 *  11. Mobile Menu
 *  12. Static Button Hover States
 *  13. Product Grid Reveal
 *  14. Products Category Filtering
 *  15. Product Lightbox Modal
 *  16. Back-to-Top Button
 *  17. Footer Giant Wordmark
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Data Store: 11 Product Categories (Exact Brochure Information)
  // --------------------------------------------------------------------------
  const CATEGORIES_DATA = {
    'perfumes-cosmetics': {
      title: 'Perfumes & Cosmetics Trading',
      group: 'Consumer Goods',
      items: 'Perfume bottles, lipsticks, cosmetics, personal care products, and luxury beauty fragrances.',
      image: 'assets/products/perfumes-cosmetics.jpg',
      svg: `<path d="M26 14h12v10H26z"/><path d="M20 24h24v30a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V24z"/><circle cx="32" cy="38" r="6"/>`
    },
    'garments-textiles': {
      title: 'Garments Accessories, Textiles & Readymade Garments Trading',
      group: 'Consumer Goods',
      items: 'Fabric rolls, thread spools, buttons, shirts, jackets, fashion textiles, and garment accessories.',
      image: 'assets/products/garments-textiles.jpg',
      svg: `<path d="M14 20 L24 8 H40 L50 20 L42 26 L36 18 V56 H28 V18 L22 26 Z"/>`
    },
    'toys-games': {
      title: 'Toys & Games Trading',
      group: 'Consumer Goods',
      items: 'Teddy bear, toy car, football, building blocks, dolls, educational toys, and recreational games.',
      image: 'assets/products/toys-games.jpg',
      svg: `<circle cx="32" cy="32" r="20"/><polygon points="32 20 39 26 36 34 28 34 25 26"/>`
    },
    'gifts': {
      title: 'Gifts & Gift Items Trading',
      group: 'Consumer Goods',
      items: 'Gift boxes, mugs, flowers, curated presentation sets, corporate giveaways, and festive hampers.',
      image: 'assets/products/gifts.jpg',
      svg: `<rect x="12" y="24" width="40" height="32" rx="2"/><rect x="8" y="16" width="48" height="8" rx="2"/><line x1="32" y1="16" x2="32" y2="56"/><path d="M32 16c-4-6-10-6-10 0s10 0 10 0z"/><path d="M32 16c4-6 10-6 10 0s-10 0-10 0z"/>`
    },
    'plastic-products': {
      title: 'Plastic Products Trading',
      group: 'Industrial & Packaging',
      items: 'Garbage Bins (commercial & municipal), Industrial Plastic Crates, Heavy-Duty Pallets, and storage bins.',
      image: 'assets/products/plastic-products.jpg',
      svg: `<rect x="10" y="16" width="44" height="36" rx="4"/><line x1="10" y1="28" x2="54" y2="28"/><line x1="24" y1="28" x2="24" y2="52"/><line x1="40" y1="28" x2="40" y2="52"/>`
    },
    'industrial-storage': {
      title: 'Industrial & Storage Products',
      group: 'Industrial & Packaging',
      items: 'IBC Tanks (Intermediate Bulk Containers), Industrial Storage Systems, and Heavy-Duty Packaging Materials.',
      image: 'assets/products/industrial-storage.jpg',
      svg: `<rect x="14" y="14" width="36" height="36" rx="2"/><line x1="14" y1="26" x2="50" y2="26"/><line x1="14" y1="38" x2="50" y2="38"/><line x1="26" y1="14" x2="26" y2="50"/><line x1="38" y1="14" x2="38" y2="50"/>`
    },
    'electrical-electronics': {
      title: 'Electrical Equipment, Accessories & Electronic Equipment Trading',
      group: 'Household & Office',
      items: 'Industrial cables, switches, LED bulbs, sockets, fixtures, electrical hardware, and consumer electronics.',
      image: 'assets/products/electrical-electronics.jpg',
      svg: `<path d="M22 18v8M42 18v8"/><rect x="14" y="26" width="36" height="24" rx="4"/><polygon points="32 30 28 38 34 38 30 46" fill="#f46747" stroke="none"/>`
    },
    'stationery-paper': {
      title: 'Stationery & Paper Products',
      group: 'Household & Office',
      items: 'Notebooks, Paper, Charts, A4 Sheets, Tissue Paper rolls, commercial printing media, and office supplies.',
      image: 'assets/products/stationery-paper.jpg',
      svg: `<path d="M14 12h28l8 8v32H14z"/><polyline points="42 12 42 20 50 20"/><line x1="22" y1="28" x2="36" y2="28"/><line x1="22" y1="36" x2="42" y2="36"/><line x1="22" y1="44" x2="38" y2="44"/>`
    },
    'detergents': {
      title: 'Detergents Trading',
      group: 'Consumer Goods',
      items: 'Liquid detergents, cleaning sprays, washing powder, sanitizing formulations, and bulk disinfectants.',
      image: 'assets/products/detergents.jpg',
      svg: `<rect x="22" y="8" width="12" height="6" rx="1"/><path d="M20 14h16l6 12v26a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V26z"/><circle cx="30" cy="38" r="6"/><circle cx="40" cy="32" r="2"/>`
    },
    'household': {
      title: 'Household Items Trading',
      group: 'Household & Office',
      items: 'Cookware sets, electric kettles, storage baskets, towels, ceramic mugs, and daily domestic kitchenware.',
      image: 'assets/products/household.jpg',
      svg: `<path d="M14 26h36l-4 22a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4z"/><path d="M22 26v-6a10 10 0 0 1 20 0v6"/>`
    },
    'restaurant-cafeteria': {
      title: 'Restaurant & Cafeteria Storage Supplies',
      group: 'Industrial & Packaging',
      items: 'Plastic Boxes and Cardboard Boxes (food containers, takeaway boxes, cartons, commercial dining storage).',
      image: 'assets/products/restaurant-cafeteria.jpg',
      svg: `<path d="M10 20 L32 8 L54 20 L32 32 Z"/><path d="M10 20 V44 L32 56 V32 Z"/><path d="M54 20 V44 L32 56"/>`
    },
  };

  // --------------------------------------------------------------------------
  let motionDisabled = false;
  let modalOpener = null;

  // 2. Application Lifecycle Initialization
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    motionDisabled = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Register GSAP Plugins when the CDN is available.
    if (typeof gsap !== 'undefined') {
      if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
      if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
    }

    // Set Dynamic Year in Footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Initialize Components
    initScrollProgressBar();
    initHeaderScroll();
    initSmoothAnchors();
    initMobileMenu();
    initCategoryFilter();
    initProductModal();
    initBackToTop();
    initFooterGiantText();

    if (motionDisabled) {
      // Instantly dismiss preloader and show content
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.style.display = 'none';
      initTicker(false);
      return;
    }

    if (typeof gsap === 'undefined') {
      // Keep the page usable when the animation CDN is blocked or unavailable.
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.style.display = 'none';
      initTicker(true);
      return;
    }

    // Run Preloader Chained into Hero Intro
    runPreloaderSequence();
  });

  // --------------------------------------------------------------------------
  // 3. Preloader Timeline & Hero Intro Chaining
  // --------------------------------------------------------------------------
  function runPreloaderSequence() {
    const preloader = document.getElementById('preloader');
    const mark = document.querySelector('.preloader__mark');
    const brand = document.querySelector('.preloader__brand');
    const progressFill = document.querySelector('.preloader__progress-fill');

    if (typeof gsap === 'undefined') {
      if (preloader) preloader.style.display = 'none';
      initTicker(true);
      return;
    }

    if (!preloader) {
      runHeroIntroAnimation();
      initScrollTriggerAnimations();
      return;
    }

    const preloaderTL = gsap.timeline({
      onComplete: () => {
        // Remove preloader from view and start hero animation
        gsap.to(preloader, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            // Start Hero Intro Animation Timeline
            runHeroIntroAnimation();
            initScrollTriggerAnimations();
          }
        });
      }
    });

    // Fade in the supplied JADWA mark, wordmark, and loading bar.
    preloaderTL
      .fromTo(mark, {
        opacity: 0,
        scale: 0.9
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        onStart: () => {
          if (progressFill) progressFill.style.width = '100%';
        }
      })
      .to(brand, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out'
      }, '-=0.3')
      .to({}, { duration: 0.5 }); // Let the loading bar finish before the reveal.
  }

  // --------------------------------------------------------------------------
  // 4. Hero Intro Animation Timeline (Global Trade Gateway Sequence)
  // --------------------------------------------------------------------------
  function runHeroIntroAnimation() {
    const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTL
      .fromTo(
        '.hero__status-badge',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo(
        '.hero__headline',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75 },
        '-=0.35'
      )
      .fromTo(
        '.hero__brand-pill',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.45'
      )
      .fromTo(
        '.hero__desc',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.45'
      )
      .fromTo(
        '.hero__actions',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        '.hero__trust-strip',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.35'
      )
      .fromTo(
        '.hero__ticker',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          onComplete: () => {
            initTicker(true);
          }
        },
        '-=0.3'
      );

    // Scroll Scrub
    initHeroScrollScrub();
  }

  // --------------------------------------------------------------------------
  // 5. Hero Scroll Scrub
  // --------------------------------------------------------------------------
  function initHeroScrollScrub() {
    const heroSection = document.getElementById('home');
    const heroContent = document.querySelector('.hero__content');

    if (!heroSection || !heroContent || motionDisabled || typeof gsap === 'undefined') return;

    // Keep the hero text stationary under the pointer; only scroll motion is animated.
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to('.hero__content', {
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        },
        scale: 0.96,
        opacity: 0.25,
        y: 50
      });
    }
  }

  // --------------------------------------------------------------------------
  // 6. Marquee / Ticker Strip with Scroll Velocity & Direction Reaction
  // --------------------------------------------------------------------------
  function initTicker(animate = true) {
    const track = document.querySelector('.js-ticker-track');
    if (!track) return;
    if (!animate) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    let currentX = 0;
    let speed = 48;
    let direction = -1; // -1 = left, 1 = right
    let targetSpeed = 48;
    let lastFrameTime = 0;
    let groupWidth = 0;
    let frameId = 0;
    let isAnimating = false;
    const singleGroup = track.querySelector('.hero__ticker-group');

    const measureGroup = () => {
      groupWidth = singleGroup ? singleGroup.getBoundingClientRect().width : track.scrollWidth / 2;
    };
    measureGroup();

    if (singleGroup && typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(measureGroup).observe(singleGroup);
    } else {
      window.addEventListener('resize', measureGroup, { passive: true });
    }

    function animateMarquee(time) {
      if (!isAnimating || document.hidden) return;
      const delta = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 0.05) : 0;
      lastFrameTime = time;
      speed += (targetSpeed - speed) * Math.min(1, delta * 8);
      currentX += speed * delta * direction;

      if (groupWidth > 0 && direction === -1 && -currentX >= groupWidth) {
        currentX = -((-currentX) % groupWidth);
      } else if (groupWidth > 0 && direction === 1 && currentX >= 0) {
        currentX = -groupWidth + (currentX % groupWidth);
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
      frameId = requestAnimationFrame(animateMarquee);
    }

    const startMarquee = () => {
      if (isAnimating || document.hidden) return;
      isAnimating = true;
      lastFrameTime = 0;
      frameId = requestAnimationFrame(animateMarquee);
    };

    const pauseMarquee = () => {
      isAnimating = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      lastFrameTime = 0;
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pauseMarquee();
      else startMarquee();
    });

    startMarquee();

    // Scroll speed reaction with ScrollTrigger when both optional libraries load.
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        onUpdate: (self) => {
          targetSpeed = 48 + Math.min(Math.abs(self.getVelocity()) / 8, 300);
          if (self.direction === 1) {
            direction = -1;
          } else if (self.direction === -1) {
            direction = 1;
          }
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 7. General ScrollTrigger Animations
  // --------------------------------------------------------------------------
  function initScrollTriggerAnimations() {
    if (motionDisabled || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Heading Mask Reveals
    document.querySelectorAll('.js-reveal-heading').forEach((heading) => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 2. About Value Cards Stagger
    gsap.fromTo(
      '.value-card',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__values',
          start: 'top 82%'
        }
      }
    );

    // 3. Floating Badges Yoyo Float
    gsap.to('.js-float-1', {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: '.about__frame',
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play pause resume pause'
      }
    });

    gsap.to('.js-float-2', {
      y: 10,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.5,
      scrollTrigger: {
        trigger: '.about__frame',
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play pause resume pause'
      }
    });

    // 4. Identity Strip Cards Sequence
    gsap.fromTo(
      '.js-identity-card',
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.16,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.identity-strip__grid',
          start: 'top 85%'
        }
      }
    );

    // 4b. Why Choose Us Stats, Cards & Banner Entrance
    gsap.fromTo(
      '.why-stat',
      { opacity: 0, y: 30, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-us__stats',
          start: 'top 85%'
        }
      }
    );

    gsap.fromTo(
      '.why-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-us__grid',
          start: 'top 82%'
        }
      }
    );

    gsap.fromTo(
      '.why-us__banner',
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-us__banner',
          start: 'top 88%'
        }
      }
    );

    // 5. Featured Cards Entrance
    gsap.fromTo(
      '.featured-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.featured-showcase',
          start: 'top 80%'
        }
      }
    );

    // 6. Products Grid Reveal — one quick, even entrance instead of per-row batches
    gsap.fromTo(
      '.js-product-card',
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: '.js-products-grid',
          start: 'top 88%',
          once: true
        }
      }
    );

    // 7. Footer Columns Entrance
    gsap.fromTo(
      '.footer__col',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer__grid',
          start: 'top 90%'
        }
      }
    );
  }

  // --------------------------------------------------------------------------
  // 8. Scroll Progress Indicator
  // --------------------------------------------------------------------------
  function initScrollProgressBar() {
    const bar = document.getElementById('scrollProgressBar');
    if (!bar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  // --------------------------------------------------------------------------
  // 9. Navbar Glass Transition & Active Link Highlighting
  // --------------------------------------------------------------------------
  function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!header) return;

    const updateHeader = () => {
      const scrollY = window.scrollY;

      // Toggle Glass Navbar after 80px
      if (scrollY > 80) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      // Active Section Link Highlighting
      let currentSectionId = '';
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top + scrollY - 120;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        const isActive = currentSectionId && link.getAttribute('href') === `#${currentSectionId}`;
        link.classList.toggle('is-active', Boolean(isActive));
        if (isActive) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader, { passive: true });
    updateHeader();
  }

  // --------------------------------------------------------------------------
  // 10. Smooth Anchor Scrolling (GSAP ScrollToPlugin + Fallback)
  // --------------------------------------------------------------------------
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        e.preventDefault();

        // Close mobile menu if open
        closeMobileMenu();

        if (!motionDisabled && typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetEl,
              offsetY: 80
            },
            ease: 'power3.inOut'
          });
        } else {
          targetEl.scrollIntoView({ behavior: motionDisabled ? 'auto' : 'smooth', block: 'start' });
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. Mobile Menu (Hamburger + Fullscreen Overlay)
  // --------------------------------------------------------------------------
  let mobileMenuOpen = false;
  let mobileMenuOpener = null;

  function initMobileMenu() {
    const hamburgerBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

    if (!hamburgerBtn || !mobileMenu) return;

    hamburgerBtn.addEventListener('click', () => {
      if (mobileMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileMenu.addEventListener('click', (event) => {
      if (event.target === mobileMenu) closeMobileMenu();
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on Escape Key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      } else if (e.key === 'Tab' && mobileMenuOpen) {
        trapFocusWithin(mobileMenu, e);
      }
    });

    const desktopMenuQuery = window.matchMedia('(min-width: 992px)');
    const closeForDesktop = (event) => {
      if (!event.matches || !mobileMenuOpen) return;
      closeMobileMenu(false);
      (document.querySelector('.nav__link') || document.querySelector('.header__logo'))?.focus();
    };
    if (desktopMenuQuery.addEventListener) {
      desktopMenuQuery.addEventListener('change', closeForDesktop);
    } else {
      desktopMenuQuery.addListener(closeForDesktop);
    }
  }

  function openMobileMenu() {
    const hamburgerBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const siteHeader = document.getElementById('siteHeader');
    if (!mobileMenu || !hamburgerBtn) return;

    mobileMenuOpen = true;
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
    siteHeader?.classList.add('is-menu-open');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenuOpener = hamburgerBtn;
    syncBodyScrollLock();
    mobileMenu.querySelector('.mobile-menu__link')?.focus();

    if (!motionDisabled && typeof gsap !== 'undefined') {
      gsap.killTweensOf('.mobile-menu__item');
      gsap.fromTo(
        '.mobile-menu__item',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.42, stagger: 0.06, ease: 'power2.out', delay: 0.04 }
      );
    }
  }

  function closeMobileMenu(restoreFocus = true) {
    const hamburgerBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const siteHeader = document.getElementById('siteHeader');
    if (!mobileMenu || !hamburgerBtn) return;

    const wasOpen = mobileMenuOpen;
    mobileMenuOpen = false;
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
    siteHeader?.classList.remove('is-menu-open');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (typeof gsap !== 'undefined') gsap.killTweensOf('.mobile-menu__item');
    syncBodyScrollLock();

    if (restoreFocus && wasOpen && mobileMenuOpener?.isConnected) {
      mobileMenuOpener.focus();
    }
    mobileMenuOpener = null;
  }

  function syncBodyScrollLock() {
    const modalOpen = Boolean(document.getElementById('productModal')?.classList.contains('is-open'));
    document.body.classList.toggle('body--lock', mobileMenuOpen || modalOpen);
  }

  function trapFocusWithin(container, event) {
    const focusableElements = Array.from(container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter((element) => element.getClientRects().length > 0);

    // The mobile toggle sits in the fixed header above the menu overlay and is its close control.
    if (container.id === 'mobileMenu') {
      const menuToggle = document.getElementById('mobileMenuBtn');
      if (menuToggle?.getClientRects().length) focusableElements.push(menuToggle);
    }

    if (!focusableElements.length) {
      event.preventDefault();
      container.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  }

  // --------------------------------------------------------------------------
  // 12. Button Hover Feedback (Static CSS States)
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // 14. Products Category Filtering
  // --------------------------------------------------------------------------
  function initCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.js-product-card');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');

        const filterValue = btn.getAttribute('data-filter');
        applyFilter(filterValue);
      });
    });

    // Quick filter link click from footer
    document.querySelectorAll('.footer__cat-link').forEach((link) => {
      link.addEventListener('click', () => {
        const targetFilter = link.getAttribute('data-target-filter');
        const matchingBtn = document.querySelector(`.filter-btn[data-filter="${targetFilter}"]`);
        if (matchingBtn) {
          matchingBtn.click();
        }
      });
    });

    function applyFilter(filter) {
      cards.forEach((card) => {
        const group = card.getAttribute('data-group');
        const isMatch = filter === 'all' || group === filter;

        if (typeof gsap === 'undefined' || motionDisabled) {
          card.style.display = isMatch ? 'flex' : 'none';
          card.style.opacity = '';
          card.style.transform = '';
          return;
        }

        gsap.killTweensOf(card);
        if (isMatch) {
          card.style.display = 'flex';
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            y: 0,
            scale: 0.98,
            duration: 0.2,
            ease: 'power2.in',
            overwrite: 'auto',
            onComplete: () => {
              card.style.display = 'none';
              card.style.opacity = '';
              card.style.transform = '';
            }
          });
        }
      });

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 450);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 15. Product Lightbox Modal (Details Dialog & WhatsApp / Email CTAs)
  // --------------------------------------------------------------------------
  function initProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const overlay = document.getElementById('modalOverlay');

    const modalTitle = document.getElementById('modalCategoryTitle');
    const modalTag = document.getElementById('modalCategoryTag');
    const modalItems = document.getElementById('modalCategoryItems');
    const modalImg = document.getElementById('modalImg');
    const modalFallback = document.getElementById('modalFallbackVisual');
    const modalFallbackSvg = document.getElementById('modalFallbackSvg');
    const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
    const modalEmailBtn = document.getElementById('modalEmailBtn');

    if (!modal) return;

    // Attach Open Listener to all details buttons
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.js-open-modal');
      if (!openBtn) return;

      const categoryId = openBtn.getAttribute('data-category');
      const data = CATEGORIES_DATA[categoryId];
      if (!data) return;

      e.preventDefault();

      // Populate Modal Content
      modalTitle.textContent = data.title;
      modalTag.textContent = data.group;
      modalItems.textContent = data.items;

      // Handle Image / SVG Fallback
      modalImg.style.display = 'block';
      modalFallback.style.display = 'none';
      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalFallbackSvg.innerHTML = data.svg;

      // Prefilled WhatsApp & Email Links
      const encodedTitle = encodeURIComponent(data.title);
      modalWhatsAppBtn.href = `https://wa.me/971527989079?text=Hello%20JADWA%2C%20I%20would%20like%20to%20enquire%20about%20${encodedTitle}.`;
      modalEmailBtn.href = `mailto:sales@jadwageneraltrading.com?subject=Enquiry%20regarding%20${encodedTitle}&body=Hello%20JADWA%20Sales%20Team%2C%0A%0AI%20would%20like%20to%20request%20information%20and%20pricing%20for%20${encodedTitle}.`;

      // Open Modal
      modalOpener = openBtn;
      openModal();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      } else if (e.key === 'Tab' && modal.classList.contains('is-open')) {
        trapFocusWithin(modal, e);
      }
    });

    function openModal() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      syncBodyScrollLock();
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      syncBodyScrollLock();
      if (modalOpener?.isConnected) modalOpener.focus();
      modalOpener = null;
    }
  }

  // --------------------------------------------------------------------------
  // 16. Back-to-Top Floating Button
  // --------------------------------------------------------------------------
  function initBackToTop() {
    const backTopBtn = document.getElementById('floatingBackToTop');
    if (!backTopBtn) return;

    const updateVisibility = () => {
      if (window.scrollY > 400) {
        backTopBtn.classList.add('is-visible');
      } else {
        backTopBtn.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    backTopBtn.addEventListener('click', () => {
      if (!motionDisabled && typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: 0 },
          ease: 'power3.inOut'
        });
      } else {
        window.scrollTo({ top: 0, behavior: motionDisabled ? 'auto' : 'smooth' });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 17. Footer Giant Outline Wordmark Interaction
  // --------------------------------------------------------------------------
  function initFooterGiantText() {
    const giantWordmark = document.querySelector('.footer__giant-text');
    if (!giantWordmark || motionDisabled || typeof ScrollTrigger === 'undefined') return;

    // Fill with bittersweet glow as user reaches bottom
    ScrollTrigger.create({
      trigger: '.footer',
      start: 'bottom 98%',
      onEnter: () => giantWordmark.classList.add('is-active'),
      onLeaveBack: () => giantWordmark.classList.remove('is-active')
    });
  }

})();

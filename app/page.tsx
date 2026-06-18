"use client";
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // 0. Init Background Paths
    initBackgroundPaths();

    function initBackgroundPaths() {
      if (document.querySelector('.bg-paths-container')) return;

      const bgContainer = document.createElement('div');
      bgContainer.className = 'bg-paths-container';
      
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 696 316');
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.setAttribute('fill', 'none');
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.color = '#D4AF37';
      svg.style.opacity = '0.75';
      
      createPaths(svg, 1);
      createPaths(svg, -1);
      
      bgContainer.appendChild(svg);
      document.body.insertBefore(bgContainer, document.body.firstChild);
    }

    function createPaths(svg: SVGSVGElement, position: number) {
      for (let i = 0; i < 6; i++) {
        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        const d = `M-${380 - i * 15 * position} -${189 + i * 18}C-${
            380 - i * 15 * position
        } -${189 + i * 18} -${312 - i * 15 * position} ${216 - i * 18} ${
            152 - i * 15 * position
        } ${343 - i * 18}C${616 - i * 15 * position} ${470 - i * 18} ${
            684 - i * 15 * position
        } ${875 - i * 18} ${684 - i * 15 * position} ${875 - i * 18}`;
        
        const strokeWidth = 0.6 + (i * 0.2);
        const opacity = 0.12 + (i * 0.03);
        
        pathEl.setAttribute('d', d);
        pathEl.setAttribute('stroke', 'currentColor');
        pathEl.setAttribute('stroke-width', String(strokeWidth));
        pathEl.setAttribute('stroke-opacity', String(opacity));
        pathEl.classList.add('static-path');
        
        svg.appendChild(pathEl);
      }
    }

    // 1. Initial Load Animations
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);

    // 2. Scroll-Triggered Reveals (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-luxe-text');
    
    const revealCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

    // 3. Navbar Shrink on Scroll
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // 4. Mobile Menu Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    const openMenu = () => {
      if (menuToggle && navLinks) {
        menuToggle.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
        navLinks.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeMenu = () => {
      if (menuToggle && navLinks) {
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    const handleMenuToggle = () => {
      if (menuToggle) {
        const isOpen = menuToggle.classList.contains('open');
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      }
    };

    if (menuToggle) {
      menuToggle.addEventListener('click', handleMenuToggle);
    }

    const navItems = document.querySelectorAll('.nav-item, .btn-gold-nav');
    navItems.forEach(item => {
      item.addEventListener('click', closeMenu);
    });

    const handleResize = () => {
      if (navLinks && window.innerWidth > 768 && navLinks.classList.contains('open')) {
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);

    // 5. Interactive Pricing Calculator
    const areaSlider = document.getElementById('area-slider') as HTMLInputElement | null;
    const areaVal = document.getElementById('area-val');
    const sliderFill = document.getElementById('slider-fill');
    const priceNumber = document.getElementById('price-number');
    const packageTitle = document.getElementById('package-title');
    const featPanos = document.getElementById('feat-panos');
    
    const checkboxes = {
      hotspots: document.getElementById('opt-hotspots') as HTMLInputElement | null,
      branding: document.getElementById('opt-branding') as HTMLInputElement | null,
      teaser: document.getElementById('opt-teaser') as HTMLInputElement | null
    };

    let currentPrice = 250;
    let priceAnimationTimer: any;

    function updateSliderFill() {
      if (areaSlider && sliderFill) {
        const val = parseFloat(areaSlider.value);
        const min = parseFloat(areaSlider.min);
        const max = parseFloat(areaSlider.max);
        const percent = ((val - min) / (max - min)) * 100;
        sliderFill.style.width = percent + '%';
      }
    }

    function animatePriceUpdate(targetPrice: number) {
      if (currentPrice === targetPrice) return;
      
      clearInterval(priceAnimationTimer);
      
      const duration = 400;
      const startTime = performance.now();
      const startPrice = currentPrice;
      
      priceAnimationTimer = setInterval(() => {
        const timeElapsed = performance.now() - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easedProgress = progress * (2 - progress);
        const calculatedVal = Math.round(startPrice + (targetPrice - startPrice) * easedProgress);
        
        if (priceNumber) {
          priceNumber.textContent = String(calculatedVal);
        }
        
        if (progress === 1) {
          clearInterval(priceAnimationTimer);
          currentPrice = targetPrice;
        }
      }, 16);
    }

    function calculatePrice() {
      if (!areaSlider) return;
      const area = parseInt(areaSlider.value);
      
      let basePrice = 100 + Math.round((area - 50) * 900 / 950);
      const panosCount = Math.round(5 + (area - 50) * 35 / 950);
      
      if (featPanos) {
        featPanos.textContent = `Aproximativ ${panosCount} panorame 8K`;
      }
      
      let pkgName = "Premium Silver";
      if (area <= 200) {
        pkgName = "Premium Bronze";
      } else if (area > 200 && area <= 500) {
        pkgName = "Premium Silver";
      } else if (area > 500 && area <= 800) {
        pkgName = "Premium Gold";
      } else {
        pkgName = "Executive Platinum";
      }
      
      if (packageTitle) {
        packageTitle.textContent = pkgName;
      }

      let addonsTotal = 0;
      Object.keys(checkboxes).forEach(key => {
        const checkbox = checkboxes[key as keyof typeof checkboxes];
        if (checkbox) {
          const featureElement = document.querySelector(`.dynamic-feature[data-feature="${checkbox.id}"]`) as HTMLElement | null;
          
          if (checkbox.checked) {
            addonsTotal += parseInt(checkbox.value);
            if (featureElement) {
              featureElement.style.display = 'flex';
            }
          } else {
            if (featureElement) {
              featureElement.style.display = 'none';
            }
          }
        }
      });

      let totalPrice = basePrice + addonsTotal;

      if (areaVal) {
        areaVal.textContent = `${area} mp`;
      }
      animatePriceUpdate(totalPrice);
    }

    if (areaSlider) {
      areaSlider.addEventListener('input', () => {
        updateSliderFill();
        calculatePrice();
      });
      
      Object.values(checkboxes).forEach(checkbox => {
        if (checkbox) {
          checkbox.addEventListener('change', calculatePrice);
        }
      });
      
      updateSliderFill();
      calculatePrice();
    }

    // 6. Portfolio Lazy-Load Iframe on Click
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
      const mediaContainer = card.querySelector('.portfolio-media-container');
      const playOverlay = card.querySelector('.portfolio-play-overlay');
      const embedUrl = card.getAttribute('data-embed');
      
      if (mediaContainer && playOverlay && embedUrl) {
        playOverlay.addEventListener('click', (e) => {
          e.stopPropagation();
          
          const iframe = document.createElement('iframe');
          iframe.src = embedUrl;
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = 'none';
          iframe.setAttribute('allowfullscreen', 'true');
          iframe.setAttribute('allow', 'xr-spatial-tracking; vr; gyroscope; accelerometer');
          
          const projectTitle = card.querySelector('.portfolio-title');
          const titleText = projectTitle ? projectTitle.textContent || 'Tur Virtual 360' : 'Tur Virtual 360';
          iframe.setAttribute('title', titleText);
          
          mediaContainer.innerHTML = '';
          mediaContainer.appendChild(iframe);
        });
      }
    });

    // Hero 3D scroll animation (LERP-based smooth motion)
    const heroScrollContainer = document.getElementById('hero-scroll');
    const scrollCard = document.querySelector('.scroll-card') as HTMLElement | null;
    const scrollHeader = document.querySelector('.scroll-header') as HTMLElement | null;

    let targetProgress = 0;
    let currentProgress = 0;
    let isAnimating = false;

    if (heroScrollContainer && scrollCard && scrollHeader) {
      const checkMobile = () => window.innerWidth <= 768;

      const updateScrollAnimation = () => {
        currentProgress += (targetProgress - currentProgress) * 0.08;
        
        const rotateX = 20 * (1 - currentProgress);
        const isMobile = checkMobile();
        const startScale = isMobile ? 0.75 : 1.05;
        const endScale = isMobile ? 0.95 : 1.0;
        const scale = startScale + (endScale - startScale) * currentProgress;
        const translateY = -100 * currentProgress;
        
        scrollCard.style.transform = `rotateX(${rotateX}deg) scale(${scale})`;
        scrollHeader.style.transform = `translateY(${translateY}px)`;
        
        if (Math.abs(targetProgress - currentProgress) > 0.001) {
          requestAnimationFrame(updateScrollAnimation);
        } else {
          currentProgress = targetProgress;
          const finalRotateX = 20 * (1 - currentProgress);
          const finalScale = startScale + (endScale - startScale) * currentProgress;
          const finalTranslateY = -100 * currentProgress;
          scrollCard.style.transform = `rotateX(${finalRotateX}deg) scale(${finalScale})`;
          scrollHeader.style.transform = `translateY(${finalTranslateY}px)`;
          isAnimating = false;
        }
      };

      const handleScrollAnimation = () => {
        const rect = heroScrollContainer.getBoundingClientRect();
        const scrollContainerHeight = heroScrollContainer.offsetHeight;
        const windowHeight = window.innerHeight;
        
        const startScroll = rect.top;
        const scrollRange = Math.max(100, scrollContainerHeight - windowHeight);
        
        let progress = -startScroll / scrollRange;
        targetProgress = Math.max(0, Math.min(1, progress));
        
        if (!isAnimating) {
          isAnimating = true;
          requestAnimationFrame(updateScrollAnimation);
        }
      };

      window.addEventListener('scroll', handleScrollAnimation, { passive: true });
    }

    // Interact buttons for iframe
    const btnInteract = document.getElementById('btn-interact');
    const btnDeactivate = document.getElementById('btn-deactivate') as HTMLElement | null;
    const iframeOverlay = document.getElementById('iframe-overlay');
    const kuulaIframe = document.querySelector('.kuula-iframe');

    if (btnInteract && btnDeactivate && iframeOverlay && kuulaIframe) {
      btnInteract.addEventListener('click', () => {
        iframeOverlay.classList.add('hidden');
        kuulaIframe.classList.add('active');
        btnDeactivate.style.display = 'block';
      });
      
      btnDeactivate.addEventListener('click', () => {
        iframeOverlay.classList.remove('hidden');
        kuulaIframe.classList.remove('active');
        btnDeactivate.style.display = 'none';
      });
    }

    // Cookie Consent logic
    const cookieBanner = document.getElementById('cookie-banner');
    const btnAcceptCookies = document.getElementById('btn-accept-cookies');
    
    if (cookieBanner && btnAcceptCookies) {
      const isConsentAccepted = localStorage.getItem('cookie-consent-accepted');
      if (!isConsentAccepted) {
        setTimeout(() => {
          cookieBanner.classList.add('show');
        }, 1500);
      }
      
      btnAcceptCookies.addEventListener('click', () => {
        cookieBanner.classList.remove('show');
        localStorage.setItem('cookie-consent-accepted', 'true');
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      clearInterval(priceAnimationTimer);
      const bg = document.querySelector('.bg-paths-container');
      if (bg) bg.remove();
    };
  }, []);

  return (
    <>
      {/* Screen Reader Bypass */}
      <a href="#about" className="sr-only focus:not-sr-only">Sari la conținutul principal</a>

      {/* Header / Navigation */}
      <header className="navbar">
        <div className="container-luxe navbar-container">
          <a href="#" className="logo" aria-label="VirtuaLaz Tours Acasă">
            <img src="/logo_round.png" alt="VirtuaLaz Tours Logo" className="logo-icon-img" />
            <span className="logo-text">VirtuaLaz <span className="logo-sub">Tours</span></span>
          </a>

          {/* Menu Toggle for Mobile */}
          <button className="menu-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Deschide meniul">
            <span className="line"></span>
            <span className="line"></span>
          </button>

          {/* Navigation Links */}
          <nav className="nav-links" id="nav-menu">
            <a href="#about" className="nav-item">Descriere</a>
            <a href="#services" className="nav-item">Servicii</a>
            <a href="#portfolio" className="nav-item">Portofoliu</a>
            <a href="#pricing" className="nav-item">Prețuri</a>
            <a href="#contact" className="nav-btn-wrapper">
              <span className="btn-gold-nav">Solicită Ofertă</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Container Scroll Animation */}
      <section className="hero-scroll-container" id="hero-scroll">
        <div className="scroll-wrapper">
          <div className="scroll-header">
            <div className="flex-center-gap mb-4" style={{ justifyContent: "center" }}>
              <span className="line-gold-decor"></span>
              <span className="eyebrow">Redefinim Spațiul</span>
              <span className="line-gold-decor"></span>
            </div>
            <h1 className="display-1 reveal-luxe-text">
              Experiențe 360° <br />
              <span className="text-gold font-serif-italic">dintr<span style={{ fontStyle: "normal", fontFamily: "'Times New Roman', Georgia, serif", fontWeight: 300, display: "inline-block", transform: "translateY(-0.03em)", margin: "0 0.05em" }}>-</span>o altă perspectivă.</span>
            </h1>
            <p className="lede mx-auto max-w-xl mt-4 reveal-luxe-text">
              Adu-ți clienții în interiorul proprietății tale de oriunde s-ar afla.
            </p>
          </div>
          
          <div className="scroll-card-wrapper">
            <div className="scroll-card">
              <div className="scroll-card-inner">
                <iframe src="https://kuula.co/share/collection/7MbfB?logo=1&info=1&fs=1&vr=0&gyro=0&initload=0&thumbs=3&inst=ro" 
                        className="kuula-iframe" 
                        frameBorder={0} 
                        allowFullScreen 
                        allow="xr-spatial-tracking; gyroscope; accelerometer" 
                        title="VirtuaLaz Tours 360 Virtual Tour"></iframe>
                <div className="iframe-overlay" id="iframe-overlay">
                  <div className="overlay-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 className="overlay-title">Tur Virtual Interactiv 360°</h3>
                  <p className="overlay-desc">Apasă pe butonul de mai jos pentru a naviga în interiorul proprietății.</p>
                  <button className="btn-gold" id="btn-interact">Explorează Spațiul</button>
                </div>
                <button className="btn-deactivate" id="btn-deactivate" style={{ display: "none" }}>Dezactivează Turul</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <section className="logo-cloud-section">
        <div className="container-luxe">
          <h2 className="logo-cloud-title">Infrastructură modernă și sigură</h2>
          <div className="logo-cloud-wrapper">
            <div className="logo-cloud-track">
              {/* Double the list of logos for infinite scrolling effect */}
              <img src="https://svgl.app/library/nvidia-wordmark-light.svg" alt="Nvidia Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/supabase_wordmark_light.svg" alt="Supabase Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/openai_wordmark_light.svg" alt="OpenAI Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/turso-wordmark-light.svg" alt="Turso Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/vercel_wordmark.svg" alt="Vercel Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/github_wordmark_light.svg" alt="GitHub Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/claude-ai-wordmark-icon_light.svg" alt="Claude Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/clerk-wordmark-light.svg" alt="Clerk Logo" className="logo-cloud-img" />
              
              {/* Duplicate set */}
              <img src="https://svgl.app/library/nvidia-wordmark-light.svg" alt="Nvidia Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/supabase_wordmark_light.svg" alt="Supabase Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/openai_wordmark_light.svg" alt="OpenAI Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/turso-wordmark-light.svg" alt="Turso Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/vercel_wordmark.svg" alt="Vercel Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/github_wordmark_light.svg" alt="GitHub Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/claude-ai-wordmark-icon_light.svg" alt="Claude Logo" className="logo-cloud-img" />
              <img src="https://svgl.app/library/clerk-wordmark-light.svg" alt="Clerk Logo" className="logo-cloud-img" />
            </div>
          </div>
        </div>
      </section>

      {/* About / Philosophy Section */}
      <section className="about-section" id="about">
        <div className="container-luxe">
          <div className="grid-luxe items-center">
            {/* Text Column */}
            <div className="col-6 reveal-on-scroll">
              <div className="flex-center-gap mb-6">
                <span className="line-gold-decor"></span>
                <span className="eyebrow">Conceptul VirtuaLaz</span>
              </div>
              <h2 className="display-2 mb-8 reveal-luxe-text">Spațiul tău, redat fără compromisuri.</h2>
              <p className="body-luxe mb-6 reveal-luxe-text">
                Treci de la imagini statice la o experiență imersivă 360°! Cu VirtuaLaz Tours, clienții îți explorează locația de oriunde și interacționează direct cu spațiul prin hotspoturi inteligente (detalii, prețuri, rezervări), transformând simpli vizitatori în clienți plătitori.
              </p>
              <p className="body-luxe text-taupe mb-8 reveal-luxe-text">
                Nu ne limităm la simple scanări. Edităm individual fiecare panoramă, optimizăm tranzițiile pentru o mișcare naturală și integrăm puncte de interacțiune inteligente care aduc informație direct în interiorul experienței 360°.
              </p>
              
              <ul className="decor-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="list-icon">
                    <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Fidelitate vizuală extremă la rezoluție 8K HDR</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="list-icon">
                    <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Hotspot-uri interactive customizate (video, text, rezervări)</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="list-icon">
                    <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Compatibilitate deplină VR, Mobile & Desktop</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="list-icon">
                    <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Implementare directă pe site-ul tău / Google Maps</span>
                </li>
              </ul>
            </div>
            
            {/* Image Column with luxury framing */}
            <div className="col-6 reveal-on-scroll delay-200">
              <div className="image-wrapper-luxe">
                <div className="border-overlay-luxe"></div>
                <img src="/portfolio_villa.png" alt="Scanare camera intr-o vila moderna" className="img-luxe" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="container-luxe">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="eyebrow mb-4">Servicii Specializate</span>
            <h2 className="display-2 reveal-luxe-text">Lentila noastră. Spațiul tău.</h2>
            <p className="lede mx-auto max-w-2xl mt-4 reveal-luxe-text">
              Fiecare industrie are nevoi diferite. Am dezvoltat fluxuri de lucru optimizate pentru a pune în valoare particularitățile fiecărui spațiu scanat.
            </p>
          </div>

          <div className="services-grid">
            {/* Service Card 1 */}
            <div className="service-card reveal-on-scroll">
              <div className="card-content">
                <div className="service-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 21V12H15V21" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="card-title">Imobiliare</h3>
                <p className="card-text">
                  Vizionări interactive 24/7. Clienții explorează proprietățile de lux de la distanță, accelerând decizia de cumpărare.
                </p>
                <span className="card-link">Detalii Serviciu <span className="arrow">→</span></span>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="service-card reveal-on-scroll delay-100">
              <div className="card-content">
                <div className="service-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V16M8 12H16" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="card-title">Horeca & Evenimente</h3>
                <p className="card-text">
                  Prezintă atmosfera unică a locației. Clienții pot alege masa sau pot explora camerele înainte de rezervare.
                </p>
                <span className="card-link">Detalii Serviciu <span className="arrow">→</span></span>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="service-card reveal-on-scroll delay-200">
              <div className="card-content">
                <div className="service-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="card-title">Showrooms & Retail</h3>
                <p className="card-text">
                  E-commerce 3D imersiv. Adăugăm puncte de cumpărare direct pe produsele expuse în magazinul tău 360°.
                </p>
                <span className="card-link">Detalii Serviciu <span className="arrow">→</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section with Interactive Embeds */}
      <section className="portfolio-section" id="portfolio">
        <div className="container-luxe">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="eyebrow mb-4">Portofoliu Digital</span>
            <h2 className="display-2 reveal-luxe-text">Lucrări Recente</h2>
            <p className="lede mx-auto max-w-2xl mt-4 reveal-luxe-text">
              Tururile noastre virtuale au generat deja peste 10.000 de vizualizări. Oamenii chiar vor să exploreze spațiile în detaliu înainte de a le vizita fizic.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="portfolio-grid">
            {/* Item 1: BrasovHolidayApartaments 1 */}
            <div className="portfolio-item show">
              <div className="portfolio-card" data-embed="https://kuula.co/share/collection/7M2cX?logo=1&info=1&fs=1&vr=0&gyro=0&initload=0&thumbs=3&inst=ro" style={{ padding: 0, background: "#0D0E10", border: "1px solid rgba(197, 168, 128, 0.1)", borderRadius: "16px", overflow: "hidden", height: "500px", display: "flex", flexDirection: "column" }}>
                <div className="portfolio-media-container">
                  {/* Placeholder Image */}
                  <img src="/modern_living_room.png" alt="BrasovHolidayApartaments Tur Virtual 360" className="portfolio-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                  
                  {/* Hover/Interactive Overlay */}
                  <div className="portfolio-play-overlay">
                    <div className="play-icon-wrapper">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: "translateX(1.5px)" }}>
                        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#fff", fontWeight: 500 }}>Explorează în 360°</span>
                  </div>
                </div>
                <div className="portfolio-info" style={{ padding: "1.5rem", background: "#0D0E10", borderTop: "1px solid rgba(255,255,255,0.03)", flexShrink: 0 }}>
                  <span className="portfolio-meta">Rezidențial • Brașov</span>
                  <h3 className="portfolio-title">BrasovHolidayApartaments</h3>
                </div>
              </div>
            </div>

            {/* Item 2: Satul de lut */}
            <div className="portfolio-item show">
              <div className="portfolio-card" data-embed="https://kuula.co/share/collection/7MNML?logo=1&info=1&fs=1&vr=0&gyro=0&initload=0&thumbs=3&inst=ro" style={{ padding: 0, background: "#0D0E10", border: "1px solid rgba(197, 168, 128, 0.1)", borderRadius: "16px", overflow: "hidden", height: "500px", display: "flex", flexDirection: "column" }}>
                <div className="portfolio-media-container">
                  {/* Placeholder Image */}
                  <img src="/clay_village_houses.png" alt="Satul de lut Tur Virtual 360" className="portfolio-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                  
                  {/* Hover/Interactive Overlay */}
                  <div className="portfolio-play-overlay">
                    <div className="play-icon-wrapper">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: "translateX(1.5px)" }}>
                        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#fff", fontWeight: 500 }}>Explorează în 360°</span>
                  </div>
                </div>
                <div className="portfolio-info" style={{ padding: "1.5rem", background: "#0D0E10", borderTop: "1px solid rgba(255,255,255,0.03)", flexShrink: 0 }}>
                  <span className="portfolio-meta">Agroturism • Buzău</span>
                  <h3 className="portfolio-title">Satul de lut</h3>
                </div>
              </div>
            </div>

            {/* Item 3: BrasovHolidayApartaments 2 */}
            <div className="portfolio-item show">
              <div className="portfolio-card" data-embed="https://kuula.co/share/collection/7M2cj?logo=1&info=1&fs=1&vr=0&gyro=0&initload=0&thumbs=3&inst=ro" style={{ padding: 0, background: "#0D0E10", border: "1px solid rgba(197, 168, 128, 0.1)", borderRadius: "16px", overflow: "hidden", height: "500px", display: "flex", flexDirection: "column" }}>
                <div className="portfolio-media-container">
                  {/* Placeholder Image */}
                  <img src="/modern_apartment_blocks.png" alt="BrasovHolidayApartaments Tur Virtual 360" className="portfolio-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                  
                  {/* Hover/Interactive Overlay */}
                  <div className="portfolio-play-overlay">
                    <div className="play-icon-wrapper">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: "translateX(1.5px)" }}>
                        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#fff", fontWeight: 500 }}>Explorează în 360°</span>
                  </div>
                </div>
                <div className="portfolio-info" style={{ padding: "1.5rem", background: "#0D0E10", borderTop: "1px solid rgba(255,255,255,0.03)", flexShrink: 0 }}>
                  <span className="portfolio-meta">Rezidențial • Brașov</span>
                  <h3 className="portfolio-title">BrasovHolidayApartaments</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Pricing Section (Motion Framed) */}
      <section className="pricing-section" id="pricing">
        <div className="container-luxe">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="eyebrow mb-4">Configurator de Tarife</span>
            <h2 className="display-2 reveal-luxe-text">Calculează-ți proiectul 360°</h2>
            <p className="lede mx-auto max-w-2xl mt-4 reveal-luxe-text">
              Ajustează parametrii de mai jos pentru a estima tariful turului tău virtual. Prețurile încep de la 100€ și ajung până la 1000€, complet transparente.
            </p>
          </div>

          <div className="pricing-container grid-luxe">
            {/* Control Panel Card */}
            <div className="col-7 control-panel-card reveal-on-scroll">
              <h3 className="panel-subtitle font-serif mb-8">Personalizează Parametrii</h3>
              
              {/* Slider for Area / Panoramas */}
              <div className="control-group">
                <div className="control-label-wrapper">
                  <label htmlFor="area-slider" className="control-label">Suprafața estimată a spațiului</label>
                  <span className="control-value" id="area-val">150 mp</span>
                </div>
                <div className="slider-wrapper">
                  <input type="range" id="area-slider" min="50" max="1000" step="25" defaultValue="150" className="luxe-slider" />
                  <div className="slider-track-fill" id="slider-fill"></div>
                </div>
                <div className="slider-ticks">
                  <span style={{ position: "absolute", left: "0%", transform: "translateX(0%)" }}>50 mp</span>
                  <span style={{ position: "absolute", left: "26.3%", transform: "translateX(-50%)" }}>300 mp</span>
                  <span style={{ position: "absolute", left: "57.9%", transform: "translateX(-50%)" }}>600 mp</span>
                  <span style={{ position: "absolute", left: "100%", transform: "translateX(-100%)" }}>1000 mp</span>
                </div>
              </div>

              {/* Checkbox Options */}
              <div className="control-group">
                <span className="control-label block mb-6">Opțiuni & Funcționalități Extra</span>
                
                <div className="checkbox-grid">
                  {/* Checkbox 1 */}
                  <label className="checkbox-luxe">
                    <input type="checkbox" id="opt-hotspots" value="80" className="luxe-checkbox-input" />
                    <span className="checkbox-box"></span>
                    <span className="checkbox-details">
                      <span className="checkbox-title">Hotspot-uri Interactive</span>
                      <span className="checkbox-desc">Etichete cu text, imagini sau video embedded (+80€)</span>
                    </span>
                  </label>

                  {/* Checkbox 2 */}
                  <label className="checkbox-luxe">
                    <input type="checkbox" id="opt-branding" value="120" className="luxe-checkbox-input" />
                    <span className="checkbox-box"></span>
                    <span className="checkbox-details">
                      <span className="checkbox-title">Branding Customizat</span>
                      <span className="checkbox-desc">Logo propriu în interfață, culori brand, meniu custom (+120€)</span>
                    </span>
                  </label>

                  {/* Checkbox 3 */}
                  <label className="checkbox-luxe">
                    <input type="checkbox" id="opt-teaser" value="50" className="luxe-checkbox-input" />
                    <span className="checkbox-box"></span>
                    <span className="checkbox-details">
                      <span className="checkbox-title">Teaser Video 360</span>
                      <span className="checkbox-desc">Scurt montaj video adaptat pentru rețelele sociale (+50€)</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Summary & Value Card */}
            <div className="col-5 pricing-summary-card reveal-on-scroll delay-150">
              <div className="summary-border-gold"></div>
              
              <div className="summary-content">
                <span className="summary-eyebrow eyebrow">Pachet Estimat</span>
                <h3 className="summary-title" id="package-title">Premium Silver</h3>
                
                <div className="summary-price-wrapper">
                  <span className="summary-currency">€</span>
                  <span className="summary-price" id="price-number">250</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <ul className="summary-features" id="summary-features-list">
                  <li>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="feature-tick text-gold">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span id="feat-panos">Aproximativ 8-12 panorame 8K</span>
                  </li>
                  <li>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="feature-tick text-gold">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Editare foto profesională HDR</span>
                  </li>
                  <li>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="feature-tick text-gold">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Găzduire pe serverele noastre timp de 12 luni</span>
                  </li>
                  <li className="dynamic-feature" data-feature="opt-hotspots" style={{ display: "none" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="feature-tick text-gold">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Hotspot-uri interactive configurate</span>
                  </li>

                  <li className="dynamic-feature" data-feature="opt-branding" style={{ display: "none" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="feature-tick text-gold">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Meniu cu logo-ul și culorile companiei tale</span>
                  </li>
                  <li className="dynamic-feature" data-feature="opt-teaser" style={{ display: "none" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="feature-tick text-gold">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Video teaser 360 (Format Reel / TikTok)</span>
                  </li>
                </ul>
                
                <a href="#contact" className="btn-gold w-full mt-10 justify-center">
                  <span>Rezervă Ședința Foto</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
                <p className="summary-note mt-4">Calcul aproximativ. Oferta finală poate varia în funcție de complexitatea arhitecturală a spațiului.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container-luxe">
          <div className="contact-centered-wrapper reveal-on-scroll">
            <div className="flex-center-gap mb-6" style={{ justifyContent: "center" }}>
              <span className="line-gold-decor"></span>
              <span className="eyebrow">Contact direct</span>
              <span className="line-gold-decor"></span>
            </div>
            
            <h2 className="display-2 text-center mb-6 reveal-luxe-text">Pregătit să îți aduci spațiul în online?</h2>
            
            <p className="body-luxe text-center text-taupe max-w-2xl mx-auto mb-12 reveal-luxe-text">
              Suntem pregătiți să transpunem realitatea spațiului tău în pixeli. Contactează-ne direct pentru o ofertă personalizată.
            </p>

            <div className="contact-cards-grid">
              {/* Card E-mail */}
              <div className="contact-card-luxe">
                <div className="contact-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="contact-card-label">E-mail Direct</span>
                <a href="mailto:ilaz360.studio@gmail.com" className="contact-card-value">ilaz360.studio@gmail.com</a>
              </div>

              {/* Card Telefon */}
              <div className="contact-card-luxe">
                <div className="contact-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="contact-card-label">Telefon / WhatsApp</span>
                <a href="tel:+40751525405" className="contact-card-value">0751 525 405</a>
              </div>

              {/* Card Locație */}
              <div className="contact-card-luxe">
                <div className="contact-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="contact-card-label">Locații deservite</span>
                <span className="contact-card-value">Brașov, Buzău și orice alt oraș din țară</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-luxe">
        <div className="container-luxe">
          <div className="footer-top grid-luxe">
            <div className="col-5">
              <a href="#" className="logo mb-6" aria-label="VirtuaLaz Tours Acasă">
                <img src="/logo_round.png" alt="VirtuaLaz Tours Logo" className="logo-icon-img" />
                <span className="logo-text">VirtuaLaz <span className="logo-sub">Tours</span></span>
              </a>
              <div className="footer-direct-badge">
                <span className="badge-line"></span>
                <span className="badge-text">Prezență digitală de lux, direct, fără intermediari.</span>
              </div>
            </div>

            <div className="col-7 footer-links-container">
              <div className="footer-link-group">
                <h4 className="footer-link-title eyebrow">Social Media</h4>
                <ul className="footer-links-list">
                  <li><a href="https://www.instagram.com/virtualaz_tours/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                  <li><a href="https://www.facebook.com/profile.php?id=61581594847466&locale=ro_RO" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                  <li><a href="https://www.tiktok.com/@virtualaz_tours360" target="_blank" rel="noopener noreferrer">TikTok</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright-text">© 2026 VirtuaLaz Tours. Toate drepturile rezervate.</p>
            <div className="footer-legal-links">
              <a href="#">Politică de Confidențialitate</a>
              <a href="#">Politică de Cookies</a>
              <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer">ANPC</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      <div id="cookie-banner" className="cookie-banner-luxe">
        <div className="cookie-content">
          <p className="cookie-text">Acest site folosește cookie-uri pentru a vă oferi o experiență îmbunătățită. Prin continuarea navigării, vă exprimați acordul.</p>
          <button id="btn-accept-cookies" className="btn-gold-cookie">Accept</button>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   main.js – Interaktivität für Mike Seilers Homepage
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. Dark Mode Toggle + automatische System-Erkennung
  --------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');

  function setTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      localStorage.setItem('theme', theme);
    }
  }

  // Automatisch dem Betriebssystem folgen (macOS/iOS "Automatisch" = Tag/Nacht)
  // Greift nur, wenn der Nutzer KEINE manuelle Auswahl getroffen hat.
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  systemDark.addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* ---------------------------------------------------------
     2. Scroll Progress Bar
  --------------------------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  /* ---------------------------------------------------------
     3. Nav-Effekte beim Scrollen (Scroll-Klasse + Active-Link)
  --------------------------------------------------------- */
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    if (!nav) return;

    // Nav-Schatten beim Scrollen
    if (window.scrollY > 10) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }

    // Aktiven Abschnitt ermitteln
    let currentId = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 80;
      if (window.scrollY >= top) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + currentId
      );
    });
  }

  /* ---------------------------------------------------------
     4. Back-to-Top Button
  --------------------------------------------------------- */
  const backToTop = document.getElementById('back-to-top');

  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     5. Gemeinsamer Scroll-Handler (Performance: ein Listener)
  --------------------------------------------------------- */
  window.addEventListener('scroll', function () {
    updateScrollProgress();
    updateNav();
    updateBackToTop();
  }, { passive: true });

  // Initial aufrufen
  updateScrollProgress();
  updateNav();
  updateBackToTop();

  /* ---------------------------------------------------------
     6. Mobile Navigation
  --------------------------------------------------------- */
  const mobileToggle = document.getElementById('nav-mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
      const isOpen = nav.classList.contains('nav-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Schließen beim Klick auf einen Nav-Link
    if (navLinksContainer) {
      navLinksContainer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('nav-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* ---------------------------------------------------------
     7. Scroll-Reveal via IntersectionObserver
  --------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // einmalig
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback für ältere Browser
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------------------------------------------------------
     8. Typing-Animation im Hero
  --------------------------------------------------------- */
  const typedText = document.getElementById('typed-text');
  const phrases = [
    'Systemadministrator',
    'Technik-Enthusiast',
    'Weltentdecker',
    'Familienvater',
    'Sportler',
  ];

  if (typedText) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 120;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        typedText.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        delay = 60;
      } else {
        typedText.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        delay = 120;
      }

      if (!isDeleting && charIndex === current.length) {
        // Pause am Ende des Wortes
        delay = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }

    // Kleine Startverzögerung
    setTimeout(type, 600);
  }

  /* ---------------------------------------------------------
     9. Foto-Fehler-Handler (Fallback auf Initial "M")
  --------------------------------------------------------- */
  const heroPhoto = document.getElementById('hero-photo');
  if (heroPhoto) {
    heroPhoto.addEventListener('error', function () {
      const wrapper = heroPhoto.closest('.hero-photo-wrapper');
      if (wrapper) {
        wrapper.classList.add('photo-error');
      }
      heroPhoto.style.display = 'none';
    });

    // Falls das Bild bereits gecacht und fehlerhaft ist
    if (heroPhoto.complete && !heroPhoto.naturalWidth) {
      const wrapper = heroPhoto.closest('.hero-photo-wrapper');
      if (wrapper) wrapper.classList.add('photo-error');
      heroPhoto.style.display = 'none';
    }
  }

  /* ---------------------------------------------------------
     10. Kontaktformular – AJAX-Submit (Formspree)
  --------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const action = contactForm.getAttribute('action') || '';

      // Platzhalter-Erkennung: {FORM_ID} noch nicht ersetzt
      if (action.includes('{FORM_ID}')) {
        showStatus(
          'Bitte trage zuerst deine Formspree-ID in die index.html ein.',
          'error'
        );
        return;
      }

      // Ladeanimation
      setSubmitting(true);

      const data = new FormData(contactForm);

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          contactForm.reset();
          showStatus(
            'Vielen Dank! Deine Nachricht ist angekommen. Ich melde mich bald.',
            'success'
          );
        } else {
          const json = await response.json().catch(function () { return {}; });
          const msg =
            (json.errors && json.errors.map(function (e) { return e.message; }).join(', ')) ||
            'Etwas hat nicht geklappt. Versuch es später nochmal.';
          showStatus(msg, 'error');
        }
      } catch {
        showStatus(
          'Netzwerkfehler. Bitte prüfe deine Verbindung und versuche es erneut.',
          'error'
        );
      } finally {
        setSubmitting(false);
      }
    });
  }

  function setSubmitting(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    if (btnText) btnText.style.opacity = loading ? '0' : '1';
    if (btnLoading) btnLoading.style.display = loading ? 'inline-flex' : 'none';
  }

  function showStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    formStatus.style.display = 'block';

    // Meldung nach 6 s bei Erfolg ausblenden
    if (type === 'success') {
      setTimeout(function () {
        formStatus.style.display = 'none';
      }, 6000);
    }
  }

  /* ---------------------------------------------------------
     11. Smooth-Scroll für Anker-Links (Safari-Fallback)
  --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      // Modals via data-modal handhaben (href="#" überspringen)
      if (anchor.dataset.modal) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------------------------------------------------------
     12. Modal-Steuerung (Impressum / Datenschutz)
  --------------------------------------------------------- */
  function openModal(id) {
    var modal = document.getElementById('modal-' + id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    var closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Trigger-Links (Nav + Footer)
  document.querySelectorAll('[data-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(trigger.dataset.modal);
      // Mobil-Nav schließen
      if (nav) nav.classList.remove('nav-open');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Schließen-Button und Backdrop
  document.querySelectorAll('.modal').forEach(function (modal) {
    var closeBtn = modal.querySelector('.modal-close');
    var backdrop = modal.querySelector('.modal-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', function () { closeModal(modal); });
    if (backdrop) backdrop.addEventListener('click', function () { closeModal(modal); });
  });

  // ESC-Taste schließt offene Modals
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach(closeModal);
    }
  });

})();

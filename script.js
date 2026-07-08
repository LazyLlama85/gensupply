/* ============================================================
   Generation Supply — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close the menu after tapping a link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ---------- Animated counters (impact stats + supply ledger) ---------- */
  var counters = document.querySelectorAll("[data-count]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function formatNumber(n) {
    return n.toLocaleString("en-US");
  }

  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";

    if (reduceMotion) {
      el.textContent = prefix + formatNumber(target) + suffix;
      return;
    }

    var duration = 1400;
    var start = null;

    function tick(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(eased * target);
      el.textContent = prefix + formatNumber(value) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && counters.length) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (c) { observer.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Scroll reveal ---------- */
  // Elements fade in as they scroll into view. Skipped entirely when the
  // visitor prefers reduced motion (or when IntersectionObserver is missing),
  // so content is always visible without JS-added classes.
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll(
      ".section-head, .feature, .step, .stat, .hub-card, .ledger, .program, " +
      ".stop-card, .member, .involve-card, .insta-card, .milestone-copy, .testimonial"
    );

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal");
      // Tilted cards keep their hand-placed rotation; they only fade in
      if (!/(^|\s)tilt-/.test(el.className)) el.classList.add("reveal-up");
      // Small stagger so siblings ripple in rather than popping at once
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      revealObserver.observe(el);
    });
  }

  /* ---------- Contact form (opens the visitor's email client) ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  var ORG_EMAIL = "generationsupplyinquiries@gmail.com";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var subject = form.subject.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        setStatus("Please fill in your name, email, and a message.", "err");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("Please enter a valid email address.", "err");
        return;
      }

      var mailSubject = subject || "Message from " + name + " via the website";
      var mailBody =
        message + "\n\n— " + name + "\n" + email;

      var href =
        "mailto:" + ORG_EMAIL +
        "?subject=" + encodeURIComponent(mailSubject) +
        "&body=" + encodeURIComponent(mailBody);

      window.location.href = href;
      setStatus("Opening your email app with the message ready to send. If nothing happens, just email us at " + ORG_EMAIL + ".", "ok");
    });
  }

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg;
    status.className = "form-status " + (kind || "");
  }

  /* ---------- Footer year (keeps copyright current) ---------- */
  // Static 2026 is fine for launch; no-op kept intentionally simple.
})();

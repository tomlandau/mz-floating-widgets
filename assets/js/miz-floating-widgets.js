/**
 * Mizrahnik Floating Widgets v1.0.0
 * Coupon button · Scroll-to-top
 * Single IIFE — works on both WP and Next.js
 */
(function () {
  "use strict";

  if (window !== window.top) return; // Don't run inside iframes

  if (window.__MIZ_FW_LOADED) return;
  window.__MIZ_FW_LOADED = true;

  function init() {
    initCouponButton();
    initScrollToTop();
  }

  /* =========================================
     1. Coupon Button
     ========================================= */
  function initCouponButton() {
    var container = document.createElement("div");
    container.id = "mizCouponContainer";
    container.className = "miz-coupon-container desktop-pos";

    var toggleBtn = document.createElement("div");
    toggleBtn.className = "miz-coupon-toggle";
    toggleBtn.id = "mizToggleBtn";

    var link = document.createElement("a");
    link.href = "https://mizrahnik.co.il/coupons/";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "miz-coupon-link";
    link.setAttribute("aria-label", "קופונים שווים");

    var ticketBody = document.createElement("div");
    ticketBody.className = "miz-coupon-ticket-body";

    var ticketText = document.createElement("span");
    ticketText.className = "miz-coupon-ticket-text";
    ticketText.textContent = "קופונים שווים";

    var iconWrap = document.createElement("div");
    iconWrap.className = "miz-coupon-icon-wrap";
    iconWrap.innerHTML =
      '<svg class="miz-coupon-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
      '<path d="M21 6.5c0 1.381 1.119 2.5 2.5 2.5v6c-1.381 0-2.5 1.119-2.5 2.5h-18c0-1.381-1.119-2.5-2.5-2.5v-6c1.381 0 2.5-1.119 2.5-2.5h18zm-10 3.5c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm0 4c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"/>' +
      "</svg>";

    ticketBody.appendChild(ticketText);
    ticketBody.appendChild(iconWrap);
    link.appendChild(ticketBody);
    container.appendChild(toggleBtn);
    container.appendChild(link);
    document.body.appendChild(container);

    // Excluded pages (WP-only, harmless on Next.js)
    var excludedTerms = [
      "checkout", "checkout-2", "cart", "my-account",
      "/coupons/", "/club", "product",
      "/club-area/", "/club-country/", "/club-pricing/",
    ];

    var currentUrl = window.location.href;
    var shouldHide = excludedTerms.some(function (term) {
      return currentUrl.indexOf(term) !== -1;
    });

    if (
      (document.body && document.body.classList.contains("woocommerce-page")) ||
      shouldHide
    ) {
      container.style.display = "none";
      return;
    }

    function updateArrowIcon() {
      var isHidden = container.classList.contains("hidden");
      toggleBtn.innerHTML = isHidden ? "&#8592;" : "&#8594;";
    }

    function checkResponsive() {
      if (window.innerWidth <= 768) {
        container.classList.remove("desktop-pos");
        container.classList.add("mobile-pos");
        container.classList.remove("hidden");
      } else {
        container.classList.remove("mobile-pos");
        container.classList.add("desktop-pos");
        try {
          if (localStorage.getItem("miz_coupon_hidden") === "true") {
            container.classList.add("hidden");
          }
        } catch (e) {}
        updateArrowIcon();
      }
    }

    checkResponsive();
    window.addEventListener("resize", checkResponsive);

    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      container.classList.toggle("hidden");
      try {
        localStorage.setItem(
          "miz_coupon_hidden",
          container.classList.contains("hidden")
        );
      } catch (e) {}
      updateArrowIcon();
    });
  }

  /* =========================================
     2. Scroll to Top
     ========================================= */
  function initScrollToTop() {
    var btn = document.createElement("button");
    btn.id = "mizScrollToTop";
    btn.setAttribute("aria-label", "לראש הדף");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M5 15l7-7 7 7"></path>' +
      "</svg>";
    document.body.appendChild(btn);

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener(
      "scroll",
      function () {
        var scrolled =
          document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100;

        if (scrolled) {
          if (
            btn.style.opacity === "0" ||
            btn.style.display === "none" ||
            btn.style.display === ""
          ) {
            btn.style.display = "flex";
            setTimeout(function () {
              btn.style.opacity = "1";
            }, 10);
          }
        } else {
          btn.style.opacity = "0";
          setTimeout(function () {
            if (
              document.body.scrollTop <= 100 &&
              document.documentElement.scrollTop <= 100
            ) {
              btn.style.display = "none";
            }
          }, 400);
        }
      },
      { passive: true }
    );
  }

  /* =========================================
     Bootstrap
     ========================================= */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

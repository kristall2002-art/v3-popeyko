(function () {
  "use strict";

  /* ===== Hero picker (адаптация picker-механики из промпта talent-collective) ===== */
  var backgrounds = document.querySelectorAll(".hero__bg");
  var picks = document.querySelectorAll(".picker__item");
  var descEl = document.getElementById("heroDesc");
  var descLabelEl = document.getElementById("heroDescLabel");
  var nameEl = document.getElementById("heroMetaName");
  var roleEl = document.getElementById("heroMetaRole");

  function activate(index) {
    backgrounds.forEach(function (bg, i) {
      bg.classList.toggle("is-active", i === index);
    });
    picks.forEach(function (btn, i) {
      btn.setAttribute("aria-pressed", i === index ? "true" : "false");
    });
    var data = picks[index];
    if (!data) return;
    var label = data.getAttribute("data-label") || "";
    var role = data.getAttribute("data-role") || "";
    var desc = data.getAttribute("data-desc") || "";

    if (nameEl) {
      nameEl.textContent = label;
      restartFade(nameEl);
    }
    if (roleEl) {
      roleEl.textContent = role;
    }
    if (descEl) {
      descEl.textContent = desc;
      restartFade(descEl);
    }
    if (descLabelEl) {
      descLabelEl.textContent = label;
    }
  }

  function restartFade(el) {
    el.classList.remove("fade-in");
    // форсируем reflow, чтобы анимация перезапустилась
    void el.offsetWidth;
    el.classList.add("fade-in");
  }

  picks.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      activate(i);
    });
  });

  /* ===== Раскрывающиеся блоки: стрелка/плюс синхронно с [open] управляется CSS ===== */

  /* ===== Мобильное меню ===== */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ===== Доступность: размер шрифта А-/А+ и режим для слабовидящих ===== */
  var root = document.documentElement;
  var STORAGE_FONT = "popeyko_fs";
  var STORAGE_CONTRAST = "popeyko_contrast";
  var MIN_FS = 15, MAX_FS = 20, STEP = 1, BASE_FS = 16;

  function applyFontSize(px) {
    root.style.fontSize = px + "px";
  }
  function currentFontSize() {
    var stored = parseInt(localStorage.getItem(STORAGE_FONT), 10);
    return isNaN(stored) ? BASE_FS : stored;
  }
  var fsMinus = document.getElementById("fsMinus");
  var fsPlus = document.getElementById("fsPlus");
  var fs = currentFontSize();
  applyFontSize(fs);

  if (fsMinus) {
    fsMinus.addEventListener("click", function () {
      fs = Math.max(MIN_FS, fs - STEP);
      applyFontSize(fs);
      localStorage.setItem(STORAGE_FONT, fs);
    });
  }
  if (fsPlus) {
    fsPlus.addEventListener("click", function () {
      fs = Math.min(MAX_FS, fs + STEP);
      applyFontSize(fs);
      localStorage.setItem(STORAGE_FONT, fs);
    });
  }

  var contrastBtn = document.getElementById("contrastToggle");
  function applyContrast(on) {
    root.setAttribute("data-contrast", on ? "1" : "0");
    if (contrastBtn) contrastBtn.classList.toggle("is-active", on);
    if (contrastBtn) contrastBtn.setAttribute("aria-pressed", on ? "true" : "false");
  }
  applyContrast(localStorage.getItem(STORAGE_CONTRAST) === "1");
  if (contrastBtn) {
    contrastBtn.addEventListener("click", function () {
      var on = root.getAttribute("data-contrast") !== "1";
      applyContrast(on);
      localStorage.setItem(STORAGE_CONTRAST, on ? "1" : "0");
    });
  }

  /* ===== Год в подвале ===== */
  var yearEl = document.getElementById("curYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

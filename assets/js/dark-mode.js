(function () {
  const storageKey = "preferred-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {}
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();

    if (stored === "dark" || stored === "light") {
      return stored;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    setStoredTheme(theme);

    const button = document.querySelector(".dark-mode-toggle");

    if (button) {
      button.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
      button.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", function () {
    const nav =
      document.querySelector(".greedy-nav .visible-links") ||
      document.querySelector(".masthead__menu");

    const button = document.createElement("button");
    button.className = "dark-mode-toggle";
    button.type = "button";

    button.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });

    if (nav && nav.tagName.toLowerCase() === "ul") {
      const li = document.createElement("li");
      li.className = "masthead__menu-item dark-mode-toggle-item";
      li.appendChild(button);
      nav.appendChild(li);
    } else if (nav) {
      nav.appendChild(button);
    }

    applyTheme(getPreferredTheme());
  });
})();

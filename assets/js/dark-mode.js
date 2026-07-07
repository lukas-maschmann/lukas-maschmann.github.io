(function () {
  const storageKey = "preferred-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {}
  }

  function getSystemTheme() {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getPreferredTheme() {
    const storedTheme = getStoredTheme();

    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }

    return getSystemTheme();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    setStoredTheme(theme);

    const toggle = document.querySelector("#theme-toggle");
    if (toggle) {
      toggle.checked = theme === "dark";
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  function insertToggle() {
    if (document.querySelector("#theme-toggle")) return;

    const nav =
      document.querySelector(".greedy-nav .visible-links") ||
      document.querySelector(".masthead__menu");

    if (!nav) return;

    const wrapper = document.createElement("li");
    wrapper.className = "masthead__menu-item theme-toggle-item";

    wrapper.innerHTML = `
      <label class="theme-switch" title="Toggle dark mode">
        <input id="theme-toggle" type="checkbox" role="switch" aria-label="Toggle dark mode">
        <span class="theme-switch__slider"></span>
      </label>
    `;

    if (nav.tagName.toLowerCase() === "ul") {
      nav.appendChild(wrapper);
    } else {
      nav.appendChild(wrapper.firstElementChild);
    }

    applyTheme(getPreferredTheme());
  }

  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", insertToggle);

  document.addEventListener("change", function (event) {
    if (event.target && event.target.id === "theme-toggle") {
      applyTheme(event.target.checked ? "dark" : "light");
    }
  });
})();

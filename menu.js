
/* Image Tools - Responsive Dropdown Navigation */
(function () {
  const tools = [
    { name: "Image Resizer", url: "image-resizer.html" },
    { name: "Image Compressor", url: "image-compressor.html" },
    { name: "Image Converter", url: "image-converter.html" },
    { name: "HEIC to JPG", url: "heic-to-jpg.html" },
    { name: "WebP to JPG", url: "webp-to-jpg.html" },
    { name: "Image Analyzer", url: "image-analyzer.html" },
    { name: "Image Collage", url: "image-collage.html" },
    { name: "Image Optimizer", url: "image-optimizer.html" },
    { name: "Image Object Remover", url: "image-object-remover.html" },
    { name: "Image Smart", url: "image-smart.html" },
    { name: "Image Social", url: "image-social.html" }
  ];

  const nav = document.querySelector("header nav");
  if (!nav) return;

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const style = document.createElement("style");
  style.textContent = `
    header nav.tools-dropdown {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .tools-dropdown .tools-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 11px 16px;
      border: 1px solid #334155;
      border-radius: 10px;
      background: #17243b;
      color: #ffffff;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .tools-dropdown .tools-toggle:hover {
      background: #243550;
    }

    .tools-dropdown .tools-arrow {
      transition: transform 0.2s ease;
    }

    .tools-dropdown .tools-toggle[aria-expanded="true"] .tools-arrow {
      transform: rotate(180deg);
    }

    .tools-menu {
      position: fixed;
      z-index: 999999;
      display: none;
      width: 280px;
      max-width: calc(100vw - 16px);
      max-height: calc(100vh - 24px);
      overflow-x: hidden;
      overflow-y: auto;
      padding: 8px;
      border: 1px solid #334155;
      border-radius: 12px;
      background: #101b2e;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
      box-sizing: border-box;
    }

    .tools-menu.open {
      display: block;
    }

    .tools-menu a {
      display: block;
      width: 100%;
      padding: 12px;
      border-radius: 7px;
      color: #e2e8f0;
      text-decoration: none;
      font-size: 15px;
      line-height: 1.4;
      overflow-wrap: anywhere;
      box-sizing: border-box;
    }

    .tools-menu a:hover {
      background: #243550;
      color: #ffffff;
    }

    .tools-menu a[aria-current="page"] {
      background: #1e3a5f;
      color: #93c5fd;
      font-weight: 700;
    }
  `;

  document.head.appendChild(style);

  nav.classList.add("tools-dropdown");
  nav.replaceChildren();

  const button = document.createElement("button");
  button.type = "button";
  button.className = "tools-toggle";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-haspopup", "true");
  button.innerHTML =
    'All Tools <span class="tools-arrow" aria-hidden="true">▾</span>';

  const menu = document.createElement("div");
  menu.className = "tools-menu";

  tools.forEach(function (tool) {
    const link = document.createElement("a");
    link.href = tool.url;
    link.textContent = tool.name;

    if (currentPage === tool.url) {
      link.setAttribute("aria-current", "page");
    }

    menu.appendChild(link);
  });

  function positionMenu() {
    if (!menu.classList.contains("open")) return;

    const buttonRect = button.getBoundingClientRect();
    const margin = 8;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;

    menu.style.left = "8px";
    menu.style.top = "8px";
    menu.style.maxHeight = Math.max(120, viewportHeight - 16) + "px";

    const menuWidth = menu.getBoundingClientRect().width;
    const left = Math.max(
      margin,
      Math.min(buttonRect.left, viewportWidth - menuWidth - margin)
    );

    const menuHeight = menu.getBoundingClientRect().height;
    let top = buttonRect.bottom + margin;

    if (top + menuHeight > viewportHeight - margin) {
      top = buttonRect.top - menuHeight - margin;
    }

    top = Math.max(
      margin,
      Math.min(top, viewportHeight - menuHeight - margin)
    );

    menu.style.left = left + "px";
    menu.style.top = top + "px";
  }

  function closeMenu() {
    menu.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", function (event) {
    event.stopPropagation();

    if (menu.classList.contains("open")) {
      closeMenu();
    } else {
      menu.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      positionMenu();
    }
  });

  menu.addEventListener("click", function (event) {
    event.stopPropagation();

    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
      button.focus();
    }
  });

  window.addEventListener("resize", positionMenu);
  window.addEventListener("orientationchange", function () {
    window.setTimeout(positionMenu, 150);
  });

  nav.appendChild(button);
  document.body.appendChild(menu);
})();

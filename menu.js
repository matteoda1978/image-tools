
/* Image Tools - Dropdown Navigation */
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
      justify-content: flex-start;
      gap: 12px;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .tools-dropdown .tools-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      max-width: 100%;
      padding: 11px 16px;
      border: 1px solid #334155;
      border-radius: 10px;
      background: #17243b;
      color: #ffffff;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      box-sizing: border-box;
    }

    .tools-dropdown .tools-toggle:hover {
      background: #243550;
    }

    .tools-dropdown .tools-arrow {
      display: inline-block;
      transition: transform 0.2s ease;
    }

    .tools-dropdown .tools-toggle[aria-expanded="true"] .tools-arrow {
      transform: rotate(180deg);
    }

    .tools-dropdown .tools-menu {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      right: auto;
      z-index: 99999;
      display: none;
      width: 280px;
      max-width: calc(100vw - 32px);
      max-height: 70vh;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 8px;
      border: 1px solid #334155;
      border-radius: 12px;
      background: #101b2e;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
      box-sizing: border-box;
    }

    .tools-dropdown .tools-menu.open {
      display: block;
    }

    .tools-dropdown .tools-menu a {
      display: block;
      width: 100%;
      padding: 11px 12px;
      border-radius: 7px;
      color: #e2e8f0;
      text-decoration: none;
      font-size: 14px;
      line-height: 1.4;
      overflow-wrap: anywhere;
      box-sizing: border-box;
    }

    .tools-dropdown .tools-menu a:hover {
      background: #243550;
      color: #ffffff;
    }

    .tools-dropdown .tools-menu a[aria-current="page"] {
      background: #1e3a5f;
      color: #93c5fd;
      font-weight: 700;
    }

    @media (max-width: 600px) {
      header nav.tools-dropdown {
        gap: 6px;
      }

      .tools-dropdown .tools-toggle {
        padding: 10px 13px;
      }

      .tools-dropdown .tools-menu {
        left: 0;
        right: auto;
        width: min(280px, calc(100vw - 32px));
        max-height: 65vh;
      }
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

  function closeMenu() {
    menu.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", function (event) {
    if (!nav.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
      button.focus();
    }
  });

  nav.appendChild(button);
  nav.appendChild(menu);
})();

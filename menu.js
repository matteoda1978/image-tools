(function () {
  const tools = [
    { name: "Image Resizer", url: "image-resizer.html" },
    { name: "Image Compressor", url: "image-compressor.html" },
    { name: "Compress Image to 100KB", url: "compress-image-to-100kb.html" },
    { name: "Image Converter", url: "image-converter.html" },
    { name: "HEIC to JPG", url: "heic-to-jpg.html" },
    { name: "WebP to JPG", url: "webp-to-jpg.html" },
    { name: "Image Analyzer", url: "image-analyzer.html" },
    { name: "Image Collage", url: "image-collage.html" },
    { name: "Image Optimizer", url: "image-optimizer.html" },
    { name: "Image Object Remover", url: "image-object-remover.html" },
    { name: "Image Smart", url: "image-smart.html" },
    { name: "Image Social", url: "image-social.html" },
    { name: "Social Video Maker", url: "social-video-maker.html" }
  ];

  function initMenu() {
    let nav = document.querySelector(
      'nav[aria-label="Menu strumenti"]'
    );

    if (!nav) {
      nav = document.querySelector("header nav");
    }

    if (!nav) {
      const header = document.querySelector("header");

      if (header) {
        nav = document.createElement("nav");
        nav.setAttribute("aria-label", "Menu strumenti");
        header.appendChild(nav);
      }
    }

    if (!nav || nav.querySelector(".rp-menu")) {
      return;
    }

    const style = document.createElement("style");
    style.textContent = `
      .rp-menu {
        position: relative;
        display: inline-block;
        font-family: inherit;
        z-index: 9999;
      }

      .rp-menu-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px 14px;
        border: 1px solid #dbe2ea;
        border-radius: 10px;
        background: #ffffff;
        color: #263445;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
      }

      .rp-menu-button:hover {
        background: #f3f6fa;
      }

      .rp-menu-panel {
        display: none;
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        width: 250px;
        max-width: calc(100vw - 32px);
        max-height: 70vh;
        overflow-y: auto;
        background: #ffffff;
        border: 1px solid #e0e6ee;
        border-radius: 12px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14);
        padding: 6px;
      }

      .rp-menu-panel.rp-open {
        display: block;
      }

      .rp-menu-panel a {
        display: block;
        padding: 10px 12px;
        border-radius: 8px;
        color: #263445;
        text-decoration: none;
        font-size: 14px;
        line-height: 1.4;
      }

      .rp-menu-panel a:hover,
      .rp-menu-panel a:focus {
        background: #eef4ff;
        color: #175cd3;
        outline: none;
      }

      @media (max-width: 600px) {
        .rp-menu-button {
          padding: 9px 11px;
          font-size: 14px;
        }

        .rp-menu-panel {
          width: 230px;
        }
      }
    `;

    document.head.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.className = "rp-menu";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "rp-menu-button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-haspopup", "true");
    button.innerHTML = '☰ Strumenti <span aria-hidden="true">▾</span>';

    const panel = document.createElement("div");
    panel.className = "rp-menu-panel";

    tools.forEach(function (tool) {
      const link = document.createElement("a");
      link.href = tool.url;
      link.textContent = tool.name;
      panel.appendChild(link);
    });

    button.addEventListener("click", function (event) {
      event.stopPropagation();

      const isOpen = panel.classList.toggle("rp-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (event) {
      if (!wrapper.contains(event.target)) {
        panel.classList.remove("rp-open");
        button.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        panel.classList.remove("rp-open");
        button.setAttribute("aria-expanded", "false");
      }
    });

    wrapper.appendChild(button);
    wrapper.appendChild(panel);
    nav.appendChild(wrapper);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenu);
  } else {
    initMenu();
  }
})();

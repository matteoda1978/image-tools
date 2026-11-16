/* RitoccaPix - Responsive Navigation & Global Account Bar */
(function () {
  const SUPABASE_URL = "https://eckppexmaihbzbtunhnp.supabase.co";
  const SUPABASE_KEY = "sb_publishable_h4NECcXTuSS7R-BDSAwIVQ_WKKolNKW";

  const tools = [
    { name: "My Account & Credits", url: "account.html" },
    { name: "Image Resizer", url: "image-resizer.html" },
    { name: "Image Compressor", url: "image-compressor.html" },
    { name: "Compress Image to 100KB", url: "compress-image-to-100kb.html" },
    { name: "Image Converter", url: "image-converter.html" },
    { name: "HEIC to JPG", url: "heic-to-jpg.html" },
    { name: "WebP to JPG", url: "webp-to-jpg.html" },
    { name: "WebP to PNG", url: "webp-to-png.html" },
    { name: "Image Analyzer", url: "image-analyzer.html" },
    { name: "Image Collage", url: "image-collage.html" },
    { name: "Image Optimizer", url: "image-optimizer.html" },
    { name: "Image Object Remover", url: "image-object-remover.html" },
    { name: "Image Smart", url: "image-smart.html" },
    { name: "Image Social", url: "image-social.html" },
    { name: "Pixel Avatar Maker", url: "pixel-avatar-maker.html" },
    { name: "Photo to Coloring Page", url: "photo-to-coloring-page.html" },
    { name: "Social Video Maker", url: "social-video-maker.html" },
    { name: "AI Study Assistant", url: "ai-study-assistant.html" }
  ];

  const header = document.querySelector("header");
  if (!header) return;
  const nav = header.querySelector("nav");
  if (!nav) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const style = document.createElement("style");
  style.textContent = `
    header nav.tools-dropdown {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }
    .tools-dropdown .logo {
      display: inline-flex;
      align-items: center;
      margin-right: auto;
      color: #ffffff;
      font-size: 22px;
      font-weight: 850;
      letter-spacing: -0.04em;
      text-decoration: none;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .tools-dropdown .logo span { color: #91aaff; }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tools-dropdown .account-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      border: 1px solid #45618a;
      border-radius: 10px;
      background: #1d3558;
      color: #ffffff;
      font: inherit;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }
    .tools-dropdown .account-btn:hover { background: #284775; }
    .tools-dropdown .account-btn.logged-in {
      background: #142b24;
      border-color: #347a5e;
      color: #a7f3d0;
    }
    .tools-dropdown .tools-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 14px;
      border: 1px solid #334155;
      border-radius: 10px;
      background: #17243b;
      color: #ffffff;
      font: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      flex-shrink: 0;
    }
    .tools-dropdown .tools-toggle:hover { background: #243550; }
    .tools-dropdown .tools-arrow { transition: transform 0.2s ease; }
    .tools-dropdown .tools-toggle[aria-expanded="true"] .tools-arrow { transform: rotate(180deg); }
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
    .tools-menu.open { display: block; }
    .tools-menu a {
      display: block;
      width: 100%;
      padding: 12px;
      border-radius: 7px;
      color: #e2e8f0;
      text-decoration: none;
      font-size: 15px;
      line-height: 1.4;
      box-sizing: border-box;
    }
    .tools-menu a:hover { background: #243550; color: #ffffff; }
    .tools-menu a[aria-current="page"] { background: #1e3a5f; color: #93c5fd; font-weight: 700; }
    .tools-menu a.account-link {
      color: #a9c2ff;
      font-weight: 700;
      border-bottom: 1px solid #334155;
      border-radius: 7px 7px 0 0;
      margin-bottom: 6px;
    }
    @media (max-width: 480px) {
      .tools-dropdown .logo { font-size: 19px; }
      .tools-dropdown .account-btn, .tools-dropdown .tools-toggle { padding: 8px 10px; font-size: 13px; }
    }
  `;
  document.head.appendChild(style);
  nav.classList.add("tools-dropdown");

  const brandCandidates = header.querySelectorAll(".logo, .brand");
  let brand = brandCandidates.length ? brandCandidates[0] : null;
  brandCandidates.forEach(c => { if (c !== brand) c.remove(); });
  if (!brand) {
    brand = document.createElement("a");
    brand.innerHTML = 'Ritocca<span>Pix</span>';
    brand.href = currentPage === "index.html" ? "./" : "index.html";
  }
  brand.classList.add("logo");
  nav.replaceChildren(brand);

  const actionsWrap = document.createElement("div");
  actionsWrap.className = "nav-actions";

  const accountBtn = document.createElement("button");
  accountBtn.type = "button";
  accountBtn.id = "ritoccapixAccountButton";
  accountBtn.className = "account-btn";
  accountBtn.textContent = "Sign in";

  accountBtn.addEventListener("click", () => {
    if (document.getElementById("accountDialog")) {
      document.dispatchEvent(new CustomEvent("ritoccapix:open-account"));
    } else {
      window.location.href = "account.html?redirect=" + encodeURIComponent(window.location.pathname);
    }
  });

  const button = document.createElement("button");
  button.type = "button";
  button.className = "tools-toggle";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-haspopup", "true");
  button.innerHTML = 'Tools <span class="tools-arrow" aria-hidden="true">▾</span>';

  actionsWrap.appendChild(accountBtn);
  actionsWrap.appendChild(button);
  nav.appendChild(actionsWrap);

  document.dispatchEvent(new CustomEvent("ritoccapix:account-button-ready"));

  async function syncGlobalAccountBadge() {
    try {
      if (!window.supabase || !window.supabase.createClient) return;
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      const { data } = await client.auth.getSession();
      const session = data?.session;
      if (session && session.user) {
        accountBtn.classList.add("logged-in");
        const { data: balData } = await client
          .from("credit_balances")
          .select("balance")
          .eq("user_id", session.user.id)
          .maybeSingle();
        const credits = Number(balData?.balance ?? 0);
        accountBtn.textContent = "🪙 " + credits + " cr";
      } else {
        accountBtn.classList.remove("logged-in");
        accountBtn.textContent = "Sign in";
      }
    } catch (e) {}
  }
  syncGlobalAccountBadge();

  const menu = document.createElement("div");
  menu.className = "tools-menu";
  tools.forEach((tool, index) => {
    const link = document.createElement("a");
    link.href = tool.url;
    link.textContent = tool.name;
    if (index === 0) link.classList.add("account-link");
    if (currentPage === tool.url) link.setAttribute("aria-current", "page");
    menu.appendChild(link);
  });

  function positionMenu() {
    if (!menu.classList.contains("open")) return;
    const buttonRect = button.getBoundingClientRect();
    const margin = 8;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    menu.style.maxHeight = Math.max(120, viewportHeight - 16) + "px";
    const menuWidth = menu.getBoundingClientRect().width || 280;
    const left = Math.max(margin, Math.min(buttonRect.right - menuWidth, viewportWidth - menuWidth - margin));
    const menuHeight = menu.getBoundingClientRect().height;
    let top = buttonRect.bottom + margin;
    if (top + menuHeight > viewportHeight - margin) top = buttonRect.top - menuHeight - margin;
    menu.style.left = left + "px";
    menu.style.top = Math.max(margin, top) + "px";
  }

  function closeMenu() {
    menu.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    if (menu.classList.contains("open")) closeMenu();
    else { menu.classList.add("open"); button.setAttribute("aria-expanded", "true"); positionMenu(); }
  });

  menu.addEventListener("click", (e) => { e.stopPropagation(); if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeMenu(); button.focus(); } });
  window.addEventListener("resize", positionMenu);
  document.body.appendChild(menu);
})();

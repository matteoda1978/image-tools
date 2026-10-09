/* Shared navigation for Image Tools */

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

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const nav = document.querySelector("header nav");

if (!nav) return;

nav.replaceChildren();

tools.forEach(function (tool) {
const link = document.createElement("a");
link.href = tool.url;
link.textContent = tool.name;

if (currentPage === tool.url) {
  link.setAttribute("aria-current", "page");
  link.style.color = "#60a5fa";
  link.style.fontWeight = "700";
}

nav.appendChild(link);

});
})();

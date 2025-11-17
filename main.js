// Load Navbar
const navbarLoaded = fetch("navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;
  });

// Load Mobile Menu
const menuLoaded = fetch("mobileMenu.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("mobileMenuContainer").innerHTML = html;
  });

// mobile responsive navbar logic
Promise.all([navbarLoaded, menuLoaded]).then(() => {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !closeBtn || !mobileMenu) {
    console.error("❌ Elements missing! Check IDs.");
    return;
  }

  // Open menu
  menuBtn.addEventListener("click", () => {
    mobileMenu.style.right = "0";
  });

  // Close menu
  closeBtn.addEventListener("click", () => {
    mobileMenu.style.right = "-260px";
  });
});

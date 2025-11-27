// load navbar
const loadHTML = (selector, file) =>
  fetch(file)
    .then(res => res.text())
    .then(html => (document.querySelector(selector).innerHTML = html));

Promise.all([
  loadHTML("#navbar", "navbar.html"),
  loadHTML("#mobileMenuContainer", "mobileMenu.html")
]).then(() => {
  const menuBtn = document.querySelector("#menuBtn");
  const closeBtn = document.querySelector("#closeBtn");
  const mobileMenu = document.querySelector("#mobileMenu");

  const toggleMenu = (open) => {
    mobileMenu.style.right = open ? "0" : "-260px";
  };

  // Open mobile menu
  menuBtn.addEventListener("click", () => toggleMenu(true));

  // Close mobile menu
  closeBtn.addEventListener("click", () => toggleMenu(false));

  mobileMenu.addEventListener("click", (e) => {
    if (e.target.closest("a")) toggleMenu(false);
  });
});

//ask a question modaal section
function openQuestionModal() {
    document.getElementById("modalBackdrop").classList.remove("hidden");
  }
  function closeQuestionModal() {
    document.getElementById("modalBackdrop").classList.add("hidden");
  }

//ask a question section
  document.getElementById("questionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    document.getElementById("successPopup").classList.remove("hidden");
    form.reset();
    fetch(
      "https://fsw-anu.app.n8n.cloud/webhook-test/0147c1e4-467c-4e0a-80a4-907a24f0d725",
      {
        method: "POST",
        body: formData,
      }
    ).catch((err) => console.log("Webhook error:", err));
    closeQuestionModal();
});


//appointment section
    document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();  

    const form = e.target;
    const formData = new FormData(form);

    fetch(
      "https://fsw-anu.app.n8n.cloud/webhook-test/01caaa65-2cca-4a97-b430-5e94ddc7068e",
      {
        method: "POST",
        body: formData,
      }
    ).catch(err => console.error("Webhook Error:", err));

    document.getElementById("successPopup").classList.remove("hidden");
    form.reset();
    });

    function closePopup() {
      document.getElementById("successPopup").classList.add("hidden");
    }
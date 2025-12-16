
// --------------------load navbar---------------------------//
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

//----------------------ask a question modaal section--------------------------//
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
    "https://n8n.techdemo.in/webhook-test/ask-a-question",
    {
      method: "POST",
      body: formData,
    }
  ).catch((err) => console.log("Webhook error:", err));
  closeQuestionModal();
});

//file upload validation

// function validateFile(input) {
//     const files = input.files;
//     const allowedTypes = ["image/png", "application/pdf"];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const minSize = 5 * 1024;   
//       const maxSize = 10 * 1024;
//       //file size
//       if (file.size < minSize || file.size > maxSize) {
//         alert(`"${file.name}" must be between 5 KB and 10 KB.`);
//         input.value = ""; 
//         return;
//       }
//       //file format
//       if (!allowedTypes.includes(file.type)) {
//         alert(`"${file.name}" is not allowed. Only PNG and PDF files are accepted.`);
//         input.value = ""; 
//         return;
//       }
//     }
//   }

//----------------appointment section---------------------//
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch(
    "https://n8n.techdemo.in/webhook/book-appointment",
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



//----------------scrollbar---------------------------//

const section = document.querySelector("#serviceSection");
const scrollBox = document.querySelector("#scrollBox");

const nextSection = document.querySelector("#nextSection");
const prevSection = document.querySelector("#prevSection");

section.addEventListener("wheel", function (e) {

  const atBottom =
    scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 1;
  //down scroll
  if (e.deltaY > 0) {
    e.preventDefault(); // block page scroll only on down

    if (!atBottom) {
      scrollBox.scrollTop += e.deltaY; // scroll inside right column
      return;
    }

    // reached bottom → go to next section
    nextSection?.scrollIntoView({ behavior: "smooth" });

    // reset scroll box
    scrollBox.scrollTop = 0;
  }

  //up scroll 
  if (e.deltaY < 0) {
    return;
  }
}, { passive: false });


//--------------FAQ section arrow --------------------//
function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const arrow = button.querySelector("img");

  // Toggle answer visibility
  answer.classList.toggle("hidden");

  // Rotate arrow
  arrow.classList.toggle("rotate-180");
}



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



//----------------slider ---------------------------//

const track = document.getElementById("carouselTrack");
const slides = track.children;
let index = 0;

function moveSlide() {
  index++;

  track.style.transition = "transform 0.7s ease-in-out";
  track.style.transform = `translateX(-${index * slides[0].offsetWidth}px)`;

  // When last slide is reached
  if (index === slides.length) {
    setTimeout(() => {
      track.style.transition = "none"; // remove animation
      track.style.transform = "translateX(0px)";
      index = 0;
    }, 700); // same as transition duration
  }
}

setInterval(moveSlide, 3500);


//--------------FAQ section arrow --------------------//

function toggleFaq(button) {
    const faqItem = button.closest(".faq-item");
    const answer = faqItem.querySelector(".faq-answer");
    const arrow = button.querySelector(".faq-arrow");

    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

    if (isOpen) {
      answer.style.maxHeight = "0px";
      arrow.classList.remove("rotate-180");
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      arrow.classList.add("rotate-180");
    }
  }
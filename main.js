
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
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

// ---------- HELPERS ----------
function setPosition() {
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function slideToIndex() {
  const slideWidth = slides[0].offsetWidth;
  currentTranslate = -index * slideWidth;
  prevTranslate = currentTranslate;
  track.style.transition = "transform 0.35s ease";
  setPosition();
}

function clampIndex() {
  index = Math.max(0, Math.min(index, slides.length - 1));
}

// ---------- POINTER DRAG (mouse press + drag) ----------
function pointerDown(e) {
  isDragging = true;
  startX = e.clientX;
  track.style.transition = "none";
  track.setPointerCapture(e.pointerId);
}

function pointerMove(e) {
  if (!isDragging) return;
  const deltaX = e.clientX - startX;
  currentTranslate = prevTranslate + deltaX;
  setPosition();
}

function pointerUp(e) {
  if (!isDragging) return;
  isDragging = false;

  const slideWidth = slides[0].offsetWidth;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -slideWidth / 4) index++;
  if (movedBy > slideWidth / 4) index--;

  clampIndex();
  slideToIndex();
  track.releasePointerCapture(e.pointerId);
}

// ---------- TRACKPAD SWIPE (NO CLICK) ----------
function wheelSwipe(e) {
  if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

  e.preventDefault();

  if (e.deltaX > 30) index++;
  if (e.deltaX < -30) index--;

  clampIndex();
  slideToIndex();
}

// ---------- EVENTS ----------
track.addEventListener("pointerdown", pointerDown);
track.addEventListener("pointermove", pointerMove);
track.addEventListener("pointerup", pointerUp);
track.addEventListener("pointercancel", pointerUp);
track.addEventListener("pointerleave", pointerUp);

// Trackpad support
track.addEventListener("wheel", wheelSwipe, { passive: false });


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


//slider
new Swiper(".swiper", {
  slidesPerView: 1,
  loop: true,

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },



  pauseOnMouseEnter: true,
  grabCursor: true,
  speed: 800,
});
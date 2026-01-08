

//----load navbar + footer -----//
const loadHTML = (selector, file) =>
  fetch(file)
    .then(res => res.text())
    .then(html => {
      const el = document.querySelector(selector);
      if (el) el.innerHTML = html;
    });

Promise.all([
  loadHTML("#navbar", "navbar.html"),
  loadHTML("#mobileMenuContainer", "mobileMenu.html")
]).then(() => {
  const menuBtn = document.querySelector("#menuBtn");
  const closeBtn = document.querySelector("#closeBtn");
  const mobileMenu = document.querySelector("#mobileMenu");

  if (!menuBtn || !closeBtn || !mobileMenu) return;

  const toggleMenu = (open) => {
    mobileMenu.style.right = open ? "0" : "-260px";
  };

  menuBtn.addEventListener("click", () => toggleMenu(true));
  closeBtn.addEventListener("click", () => toggleMenu(false));

  mobileMenu.addEventListener("click", (e) => {
    if (e.target.closest("a")) toggleMenu(false);
  });
});

// footer


fetch("footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;

    // 🔥 IMPORTANT
    initQuestionForm();
  });

// // ---- Scope of services carousel ---- //


// document.addEventListener("DOMContentLoaded", () => {
//   const track = document.getElementById("carouselTrack");
//   if (!track) return;

//   const slides = [...track.children];
//   const prevBtn = document.getElementById("prevSlide");
//   const nextBtn = document.getElementById("nextSlide");
//   const dotsContainer = document.getElementById("carouselDots"); // ✅ FIX

//   let index = 0;

//   // ---------------- Helpers ----------------
//   const slideWidth = () => slides[0].offsetWidth;

//   const goToSlide = (i) => {
//     index = Math.max(0, Math.min(i, slides.length - 1));
//     track.style.transition = "transform 0.3s ease-out";
//     track.style.transform = `translateX(${-index * slideWidth()}px)`;
//     updateDots(); // ✅ FIX
//   };

//   // ---------------- Arrow Buttons ----------------
//   prevBtn?.addEventListener("click", () => goToSlide(index - 1));
//   nextBtn?.addEventListener("click", () => goToSlide(index + 1));

//   // ---------- Pointer (Mouse + Touch) ----------
//   let startX = 0;
//   let startY = 0;
//   let currentX = 0;
//   let isDragging = false;
//   let isHorizontalSwipe = null;

//   track.addEventListener("pointerdown", (e) => {
//     startX = e.clientX;
//     startY = e.clientY;
//     currentX = startX;

//     isDragging = true;
//     isHorizontalSwipe = null;

//     track.style.transition = "none";
//     track.setPointerCapture(e.pointerId);
//   });

//   track.addEventListener("pointermove", (e) => {
//     if (!isDragging) return;

//     const dx = e.clientX - startX;
//     const dy = e.clientY - startY;

//     if (isHorizontalSwipe === null) {
//       isHorizontalSwipe = Math.abs(dx) > Math.abs(dy);
//     }

//     if (!isHorizontalSwipe) return;

//     e.preventDefault();
//     currentX = e.clientX;

//     track.style.transform = `translateX(${dx - index * slideWidth()}px)`;
//   });

//   track.addEventListener("pointerup", endSwipe);
//   track.addEventListener("pointercancel", endSwipe);

//   function endSwipe() {
//     if (!isDragging) return;
//     isDragging = false;

//     const diff = currentX - startX;
//     const threshold = slideWidth() / 4;

//     if (diff > threshold) {
//       goToSlide(index - 1);
//     } else if (diff < -threshold) {
//       goToSlide(index + 1);
//     } else {
//       goToSlide(index);
//     }
//   }

//   // ---------- TRACKPAD (Desktop Two-Finger Swipe) ----------
//   let wheelTimeout = null;

//   track.addEventListener(
//     "wheel",
//     (e) => {
//       if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;

//       e.preventDefault();

//       clearTimeout(wheelTimeout);
//       wheelTimeout = setTimeout(() => {
//         if (e.deltaX > 30) goToSlide(index + 1);
//         else if (e.deltaX < -30) goToSlide(index - 1);
//       }, 40);
//     },
//     { passive: false }
//   );

//   // ---------- Dots ----------
//   const createDots = () => {
//     if (!dotsContainer) return;
//     dotsContainer.innerHTML = "";

//     slides.forEach((_, i) => {
//       const dot = document.createElement("button");
//       dot.className =
//         "w-2.5 h-2.5 rounded-full bg-[#79A3C5] data-[active=true]:bg-[#FC8F3A]";
//       dot.dataset.active = i === index;
//       dot.addEventListener("click", () => goToSlide(i));
//       dotsContainer.appendChild(dot);
//     });
//   };

//   const updateDots = () => {
//     if (!dotsContainer) return;
//     [...dotsContainer.children].forEach((dot, i) => {
//       dot.dataset.active = i === index;
//     });
//   };

//   // ---------------- Init ----------------
//   window.addEventListener("resize", () => goToSlide(index));
//   createDots();   // ✅ FIX
//   goToSlide(0);
// });


document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  const slides = [...track.children];
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dotsContainer = document.getElementById("carouselDots");

  let index = 0;

  const slideWidth = () => slides[0].offsetWidth;

  const goToSlide = (i) => {
    index = Math.max(0, Math.min(i, slides.length - 1));
    track.style.transition = "transform 0.25s ease-out"; // slightly faster
    track.style.transform = `translateX(${-index * slideWidth()}px)`;
    updateDots();
  };

  prevBtn?.addEventListener("click", () => goToSlide(index - 1));
  nextBtn?.addEventListener("click", () => goToSlide(index + 1));

  // ---------- Pointer Swipe ----------
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isDragging = false;
  let isHorizontalSwipe = null;
  let pointerId = null;

  track.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
    currentX = startX;

    isDragging = true;
    isHorizontalSwipe = null;
    pointerId = e.pointerId;

    track.style.transition = "none";
    track.setPointerCapture(pointerId);
  });

  track.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (isHorizontalSwipe === null) {
      isHorizontalSwipe = Math.abs(dx) > Math.abs(dy);
    }

    if (!isHorizontalSwipe) return;

    e.preventDefault(); // stop scroll only when horizontal
    currentX = e.clientX;

    track.style.transform = `translateX(${dx - index * slideWidth()}px)`;
  });

  track.addEventListener("pointerup", endSwipe);
  track.addEventListener("pointercancel", endSwipe);

  function endSwipe() {
    if (!isDragging) return;
    isDragging = false;

    track.releasePointerCapture(pointerId);

    const diff = currentX - startX;
    const threshold = slideWidth() / 6; // ⬅️ faster response

    if (diff > threshold) goToSlide(index - 1);
    else if (diff < -threshold) goToSlide(index + 1);
    else goToSlide(index);
  }

  // ---------- Trackpad ----------
  let wheelTimeout = null;

  track.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;

      e.preventDefault();
      clearTimeout(wheelTimeout);

      wheelTimeout = setTimeout(() => {
        if (e.deltaX > 20) goToSlide(index + 1);
        else if (e.deltaX < -20) goToSlide(index - 1);
      }, 30);
    },
    { passive: false }
  );

  // ---------- Dots ----------
  const createDots = () => {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className =
        "w-2.5 h-2.5 rounded-full bg-[#79A3C5] data-[active=true]:bg-[#FC8F3A]";
      dot.dataset.active = i === index;
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  };

  const updateDots = () => {
    if (!dotsContainer) return;
    [...dotsContainer.children].forEach((dot, i) => {
      dot.dataset.active = i === index;
    });
  };

  window.addEventListener("resize", () => goToSlide(index));
  createDots();
  goToSlide(0);
});

//-------- testimonial swiper------//
if (document.querySelector(".swiper")) {
  new Swiper(".swiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 4000 },
    pagination: { el: ".swiper-pagination", clickable: true },
    speed: 800,
  });
}
//-----faq toggle -----//
function toggleFaq(button) {
  const faqItem = button.closest(".faq-item");
  const answer = faqItem.querySelector(".faq-answer");
  const arrow = faqItem.querySelector(".faq-arrow");

  const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

  // CLOSE all other FAQs (optional but recommended UX)
  document.querySelectorAll(".faq-answer").forEach((el) => {
    if (el !== answer) {
      el.style.maxHeight = "0px";
    }
  });

  document.querySelectorAll(".faq-arrow").forEach((el) => {
    if (el !== arrow) {
      el.classList.remove("rotate-180");
    }
  });

  // TOGGLE current FAQ
  if (isOpen) {
    answer.style.maxHeight = "0px";
    arrow.classList.remove("rotate-180");
  } else {
    answer.style.maxHeight = answer.scrollHeight + "px";
    arrow.classList.add("rotate-180");
  }
}



//-----services dropdown ------//
const serviceSelect = document.getElementById("serviceSelect");
const serviceArrow = document.getElementById("serviceArrow");

if (serviceSelect && serviceArrow) {
  let isOpen = false;

  serviceSelect.addEventListener("mousedown", () => {
    isOpen = !isOpen;
    serviceArrow.classList.toggle("rotate-180", isOpen);
  });

  serviceSelect.addEventListener("blur", () => {
    isOpen = false;
    serviceArrow.classList.remove("rotate-180");
  });

  serviceSelect.addEventListener("change", () => {
    isOpen = false;
    serviceArrow.classList.remove("rotate-180");
  });
}

// -------- ask a question form --------
function initQuestionForm() {
  const questionForm = document.getElementById("questionForm");
  const successPopup = document.getElementById("questionsuccessPopup");

  if (!questionForm || !successPopup) {
    console.warn("Question form or success popup not found");
    return;
  }

  questionForm.addEventListener("submit", (e) => {
    e.preventDefault(); // 🚫 stop redirect

    const formData = new FormData(questionForm);

    // fire-and-forget webhook
    fetch("https://n8n.techdemo.in/webhook/ask-a-question", {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    // close modal FIRST
    closeQuestionModal();

    // show success popup
    successPopup.classList.remove("hidden");

    questionForm.reset();
  });
}


// modal helpers
function openQuestionModal() {
  document.getElementById("modalBackdrop")?.classList.remove("hidden");
}

function closeQuestionModal() {
  document.getElementById("modalBackdrop")?.classList.add("hidden");
}

function closeQuestionSuccessPopup() {
  document
    .getElementById("questionsuccessPopup")
    ?.classList.add("hidden");
}



// //-------------book appointment------------------//

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("booksuccessPopup");

  if (!form || !popup) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // 🔥 fire-and-forget (no CORS crash)
    fetch("https://n8n.techdemo.in/webhook/book-appointment", {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    // ✅ UI actions MUST be outside fetch await
    popup.classList.remove("hidden");
    form.reset();
  });
});

// Close popup
function closePopup() {
  document.getElementById("booksuccessPopup")?.classList.add("hidden");
}



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


//----scope of services carousel ------//
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
    track.style.transform = `translateX(${-index * slideWidth()}px)`;
    updateDots();
  };

  prevBtn?.addEventListener("click", () => goToSlide(index - 1));
  nextBtn?.addEventListener("click", () => goToSlide(index + 1));

  const createDots = () => {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "w-2.5 h-2.5 rounded-full bg-[#79A3C5]";
      dot.onclick = () => goToSlide(i);
      dotsContainer.appendChild(dot);
    });
  };

  const updateDots = () => {
    if (!dotsContainer) return;
    [...dotsContainer.children].forEach((dot, i) => {
      dot.classList.toggle("bg-[#FC8F3A]", i === index);
    });
  };

  window.addEventListener("load", () => {
    createDots();
    goToSlide(0);
  });
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

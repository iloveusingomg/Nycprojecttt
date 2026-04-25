const overlay = document.getElementById("transition-overlay");
const discTransition = document.getElementById("disc-transition");
const openEnvelope1 = document.getElementById("open-envelope-1");
const openDisc = document.getElementById("open-disc");
const nextButtons = [...document.querySelectorAll(".next-btn[data-next]")];
const restartButton = document.querySelector(".restart-btn");
const pages = [...document.querySelectorAll(".page")];
const slides = [...document.querySelectorAll(".story-scroll .slide")];
const storyPage = document.getElementById("slide-2");
const storyScroll = document.querySelector(".story-scroll");
let isTransitioning = false;

function setActivePage(pageNumber) {
  pages.forEach((page) => {
    const isMatch = Number(page.dataset.page) === pageNumber;
    page.classList.toggle("active", isMatch);
  });

  if (pageNumber === 2) {
    storyScroll?.scrollTo({ top: 0, behavior: "smooth" });
    slides.forEach((slide) => slide.classList.remove("in-view"));
  }
}

function envelopeTransitionToSlide2() {
  if (isTransitioning) return;
  isTransitioning = true;
  overlay.classList.add("playing");
  setTimeout(() => setActivePage(2), 500);
  setTimeout(() => {
    overlay.classList.remove("playing");
    isTransitioning = false;
  }, 1180);
}

function discTransitionToSlide7() {
  if (isTransitioning) return;
  isTransitioning = true;
  discTransition.classList.add("playing");
  setTimeout(() => setActivePage(7), 900);
  setTimeout(() => {
    discTransition.classList.remove("playing");
    isTransitioning = false;
  }, 1500);
}

openEnvelope1?.addEventListener("click", envelopeTransitionToSlide2);
openDisc?.addEventListener("click", discTransitionToSlide7);

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const next = Number(button.dataset.next);
    if (!next) return;
    setActivePage(next);
  });
});

restartButton?.addEventListener("click", () => setActivePage(1));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { root: storyScroll, threshold: 0.35 }
);

slides.forEach((slide) => revealObserver.observe(slide));
setActivePage(1);
storyPage?.classList.remove("in-view");

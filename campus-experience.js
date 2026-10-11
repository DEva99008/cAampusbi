'use strict';

const backdrop = document.createElement('div');
backdrop.className = 'campus-backdrop';
backdrop.setAttribute('aria-hidden', 'true');
document.body.classList.add('has-campus-backdrop');
document.body.prepend(backdrop);

const SCENE_COUNT = 4;
let currentScene = 0;
let touchStart;

function showScene(scene) {
  currentScene = (scene + SCENE_COUNT) % SCENE_COUNT;
  backdrop.dataset.scene = String(currentScene);
}

document.addEventListener('keydown', event => {
  if (event.target instanceof HTMLElement && event.target.matches('input, textarea, select, button, a')) return;
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    showScene(currentScene + 1);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    showScene(currentScene - 1);
  }
});

document.addEventListener('touchstart', event => {
  const touch = event.changedTouches[0];
  touchStart = {
    x: touch.clientX,
    y: touch.clientY,
    carousel: Boolean(event.target.closest('.hero-food-carousel'))
  };
}, { passive: true });

document.addEventListener('touchend', event => {
  if (!touchStart) return;
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStart.x;
  const deltaY = touch.clientY - touchStart.y;
  if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY)) {
    if (touchStart.carousel) {
      showFoodSlide(activeFoodSlide + (deltaX < 0 ? 1 : -1));
    } else {
      showScene(currentScene + (deltaX < 0 ? 1 : -1));
    }
  }
  touchStart = undefined;
}, { passive: true });

showScene(0);

const foodSlides = [...document.querySelectorAll('[data-hero-slide]')];
const foodCaptions = [
  'Masala dosa · Fresh from campus',
  'Paneer wrap · Made for your break',
  'Fried rice · Hot and satisfying'
];
let activeFoodSlide = 0;

function showFoodSlide(index) {
  if (!foodSlides.length) return;
  activeFoodSlide = (index + foodSlides.length) % foodSlides.length;
  foodSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === activeFoodSlide);
    slide.setAttribute('aria-hidden', String(slideIndex !== activeFoodSlide));
  });
  const caption = document.getElementById('heroFoodCaption');
  if (caption) caption.textContent = foodCaptions[activeFoodSlide];
}

document.addEventListener('click', event => {
  const control = event.target.closest('[data-hero-step]');
  if (control) showFoodSlide(activeFoodSlide + Number(control.dataset.heroStep));
});

if (foodSlides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => {
    if (!document.hidden) showFoodSlide(activeFoodSlide + 1);
  }, 5500);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => {
    if (!document.hidden) showScene(currentScene + 1);
  }, 7000);
}

const startSearchForm = document.getElementById('startSearchForm');
if (startSearchForm) {
  startSearchForm.addEventListener('submit', event => {
    event.preventDefault();
    const query = new FormData(startSearchForm).get('search')?.toString().trim() || '';
    window.location.href = `shop.html?search=${encodeURIComponent(query)}#menu`;
  });
}

if (document.body.classList.contains('start-page')) {
  const intro = document.createElement('div');
  intro.className = 'campus-intro';
  intro.setAttribute('role', 'status');
  intro.setAttribute('aria-label', 'CampusBite is loading');
  intro.innerHTML = '<video class="campus-intro-video" src="campusbite-intro.mp4" muted playsinline autoplay preload="auto" aria-hidden="true"></video><div class="campus-intro-content"><img src="campusbite-logo.png" alt=""><strong>CampusBite</strong><span>KPRCAS · GOOD FOOD, RIGHT ON CAMPUS</span><button class="campus-intro-skip" type="button">Skip intro</button></div>';
  document.body.append(intro);

  const introVideo = intro.querySelector('video');
  let introDismissed = false;
  let fallbackTimeout;
  function dismissIntro() {
    if (introDismissed) return;
    introDismissed = true;
    window.clearTimeout(fallbackTimeout);
    window.setTimeout(() => {
      intro.classList.add('is-leaving');
      intro.addEventListener('transitionend', () => intro.remove(), { once: true });
      window.setTimeout(() => intro.remove(), 650);
    }, 1100);
  }

  intro.querySelector('.campus-intro-skip').addEventListener('click', dismissIntro);
  introVideo.addEventListener('ended', dismissIntro, { once: true });
  introVideo.addEventListener('error', () => {
    console.warn('The CampusBite intro video could not be loaded; continuing with the logo intro.');
    fallbackTimeout = window.setTimeout(dismissIntro, 3200);
  }, { once: true });
  introVideo.play().catch(error => {
    if (!introVideo.error) {
      console.warn('The CampusBite intro video could not autoplay; continuing with the logo intro.', error);
      fallbackTimeout = window.setTimeout(dismissIntro, 3200);
    }
  });
}

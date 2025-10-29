const swiper = new Swiper(".how-work-swiper", {
  spaceBetween: 20,
  slidesPerView:3,
  pagination: {
    el: ".work-swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    320: { slidesPerView: 1 },
    490: { slidesPerView: 1.2 },
    620: { slidesPerView: 1.5 , },
    810: { slidesPerView: 2 },
    992: { slidesPerView: 2.5 },
    1263: { slidesPerView: 2.6 },
    1300: { slidesPerView: 3 },
  },
});

const possibilitiesSwiper = new Swiper(".possibilities-swiper", {
  slidesPerView:1, 
  spaceBetween: 14,
  loop: true,

    pagination: {
    el: ".possibilities-pagination",
    clickable: true,
  },
});

const heroSwiper = new Swiper(".hero-swiper", {
  slidesPerView:1, 
  spaceBetween: 14,
  loop: true,

    pagination: {
    el: ".hero-pagination",
    clickable: true,
  },
});


const reviewsSwiper1 = new Swiper(".reviews-swiper-first", {
  slidesPerView: 2.9, 
  spaceBetween: 20,
  loop: true,
  freeMode: true,
  allowTouchMove: false,
  speed: 8000, 
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

    breakpoints: {
    320: { slidesPerView: 1 ,  spaceBetween: 10},
    490: { slidesPerView: 1.2 ,  spaceBetween: 10},
    620: { slidesPerView: 1.5 ,  spaceBetween: 10,},
    810: { slidesPerView: 2 },
    992: { slidesPerView: 2.5 },
    1263: { slidesPerView: 2.6 },
    1300: { slidesPerView: 2.9 },
  },
});



const reviewsSwiper2 = new Swiper(".reviews-swiper-second", {
  slidesPerView: 2.9, 
  spaceBetween: 20,
  loop: true,
  freeMode: true,
  allowTouchMove: false,
  speed: 8000, 
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

   breakpoints: {
    320: { slidesPerView: 1,  spaceBetween: 10 },
    490: { slidesPerView: 1.2 ,  spaceBetween: 10},
    620: { slidesPerView: 1.5,  spaceBetween: 10 },
    810: { slidesPerView: 2 },
    992: { slidesPerView: 2.5 },
    1263: { slidesPerView: 2.6 },
    1300: { slidesPerView: 2.9 },
  },
});



function setupMarquee(selector, pxPerSec = 40, reverse = false) {
  const container = document.querySelector(selector);
  if (!container) return;

  container.classList.add('marquee');

  const wrapper = container.querySelector('.swiper-wrapper');
  if (!wrapper) return;

  wrapper.style.animationTimingFunction = 'linear';
  wrapper.style.animationIterationCount = 'infinite';
  wrapper.style.willChange = 'transform';

  const baseSlides = Array.from(wrapper.children);
  if (baseSlides.length === 0) return;

  const ensureFilled = () => {
    const needWidth = container.clientWidth * 2; 
    let guard = 0;
    while (wrapper.scrollWidth < needWidth && guard < 50) {
      baseSlides.forEach(slide => {
        wrapper.appendChild(slide.cloneNode(true));
      });
      guard++;
    }
  };

  const applyAnimation = () => {
    const shift = Math.max(wrapper.scrollWidth / 2, container.clientWidth);
    const duration = shift / pxPerSec;

    wrapper.style.setProperty('--shift', `${Math.ceil(shift)}px`);
    wrapper.style.animationDuration = `${duration.toFixed(3)}s`;
    wrapper.style.animationDirection = reverse ? 'reverse' : 'normal';
  };

  const relayout = () => {
    wrapper.style.animationName = 'none';
    wrapper.offsetHeight;

    ensureFilled();
    applyAnimation();
    wrapper.style.animationName = 'marquee-scroll';
  };

  relayout();

  let resizeTO;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(relayout, 100);
  }, { passive: true });

  wrapper.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', relayout, { once: true });
      img.addEventListener('error', relayout, { once: true });
    }
  });

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => relayout());
    ro.observe(wrapper);
  }
}

setupMarquee('.reviews-swiper-first', 30, false);
setupMarquee('.reviews-swiper-second', 30, true);
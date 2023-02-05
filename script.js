'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const links = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const section = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault;
  const section = section1.getBoundingClientRect();
  console.log(section.top + window.pageYOffset);
  //  window.scrollTo(section.left,section.top+window.pageYOffset)
  // window.scrollTo({
  //   left:section.left,
  //   top:section.top+window.pageYOffset,
  //   behavior:'smooth'
  // })
  section1.scrollIntoView({ behavior: 'smooth' });
});
links.addEventListener('click', function (e) {
  e.preventDefault();
  const element = e.target;

  if (element.classList.contains('nav__link')) {
    const id = element.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const element__tab = e.target.closest('.operations__tab');
  if (!element__tab) return;
  tabs.forEach(ele => ele.classList.remove('operations__tab--active'));
  tabsContent.forEach(ele =>
    ele.classList.remove('operations__content--active')
  );
  element__tab.classList.add('operations__tab--active');
  const content__tab = document.querySelector(
    `.operations__content--${element__tab.dataset.tab}`
  );
  content__tab.classList.add('operations__content--active');
});
function hover(e) {
  const element = e.target;
  if (element.classList.contains('nav__link')) {
    const link = document.querySelectorAll('.nav__link');
    const logo = element.closest('.nav').querySelector('img');
    link.forEach(ele => {
      if (ele !== element) {
        ele.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover', hover.bind(0.5));
nav.addEventListener('mouseout', hover.bind(1));
const navHeigth = nav.getBoundingClientRect().height;
function headerOb(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(headerOb, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeigth}px`,
});
headerObserver.observe(header);

function displaySection(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    entry.target.classList.add('section--hidden');
  } else {
    entry.target.classList.remove('section--hidden');
  }
}
const sectionObserver = new IntersectionObserver(displaySection, {
  root: null,
  threshold: 0.05,
});
section.forEach(ele => {
  sectionObserver.observe(ele);
  ele.classList.add('section--hidden');
});

function lazyImage(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}

const imgTarget = new IntersectionObserver(lazyImage, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});
function activeDot(cur) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(ele => ele.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${cur}"]`)
    .classList.add('dots__dot--active');
}
imgTargets.forEach(ele => imgTarget.observe(ele));
const maxSlide = slides.length;
let curSlide = 0;
function next(cur) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - cur)}%)`;
  });
}
next(0);

function dot() {
  slides.forEach((ele, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}
dot();
activeDot(0);
function nextSlide() {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  next(curSlide);
  activeDot(curSlide);
}
function prevSlide() {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  next(curSlide);
  activeDot(curSlide);
}
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', e => {
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});
dotContainer.addEventListener('click',function(e){
  const ele=e.target
  if(ele.classList.contains("dots__dot")){
    next(ele.dataset.slide);
    activeDot(ele.dataset.slide)
  }
})
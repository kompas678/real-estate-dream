/** ====================================== Фиксированное меню ========================================== */
const headerWrapper = document.querySelector('.header__wrapper');
let lastScrollTop = 0;

if (headerWrapper) {
  window.addEventListener('scroll', () => {


    if (pageYOffset > 100) {
      headerWrapper.classList.add('_header-mini');
      headerWrapper.classList.remove('_header-normal');
    }
    if (pageYOffset > 800 && pageYOffset > lastScrollTop) {
      headerWrapper.classList.add('_header-offset');
      headerWrapper.classList.remove('_active');
    } else if (pageYOffset > 800 && pageYOffset < lastScrollTop) {
        headerWrapper.classList.add('_active');
    }

    if (pageYOffset === 0) {
        headerWrapper.classList.remove('_active');
        headerWrapper.classList.remove('_header-offset');
        headerWrapper.classList.remove('_header-mini');
        headerWrapper.classList.add('_header-normal');
    }
    lastScrollTop = pageYOffset;
  });
};


/** ====================================== Кнопка мобильного меню ========================================== */
const menuBurger = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

if (menuBurger) {
  menuBurger.addEventListener('click', () => {
    menuBurger.classList.toggle('_active');
    menuBody.classList.toggle('_active');
    document.body.classList.toggle('_lock');
  })

  menuBody.addEventListener('click', () => {
    menuBurger.classList.remove('_active');
    menuBody.classList.remove('_active');
    if (!document.getElementById('popup').classList.contains('_open')) {
      document.body.classList.remove('_lock');
    }
  });
};


/** ====================================== Слайдеры ========================================== */
let mainImageSwiper = new Swiper('.slider-top__container', {
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },


  preloadImages: false,
  lazy: {
    loadOnTransitionStart: false,
    loadPrevNext: true
  },


  watchSlidesProgress: true,
  watchSlidesVisibility: true,

  effect: 'slide',


  autoplay: {
      delay: 4000,
      disableOnInteraction: true
    },
    speed: 800,

    slidesPerView: 1,
    watchOverflow: true,


    observer: true,
    observeParents: true,
    observeSlideChildren: true,




});
let sliderBestProp = new Swiper('.slider-best-prop__container', {


  preloadImages: false,
  lazy: {
    loadOnTransitionStart: false,
    loadPrevNext: true
  },


  watchSlidesProgress: true,
  watchSlidesVisibility: true,

  effect: 'slide',


  autoplay: {
      delay: 5000,
    },
    speed: 800,

    slidesPerView: 'auto', 
    spaceBetween: 32,
    watchOverflow: true,


    observer: true,
    observeParents: true,
    observeSlideChildren: true,




});
let sliderTestimonies = new Swiper('.slider-testimonies__container', {
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },


  preloadImages: false,
  lazy: {
    loadOnTransitionStart: false,
    loadPrevNext: true
  },


  watchSlidesProgress: true,
  watchSlidesVisibility: true,

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },


  autoplay: {
      delay: 7000,
      disableOnInteraction: true
    },
    speed: 800,

    slidesPerView: 'auto', 
    watchOverflow: true,


    observer: true,
    observeParents: true,
    observeSlideChildren: true,




});











/** ====================================== Модальное окно ========================================== */
const body = document.querySelector('body');
const popupButtons = document.querySelectorAll('.popup-btn');
const lockPadding = document.querySelectorAll('._lock-padding');
let unlock = true;
const timeout = 300; 
const timeoutFocus = 400; 

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      if (el.classList.contains('_header-mini') || el.classList.contains('_header-offset')) {
        el.parentElement.style.paddingRight = '0px';
        el.style.paddingRight = lockPaddingValue;
      } else if (el.classList.contains('_header-normal')) {
        el.parentElement.style.paddingRight = lockPaddingValue;
      }
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('_lock');

  unlock = false;
  setTimeout(() => {unlock = true}, timeout);
}
function bodyUnlock() {
  setTimeout(() => {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('_lock');
  }, timeout);

  unlock = false;
  setTimeout(() => {unlock = true}, timeout);
}

function popupHide(popupActive) {
  popupActive.classList.remove('_open');
  popupActive.classList.add('_hidden');
  popupActive.setAttribute('aria-hidden','true');
}
function popupShow(popupHidden) {
  popupHidden.classList.remove('_hidden');
  popupHidden.classList.add('_open');
  popupHidden.setAttribute('aria-hidden','false');
}

function popupHandler(popupCurrent, lastFocus) {
  const hiddenPopups = document.querySelectorAll('.popup._hidden');
  if (unlock) {
    popupCurrent.classList.remove('_open');
    popupCurrent.setAttribute('aria-hidden','true');
  }
  if (hiddenPopups.length > 0) {
    popupShow(popupCurrent.previousElementSibling);
  } else if (!document.querySelector('.popup._open')) {
    bodyUnlock();
  }
  setTimeout(() => lastFocus.focus(), timeoutFocus);
}
function popupCloseESC(popupCurrent, lastFocus) {
  popupCurrent.addEventListener('keydown', (e) => {
    const key = e.which || e.keyCode;
    if (popupCurrent && key === 27) {
      popupHandler(popupCurrent, lastFocus);
    }
  });
}
function popupCloseClick(popupCurrent, lastFocus) {
  popupCurrent.addEventListener('click', (e) => {
    if (!e.target.closest('.popup__content') || e.target.closest('.close-popup')) {
      popupHandler(popupCurrent, lastFocus);
    }
  });
}

function popupOpen(popupCurrent) {
  const activePopup = document.querySelector('.popup._open');
  const popupContent = popupCurrent.querySelector('.popup__content');
  const focusable = popupContent.querySelectorAll(`a[href], iframe, [tabindex]:not([tabindex='-1']),
                                                  input:not([disabled]):not([aria-hidden]):not([type='hidden']),
                                                  select:not([disabled]):not([aria-hidden]),
                                                  extarea:not([disabled]):not([aria-hidden]),
                                                  button:not([disabled]):not([aria-hidden])`);
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  if (unlock) {
    if (activePopup) {
      popupHide(activePopup);
    } else {
      bodyLock();
    }
    popupCurrent.classList.add('_open');
    popupCurrent.setAttribute('aria-hidden','false');
    setTimeout(() => popupContent.focus(), timeoutFocus);
    popupContent.addEventListener('keydown', (e) => {
      const key = e.which || e.keyCode;
      if (e.shiftKey && key === 9 && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
      if (!e.shiftKey && key === 9 && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }, false); 
  }
}

if (popupButtons.length > 0) {
  for (let i = 0; i < popupButtons.length; i++) {
    const popupButton = popupButtons[i];
    popupButton.addEventListener('click', () => {
      const popupName = popupButton.dataset.path;
      const currentPopup = document.getElementById(popupName);

      popupOpen(currentPopup);
      popupCloseESC(currentPopup, popupButton);
      popupCloseClick(currentPopup, popupButton);
    });
  }
}

(function() {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        let matches = (this.document || this.ownerDocument).querySelectorAll(s);
          let i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }
}());

(function(e){
  if (!Element.prototype.closest) {
    e.closest = e.closest || function(css){
      let node = this;

      while (node) {
        if (node.matches(css)) return node;
        node = node.parentElement;
      }
      return null;
    }
  }
})(Element.prototype);




/** ====================================== Динамический адаптив ========================================== */
class DynamicAdapt {
  constructor(type) {
    this.type = type;
  }

  init() {
    this.оbjects = [];
    this.daClassname = '_dynamic_adapt_';
    this.nodes = [...document.querySelectorAll('[data-da]')];

    this.nodes.forEach((node) => {
      const data = node.dataset.da.trim();
      const dataArray = data.split(',');
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
      оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    });

    this.arraySort(this.оbjects);

    this.mediaQueries = this.оbjects
      .map(({
        breakpoint
      }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
      .filter((item, index, self) => self.indexOf(item) === index);

    this.mediaQueries.forEach((media) => {
      const mediaSplit = media.split(',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      const оbjectsFilter = this.оbjects.filter(
        ({
          breakpoint
        }) => breakpoint === mediaBreakpoint
      );
      matchMedia.addEventListener('change', () => {
        this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    });
  }

  mediaHandler(matchMedia, оbjects) {
    if (matchMedia.matches) {
      оbjects.forEach((оbject) => {
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      });
    } else {
      оbjects.forEach(
        ({ parent, element, index }) => {
          if (element.classList.contains(this.daClassname)) {
            this.moveBack(parent, element, index);
          }
        }
      );
    }
  }

  moveTo(place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.append(element);
      return;
    }
    if (place === 'first') {
      destination.prepend(element);
      return;
    }
    destination.children[place].before(element);
  }

  moveBack(parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }

  indexInParent(parent, element) {
    return [...parent.children].indexOf(element);
  }

  arraySort(arr) {
    if (this.type === 'min') {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return -1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return 1;
          }
          return a.place - b.place;
        }
        return a.breakpoint - b.breakpoint;
      });
    } else {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return 1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return -1;
          }
          return b.place - a.place;
        }
        return b.breakpoint - a.breakpoint;
      });
    }
  }
}

const da = new DynamicAdapt("max");
da.init();



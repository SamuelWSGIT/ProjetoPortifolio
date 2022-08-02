const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
    const windowin = window.pageYOffset + ((window.innerHeight * 2.5) / 4);
    const windowout = window.pageYOffset + ((window.innerHeight * 2.5) / 4);
    target.forEach(function(element) {
        if((windowin) > element.offsetTop) {
            element.classList.add(animationClass);
        } else {
            element.classList.remove(animationClass);
        }
    })
}

animeScroll();

window.addEventListener('scroll', function() {
    animeScroll();

    if(target.length) {
        window.addEventListener('scroll', debounce(function() {
            animeScroll();
        }, 900));
    }
})

$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

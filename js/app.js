/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

const navbarList = document.getElementById('navbar__list');

const sectionOne = document.getElementById('section1');
const sectionTwo = document.getElementById('section2');
const sectionThree = document.getElementById('section3');
const sections = [sectionOne, sectionTwo, sectionThree];

/**
 * End Global Variables
 * Start Helper Functions
 *
*/


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
const buildNavbar = () => {
    sections.forEach(section => {
        let navbarItem = document.createElement('li');
        navbarItem.id = 'navbar__item';
        let navbarLink = document.createElement('a');
        navbarLink.textContent = section.dataset.nav;
        navbarLink.href = `#${section.id}`;
        navbarLink.classList.add('menu__link');
        navbarItem.append(navbarLink);
        navbarList.append(navbarItem);
    });
}

buildNavbar();

// Add class 'active' to section when near top of viewport
// Adapted from felgall's answer at
// http://community.sitepoint.com/t/changing-an-element-background-color-on-page-scroll-viewport/193578/17?u=paulob

const highlightActiveSection = () => {
    [].forEach.call(document.querySelectorAll('main section'), (element) => {
        if (isActive(element)) {
            element.classList.add('your-active-class');
        } else {
            element.classList.remove('your-active-class');
        }
    })
}

const isActive = (element) => {
    let boundaries = element.getBoundingClientRect();
    return (
        boundaries.top <= topLimit &&
        boundaries.bottom >= bottomLimit
    )
}

let windowHeight = window.innerHeight || document.documentElement.clientHeight;
let topLimit = windowHeight * 0.35;
let bottomLimit = windowHeight * 0.65;

window.addEventListener('scroll', highlightActiveSection, false);

// Scroll to anchor ID using scrollTO event
navbarList.addEventListener('click', function (event) {
    event.preventDefault();
    const target = event.target;
    if (target.getAttribute('href') === '#section1') {
        scrollSmoothlyTo('section1');
    }
    else if (target.getAttribute('href') === '#section2') {
        scrollSmoothlyTo('section2');
    }
    else if (target.getAttribute('href') === '#section3') {
        scrollSmoothlyTo('section3');
    }
    else {
        return;
    }
});

const scrollSmoothlyTo = (sectionId) => {
    const section = document.getElementById(sectionId);
    const leftCoordinate = getAbsoluteCoordinates(section).left;
    const topCoordinate = getAbsoluteCoordinates(section).top;
    scrollTo({
        top: topCoordinate,
        left: leftCoordinate,
        behavior: 'smooth'
    });
}

const getAbsoluteCoordinates = (element) => {
    const boundaries = element.getBoundingClientRect();
    const amountScrolledHorizontally = window.scrollX;
    const amountScrolledVertically = window.scrollY;
    return {
        left: boundaries.left + amountScrolledHorizontally,
        top: boundaries.top + amountScrolledVertically
    }
}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active



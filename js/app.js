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

// const createMenuLink = () => {
//     let menuLink = document.createElement('li');
//     let anchor = document.createElement('a');
//     return menuLink.append(anchor);
// }



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


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active



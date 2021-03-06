/*
 * Populate navigation menu dynamically
 *
 */

const menu = document.getElementById('navbar__list');

const sectionsModule = ( () => {
    const sectionsNodeList = document.querySelectorAll('main section');
    const sections = [...sectionsNodeList];
    const getAllSections = () => {
        return sections;
    }
    return {
        getAllSections: getAllSections
    }
})();

const populateMenu = () => {
    const sections = sectionsModule.getAllSections();
    sections.forEach(section => {
        const menuItem = createMenuItemFor(section);
        menu.append(menuItem);
    });
}

const createMenuItemFor = (element) => {
    const menuItem = document.createElement('li');
    const menuLink = createMenuLink(element);
    menuItem.append(menuLink);
    return menuItem;
}

const createMenuLink = (element) => {
    const menuLink = document.createElement('a');
    menuLink.textContent = element.dataset.nav; // set item name to its section name
    menuLink.href = `#${element.id}`; // set reference link to proper section
    menuLink.classList.add('menu__link');
    return menuLink;
}

populateMenu();

/*
 * Highlight active section
 *
 * Adapted from felgall's answer at
 * http://community.sitepoint.com/t/changing-an-element-background-color-on-page-scroll-viewport/193578/17?u=paulob
 */

const activeViewRangeModule = ( () => {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const topLimit = windowHeight * 0.35;
    const bottomLimit = windowHeight * 0.65;
    return {
        topLimit,
        bottomLimit
    }
})();

const highlightActiveSection = () => {
    const sections = sectionsModule.getAllSections();
    sections.forEach(section => {
        if (isActive(section)) {
            section.classList.add('active');
            toggleMenuItemActive(section);
        } else {
            section.classList.remove('active');
        }
    })
}

const isActive = (element) => {
    const boundaries = element.getBoundingClientRect();
    return (
        boundaries.top <= activeViewRangeModule.topLimit &&
        boundaries.bottom >= activeViewRangeModule.bottomLimit
    )
}

toggleMenuItemActive = (section) => {
    const menuLinks = document.querySelectorAll('.menu__link');
    menuLinks.forEach(menuLink => {
        if (menuLink.textContent === section.dataset.nav) {
            menuLink.classList.add('active');
        } else {
            menuLink.classList.remove('active');
        }
    })
}

window.addEventListener('scroll', highlightActiveSection, false);

/*
 * Scroll to section smoothly on menu click
 *
 */

menu.addEventListener('click', function (event) {
    event.preventDefault();
    const elementReference = event.target.getAttribute('href');
    const sectionLinked = elementReference.substr(1); // remove '#'
    scrollSmoothlyTo(sectionLinked);
});

const scrollSmoothlyTo = (sectionId) => {
    const section = document.getElementById(sectionId);
    const leftCoordinate = getAbsoluteCoordinates(section).left;
    const topCoordinate = getAbsoluteCoordinates(section).top - 50;
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

/*
==============================================================
==============================================================
*/

/* =============== start header menu ================== */

let navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

/* show menu */
if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

/* hidden menu */
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

/* rmove menu mobile  */

let navLinks = document.querySelectorAll(".nav-link");

function linkAction() {
    let navMenu = document.getElementById("nav-menu");

    // when we click on each nav link , we remove the show menu class
    navMenu.classList.remove("show-menu");
}

navLinks.forEach((n) => n.addEventListener("click", linkAction));

/* =============== end header menu ================== */

/*
==============================================================
==============================================================
*/

/* =============== start chang background header ================= */

function scrollHeader() {
    let header = document.getElementById("header");

    /* when the scroll is greater than 80 viewport height, add the class scroll header to the tag header */

    if (this.scrollY >= 80) {
        header.classList.add("scroll-header");
    } else {
        header.classList.remove("scroll-header");
    }
}

window.addEventListener("scroll", scrollHeader);

/* =============== end chang background header ================= */

/*
==============================================================
==============================================================
*/

/* =============== start testimonial swiper ================== */

let swiper = new Swiper(".testimonial-wrapper", {
    loop: "true",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

/* =============== end testimonial swiper ================== */

/*
==============================================================
==============================================================
*/

/* =============== scroll section active link ================== */

// get all section that have an id defined
let sections = document.querySelectorAll("section[id]");

// function navHighlighter() {
//     // get current scroll positon
//     let scrollY = window.pageYOffset;

//     // now we loop
//     sections.forEach((current) => {
//         let sectionHeight = current.offsetHeight;
//         let sectionTop = current.offsetTop - 100;
//         let sectionId = current.getAttribute("id");

//         if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//             document
//                 .querySelector(".nav-menu a[href*=" + sectionId + "]")
//                 .classList.add("active-link");
//         } else {
//             document
//                 .querySelector(".nav-menu a[href*=" + sectionId + "]")
//                 .classList.remove("active-link");
//         }
//     });
// }

function navHighlighter() {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
        let sectionHeight = current.offsetHeight;
        let sectionTop = current.offsetTop - 100;
        let sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const link = document.querySelector(
                ".nav-menu a[href*=" + sectionId + "]"
            );
            if (link) {
                link.classList.add("active-link");
            }
        } else {
            const link = document.querySelector(
                ".nav-menu a[href*=" + sectionId + "]"
            );
            if (link) {
                link.classList.remove("active-link");
            }
        }
    });
}

window.addEventListener("scroll", navHighlighter);

/* =============== end section active link ================== */

/*
==============================================================
==============================================================
*/

/* =============== start protfolio item filter ================== */

let filterContainer = document.querySelector(".portfolio-filter-inner"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
    filterBtns[i].addEventListener("click", function () {
        filterContainer.querySelector(".active").classList.remove("active");

        this.classList.add("active");

        let filterValue = this.getAttribute("data-filter");

        for (let k = 0; k < totalPortfolioItem; k++) {
            if (
                filterValue === portfolioItems[k].getAttribute("data-category")
            ) {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            } else {
                portfolioItems[k].classList.add("hide");
                portfolioItems[k].classList.remove("show");
            }

            if (filterValue === "all") {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
        }
    });
}

/* =============== end protfolio item filter ================== */

/*
==============================================================
==============================================================
*/

/* ========== start footer ============= */

let dateYear = document.querySelector(".footer .dateYear");
let newDate = new Date();

window.addEventListener("load", () => {
    dateYear.innerHTML = newDate.getFullYear();
});

/* ========== end footer ============= */

/*
==============================================================
==============================================================
*/

/* =============== start theme / display customization ================== */

let theme = document.querySelector("#theme-button");
let themeModal = document.querySelector(".customize-theme");
let fontSize = document.querySelectorAll(".choose-size span");
let colorPalette = document.querySelectorAll(".choose-color span");
let root = document.querySelector(":root");
let Bg1 = document.querySelector(".bg-1");
let Bg2 = document.querySelector(".bg-2");
let Bg3 = document.querySelector(".bg-3");

// open modal
let openThemeModal = () => {
    themeModal.style.display = "grid";
};

// close modal
let closeThemeModal = (e) => {
    if (e.target.classList.contains("customize-theme")) {
        themeModal.style.display = "none";
    }
};

theme.addEventListener("click", openThemeModal);

themeModal.addEventListener("click", closeThemeModal);

/*
=============== fonts ==================
*/

// remove active class form spans or font size select
let removeSizeSelector = () => {
    fontSize.forEach((size) => {
        size.classList.remove("active");
    });
};

fontSize.forEach((size) => {
    size.addEventListener("click", () => {
        removeSizeSelector();

        let fontSize;
        size.classList.toggle("active");

        if (size.classList.contains("font-size-1")) {
            fontSize = "12px";
        } else if (size.classList.contains("font-size-2")) {
            fontSize = "14px";
        } else if (size.classList.contains("font-size-3")) {
            fontSize = "16px";
        } else if (size.classList.contains("font-size-4")) {
            fontSize = "18px";
        }

        // change font size of the root html element
        document.querySelector("html").style.fontSize = fontSize;
    });
});

/*
=============== primary colors ==================
*/

// remove active class form colors
let changeActiveColorClass = () => {
    colorPalette.forEach((colorPicker) => {
        colorPicker.classList.remove("active");
    });
};

colorPalette.forEach((color) => {
    color.addEventListener("click", () => {
        let primaryHue;
        changeActiveColorClass();

        if (color.classList.contains("color-1")) {
            primaryHue = 252;
        } else if (color.classList.contains("color-2")) {
            primaryHue = 52;
        } else if (color.classList.contains("color-3")) {
            primaryHue = 352;
        } else if (color.classList.contains("color-4")) {
            primaryHue = 152;
        } else if (color.classList.contains("color-5")) {
            primaryHue = 202;
        }

        color.classList.add("active");
        root.style.setProperty("--primary-color-hue", primaryHue);
    });
});

/*
=============== theme backgrounds ==================
*/
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// change background color
let changeBG = () => {
    root.style.setProperty("--light-color-lightness", lightColorLightness);
    root.style.setProperty("--white-color-lightness", whiteColorLightness);
    root.style.setProperty("--dark-color-lightness", darkColorLightness);
};

Bg1.addEventListener("click", () => {
    // add active class
    Bg1.classList.add("active");

    // remove active class form the others
    Bg2.classList.remove("active");
    Bg3.classList.remove("active");

    // remove customize changes from local storage
    window.location.reload();
});

Bg2.addEventListener("click", () => {
    darkColorLightness = "95%";
    whiteColorLightness = "20%";
    lightColorLightness = "15%";

    // add active calss
    Bg2.classList.add("active");

    // remove active class form the others
    Bg1.classList.remove("active");
    Bg3.classList.remove("active");
    changeBG();
});

Bg3.addEventListener("click", () => {
    darkColorLightness = "95%";
    whiteColorLightness = "10%";
    lightColorLightness = "0%";

    // add active calss
    Bg3.classList.add("active");

    // remove active class form the others
    Bg2.classList.remove("active");
    Bg1.classList.remove("active");
    changeBG();
});

/* =============== end theme / display customization ================== */

/*
==============================================================
==============================================================
*/

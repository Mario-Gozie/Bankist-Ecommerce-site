"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// CODE BEFORE THE FOREACH LOOP

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

// CODE WITH FOREACH LOOP

btnsOpenModal.forEach((btnmodal) =>
  btnmodal.addEventListener("click", openModal)
);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// IMPLEMENTING SMOOTH SCROLLING WITH THE LEARN MORE BUTTON
// THFER ARE TWO WAYS OF DOING THIS

btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();
  // getting coordinates (current position of an Element based on the current viewPort) of the elements we want to scroll to with getBoundingClientRect. (as a hint, the rect means rectangle) This will reveal the distance along the x axis (which is also the left property of the geBoindingClientRect() object value) to the element, the distance from the top to the element which is Y axis(which is also the Top property of the geBoindingClientRect() object value), then its width, height and other features. But the problem with this is that the X and Y cordinates are in respect to the ViewPort not the Document.
  const s1coords = section1.getBoundingClientRect();

  // seeing coordinate of where we want to scroll to
  console.log(s1coords);

  // getting coordinate for element (current position of an Element based on the current viewPort) we want to click (The Learn more button). This will reveal the distance along the x axis (which is also the left property of the geBoindingClientRect() object value) to the element, the distance from the top to the element which is Y axis (which is also the Top property of the geBoindingClientRect() object value), then its width, height and other features. But the problem with this just like in above is that the X and Y cordinates are in respect to the ViewPort not the Document.
  console.log(e.target.getBoundingClientRect()); // This is not really necessary now anyway.😒😒😒 Just for Practice

  // WE CAN GET HOW FAR WE HAVE SCROLLED (current scroll) BASED ON THE DOCUMENT AND NOT THE VIEWPORT. in other words, it is the distace we have scrolled from the begining og the document to the top edge of the computer screen. This will give 0 for the X axis because there was no scrolling on the X axis. See below!
  console.log(`Current Scroll (X/Y)`, Window.pageXOffset, Window.pageYOffset);

  // we can get height and width of the current viewPort. that is, what you can see currently.

  console.log(
    `height/width viewport`,
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // THE MAIN SCROLLING CODES
  // To allow the scrolling happen, we have to add the  X and Y current position based on current view port to the distance scrolled on the documents. You need to understand the codes above to understand below!
  window.scrollTo(
    s1coords.left + Window.pageXOffset,
    s1coords.top + Window.pageYOffset
  );

  // YOU CAN PASS IN AN OBJECT INSTEAD OF SINGLE ARGUMENT AND ALSO ADD A BEHAVIOUR PROPERTY OF SMOOTH TO MAKE IT MOVE SMOOTHLY. still on making the scrolling work.
  window.scrollTo({
    lefft: s1coords.left + Window.pageXOffset,
    top: s1coords.top + Window.pageYOffset,
    behavior: "smooth",
  });

  // THE ABOVE METHODS OF SCROLLING IS AN OLD SCHOOL WAY, THERE IS A MORE MODERN WAY OF DOING THE SCROLLING USING scrollIntoView and pass in an Object of behavior smooth

  // This is easier
  section1.scrollIntoView({ behavior: "smooth" });
});

// PAGE NAVIGATION

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// The above works but using Bobbling effect. using the method above when there are 1000 elements with the .nav__link class will slow down the code so it is better to use a bobbling effect which we will see below

// THIS IS CALLED EVENT DELEGATION. (You need to understand bubbling effect to understand the code below)
// 1. Add event listener to common parent element
// 2. Determine what element that originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(e.target); //e.target is the actual target where event happend

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    //e.target is the part of the parent element that was clicked. so in this case, the nav__links is the e while e.target a nav__link inside nav__links.
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// tabs.forEach((t) => {
//   t.addEventListener("click", () => console.log("TAB"));
// });

tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab"); // DOM Tranversing

  // Guard clause
  if (!clicked) return; // this is used to break out of the function incase there is no clicked value, i.e incase you click anywhere that is not the button.

  // Active tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  tabsContent.forEach((c) => c.classList.remove("operations__content--actuve"));
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// MENU FADE ANIMATION

// CREATING A FUNCTION TO PREVENT REPEATATION OF CODES

// const handleHover = function (e, opacity) {
//   // e.preventDefault;
//   // console.log(e.target);
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     // console.log(link);
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     siblings.forEach((el) => {
//       if (el !== link) el.style.opacity = opacity;
//     });
//     logo.style.opacity = opacity;
//   }
// };

// THE FUNCTION ABOVE WORKS SAME WAY WITH THE ONE HERE. REMEMBER THAT WHATEVER YOU PASS INTO THE BIND FUNCTION IS THE THIS KEY WORD

const handleHover = function (e) {
  // e.preventDefault;
  // console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// CALLING THE FUNCTIONS BELOW
// remember addEventlistener takes only a function, that is why I used the function(e){} here instead of calling the handleHover. in such situation, it will return a value and if printed on the console, it will show undefined.
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});

// USING THE BIND METHOD

// The above could be also done with a bind method which returns a function. this will stop us from using the function keyword again.

// bind was used because whatever value you pass into bind is the this keyword. which is e in this case. that is why I didnt pass e while using the bind method, becasuse it returns the element to which the event listener is attached to.

// To make understanding easier, we didnt pass the call the handle hover function directly because add event listener needs a function. and if it already which it will call by itself. so because the bind method returns a function, that is why it is used. if I call the handleHover function just like that, it will return a value and not a function.

nav.addEventListener("mouseover", handleHover.bind(0.5));

// REMOVING THE FADE ANIMATION EACH TIME THE MOUSE IS REMOVED

nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

// USING THE BIND METHOD
nav.addEventListener("mouseout", handleHover.bind(1));

// CREATING A STICKY NAVIGATOR WHEN YOU GET TO DIFFERENT SECTIONS OF THE WEBPAGE
const initalCordinates = section1.getBoundingClientRect(); // This is used to get the cordinates of section 1, then put it into inital cordinates variable.

// I used windows here instead of document because the scroll event is in the windows not document.
window.addEventListener("scroll", function () {
  if (window.scrollY > initalCordinates.top) {
    nav.classList.add("sticky");
  } else nav.classList.remove("sticky");
});

// IMPLEMENTING THE NEW STICKY NAVIGATION WITH THE INTERSECTION OBSERVER API
// Intersection observer API allows our code to observe changes or the way and element intersect another element or the way it intersects the viewport.
const header = document.querySelector(".header");

const stickyNav = function (entries) {
  // JUST TESTING THE CODE
  const [entry] = entries;
  // console.log(entry);

  // TUTOR's PART
  // if (headerObserver.isintersecting === false) nav.classList.add("sticky");
  // else nav.classList.add("sticky");

  //TUTORS PART
  if (!entry.isintersecting) nav.classList.add("sticky");
  else nav.classList.add("sticky"); // entry is simply the object in the in the new intersctionObsrver created. and one of the properties of this intersection observer is the "isintersecting"
};
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, //here I am basically saying that I want a situation where when no part of the header section is in the viewport, I want the navbar to show.
  threshold: 0,
  // rootMargin: "-90px", // I added a visual margin at the end of the root element, this marging is same height with the height of the nav bar. this is to avoid the sticky nav bar closing part of the new section while transitioning into sticky. The negative there simply says, AT THE END OF THE HEADER. if it is positive it will add a visual margin at the begining of the header. but coding this height just like that may not be nice because there are may be differnt dimensions for the different devices. so we can use getBoundingClientRect() to get the height of the nav bar.
  rootMargin: `${-navHeight}px`,
});

headerObserver.observe(header);

// HIDDING SECTION UNTIL YOU SCROLL TO IT

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return; // this is break out of the code whenever th observation is false. in this case, when you are at the header. it will make transition and revealing of other sections smooter

  // REMEMBER THAT WHATEVER THAT IS YOUR TARGET IS STORED IN THE TARGET ATTRIBUTE OF THE OBSERVER OBJECT
  entry.target.classList.remove("section--hidden"); // This is to remove the section hidden class.

  // unobserving to remove unnecessary reoccurance.  making the action happen only once. which is nice
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

// LAZY IMAGE LOADING.
// This will be done on only images that have data source (data-src) attribute in HTML
const imgTargets = document.querySelectorAll("img[data-src]");
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // REPLACE SRC WITH DATA-SRC
  // remember that every item you are observing will be stored in the target. also remember that all dataset properties are stored in datase.src.

  entry.target.src = entry.target.dataset.src;

  entry.target.classList.remove("lazy-img");

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px", // This is just for the images to load before the user gets to it. so it wont be obvious that it is gradually being loaded. so we are basically adding 200px on the root just before getting to the images.
});

imgTargets.forEach((img) => imgObserver.observe(img));

// IMPLEMENTING THE SLIDER
const sliders = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  // current slide

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector(".slider");
  // slider.style.transform = "scale(0.4) translateX(-800px)";
  // slider.style.overflow = "visible";

  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  // The code above us re with goToSlides(0); during refactoring.

  // 0%, 100%, 200%, 300%

  // REFACTORING MY CODE TO PREVENT REPEATATION

  // FUNCTIONS
  // FUNCTION FOR CREATING DOTS.
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };

  // FUNCTION FOR ACTIVATING THE DOTS

  const ActivateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // FUNCTION FOR THE SLIDE TO PRESENT
  const goToSlides = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // FUNCTION FOR NEXT SLIDE

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      // The - 1 here is because length which is used to get maxSlide is not zero based
      curSlide = 0;
    } else {
      curSlide++;
    }

    // slides.forEach(
    //   (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    // );

    goToSlides(curSlide);
    ActivateDot(curSlide);
  };

  // FUNCTION FOR GOING TO THE PREVIOUS SLIDE

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlides(curSlide);
    ActivateDot(curSlide);
  };
  const init = function () {
    // Here, I am putting everythins that need to fuction that has to start each time the sit is loaded into an initialization function.
    goToSlides(0);
    createDots();
    ActivateDot(0);
  };

  init();
  //Event handlers
  btnRight.addEventListener("click", nextSlide);

  // -100%, 0%, -100%, -200%

  btnLeft.addEventListener("click", prevSlide);
  //Translate X move objects along the X axis. so here, we will move

  // ATTACHING ATTACHING EVENT HANDLERS TO KEYBOARD ARROW KEYS (LEFT AND RIGHT TO MAKE SLIDES MOVE)

  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") prevSlide();

    e.key === "ArrowRight" && nextSlide(); //conditional using short circuiting. it is more like the if statement above but this one is for the right arrow key. we can use the same short circuiting for the if statement above.
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // const slide = e.target.dataset.slice; // here I am saying, in that target, get the dataset value which usually start with the word data in the html element, and in this case, it is data-slide

      const { slide } = e.target.dataset; // getting the slide value which I commented on above can be done with slicing. just as I am doing here. so what is commented above and what is here is the same.

      goToSlides(slide);
      ActivateDot(slide);
    }
  });
};

sliders();
// HOW THE INTERSECTION OBSERVER API WORKS

// PRACTICICING WITH THE INTESECTION OBSERVER.
// Creating a new intersection observer.
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// }; //This callback function will be call when the observed element intersect at the treshold of the elemnt we used as the root.
// const obsOptions = {
//   root: null, // setting root with null is simply observing the target element intersecting the viewport
//   threshold: [0, 0.2], // this is simply the percentage at which the callback will be called and here, we are setting it to 10 percent. the Threshold can be a single value or an array. here I will use an array.

//   // in the array I am simply sayin that the trigger function will trigger when the target moves out of the view (0) and also when it enters 20% of the view.
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // the observe method will be called on the observer to check for a target which in our case is the section1

// observer.observe(section1); //section1 is the target
// // // DOM TRANSVERSING

// const h1 = document.querySelector("h1");
// // querySelector also works on elements not only documents. so let us select the a child element inside h1 element.

// // Going downwards: child
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes); //This will give you all the nodes or child element. but it is not always used. most times, we focus on the element we need. just like above where we selected highlight.
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";

// // Going upward: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// // the both codes above give the direct parents of an element.

// // How about when you need to find an element, no mater how far away it is?
// // FINDING A PARENT ELEMENT NO MATTER HOW FAR IT IS

// h1.closest(".header").style.background = "var(--gradient-secondary)"; //This selects the closest element to h1 and changes the background colour. we used one of the color varieables we have in CSS to do this.

// h1.closest("h1").style.background = "var(--gradient-primary)"; //This will still point at the same parent element

// // one take home here is that closest is like query selector but closest is used to find parent element but querySelector is used to find children

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// // accessing a parent element's children with one of its elements.
// console.log(h1.parentElement.children);

// // LET'S DO SOMETHING INTERESTTING
// [...h1.parentElement.children].forEach(function (ele) {
//   if (ele !== h1) {
//     ele.style.transform = "scale(0.5)";
//   }
// });

// // BUILDING A TABBED COMPONENT.

// // ALL BELOW HERE ARE NOT PART OF THE CODE. THEY ARE FOR EXPERIMENT.

// const header = document.querySelector(".header"); // This selects the first element with the class Header

// // CREATING AND INSERTING ELEMENTS

// //.insertAdjacentHTML i have once used this in the bankist app

// const message = document.createElement("div"); // This will create a DOM element and stored it in message but yet to put it on the page.

// // ADDING A CLASS THE MESSAGE ELEMENT
// message.classList.add("cookie-message");

// // ADDING THE TEXT WITH INNERHTML METHOD

// message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// // WE CAN INSERT/APPEND THE MESSAGE INTO THE WEBPAGE

// // header.prepend(message); // prepending adds element as the first child of an element.

// header.append(message); // append puts it as the last child of an element

// // YOU CAN CLONE AN ELEMENT TO ATTACH IT TO DIFFERENCE PLACES. This is done in a case you want to attach same element in different places. if you prepend and append without clonning, the append will overwrite the prepend.

// // header.prepend(message.cloneNode(true));

// // YOU CAN ATTACH SUB ELEMENTS BEFORE ITS PARENT ELEMENT OR EVEN AFTER

// /* header.before(message); */
// /* header.after(message); */

// // DELETING ELEMENTS
// // Here I am saying if I click on the cookie button, please remove the cookie.

// document
//   .querySelector(`.btn--close-cookie`)
//   .addEventListener("click", function () {
//     // old way of removing elements. see directly below

//     // message.parentElement.removeChild(message);

//     // New method of removing elements

//     message.remove();
//   });

// // WORKING ON STYLES.
// // changing colour
// message.style.backgroundColor = "#37383d";
// // width
// message.style.width = "120%";

// // GETTING STYLES YOU DIDN'T GIVE BY YOUR SELF

// console.log(message.style.color); // This was printed because I set this by myself here in JavaScript.
// console.log(message.style.backgroundColor); // This style did not show because I didn't set this here

// // To get styles you didnt set yourself with Javascript, you use getComputedStyle

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// // // MOUSE ENTER EVENT LISTENER This will make, whenever you hover over a h1 element, you will have an alert.
// // const h1 = document.querySelector("h1");

// // h1.addEventListener(`mouseenter`, function (e) {
// //   alert(`addEventlistener: Great!You are reading the heading :D`);
// // });

// // // AN ALTERNATIVE WAY OF SETTING AN EVENT LISTERNER INSTEAD OF USING THE ADDEVENTLISTERNER METHOD. This is with the use of on then the name of the event to be listened for directly next to the on then equating to the function. all event listerners can use on before it but using on is a bit old fashioned.

// // h1.onmouseenter = function (e) {
// //   alert(`addEventlistener: Great!You are reading the heading :D`);
// // };

// // YOU CAN REMOVE AN EVENT LISTENINER AFTER IT MUST HAVE DONE ITS WORK ONCE. This is done using remove eventListner but the remove part of a function variable created earlier. see below!

// const alertH1 = function (e) {
//   alert(`addEventlistener: Great!You are reading the heading :D`); // when you hover over h1, this will come as an alert

//   h1.removeEventListener("mouseenter", alertH1); // Here, we are removing the event listener within so that when you hover subsequent times, it will not happen again.
// };

// h1.addEventListener("mouseenter", alertH1); // Here is where we are calling the event listener

// // YOU CAN REMOVE AN EVENT LISTENER AGTER SOME TIME. See below an example of removing an event listener after 3 seconds

// setTimeout(() => {
//   h1.removeEventListener("mouseenter", alertH1);
// }, 3000);

// // EVENT PROPAGATION: BUBBLING AND CAPTURING PHASE.

// // CREATING A RANDOM COLOR

// // rgb(255,255,255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// // console.log(randomColor(0, 255));

// document.querySelector(".nav__link").addEventListener(`click`, function (e) {
//   console.log(`LINKS`);
//   console.log(e.currentTarget === this);
// });
// document.querySelector(".nav__links").addEventListener(`click`, function (e) {
//   console.log(`LINKS`);
// });
// document.querySelector(".nav").addEventListener(`click`, function (e) {
//   console.log(`LINKS`);
// });

// LIFE CYCLE EVENTS
// The DOMdContentLoaded event listener is an event listener that runs when the DOM is loaded. so all our Javascript code are supposed to be put within it but this is not necessary because the Javascript script is attached to the end of the HTML file. which shows the javascript will run after the HTML is loaded.
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built", e);
});

// This event listener loads after everything on the page has loaded including pictures.
window.addEventListener("load", function (e) {
  console.log("page fully loaded");
});

// THE BEFOREUNLOAD EVENTLISTENER BELOW CAN BE HELPFUL WHEN LEAVEING A PAGE.

// This event listener is created before a user is about to leave a page.
// This could be used when someone clicks on a page to leave a site, and you want to ask him if he really wants to leave. This could also be used when someone wants to leave while filling a form or something similar
// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   e.returnValue = ""; ///This no longer work in most browsers as it used to before 2020, because many developers abused it.
// });

// A NOTE
// <script src="script.js"></script>

// Javascript codes imported to HTML head runs before the one included in the body this could slow down runtime of the event listener called DOMContentLoaded because it has to wait for the HTML file to load before it will run. when the Javascript file is run normally, "<script src="script.js"></script>" and it is imported in the head not the body, the HTML file will wait for the javascript code before the DOMContentLoaded will run. if it is run asynchronously "<script Asnyc src="script.js"></script>" and ot os attached to the head, the Javascript file will execute before the HTML then the DOMContentLoaded eventListener will be activated. which is not nice. the HTML is supposed to load first. but when the Javascript file is run with Defer "<script defer src="script.js"></script>" and the code is attached to the head. the HTML will run first, then Javascript will execute, the DOMContentLoaded, this is exactly what is needed. This is important when you are working with Third party library that will require to run in order.

// Note that only modern browsers support async and defer if you need to do this, then you need to put your script at the end of the code (in the end of the body)

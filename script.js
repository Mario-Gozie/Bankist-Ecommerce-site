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

const handleHover = function (e, opacity) {
  // e.preventDefault;
  // console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// CALLING THE FUNCTIONS BELOW
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});

// USING THE BIND METHOD

// The above could be also done with a bind method which returns a function. this will stop us from using the function keyword again.
nav.addEventListener("mouseover", handleHover.bind(0.5));

// REMOVING THE FADE ANIMATION EACH TIME THE MOUSE IS REMOVED

nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

// USING THE BIND METHOD

nav.addEventListener("mouseout", handleHover.bind(1));

// // DOM TRANSVERSING

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

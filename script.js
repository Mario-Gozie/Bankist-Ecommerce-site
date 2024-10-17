"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

const header = document.querySelector(".header"); // This selects the first element with the class Header

// CREATING AND INSERTING ELEMENTS

//.insertAdjacentHTML i have once used this in the bankist app

const message = document.createElement("div"); // This will create a DOM element and stored it in message but yet to put it on the page.

// ADDING A CLASS THE MESSAGE ELEMENT
message.classList.add("cookie-message");

// ADDING THE TEXT WITH INNERHTML METHOD

message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// WE CAN INSERT/APPEND THE MESSAGE INTO THE WEBPAGE

// header.prepend(message); // prepending adds element as the first child of an element.

header.append(message); // append puts it as the last chald of an element

// DELETING ELEMENTS
// Here I am saying if I click on the cookie button, please remove the cookie.

document
  .querySelector(`.btn--close-cookie`)
  .addEventListener("click", function () {
    // old way of removing elements. see directly below

    // message.parentElement.removeChild(message);

    // New method of removing elements

    message.remove();
  });

// IMPLEMENTING SMOOTH SCROLLING WITH THE LEARN MORE BUTTON
// THFER ARE TWO WAYS OF DOING THIS

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

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

// // MOUSE ENTER EVENT LISTENER This will make, whenever you hover over a h1 element, you will have an alert.
const h1 = document.querySelector("h1");

// h1.addEventListener(`mouseenter`, function (e) {
//   alert(`addEventlistener: Great!You are reading the heading :D`);
// });

// // AN ALTERNATIVE WAY OF SETTING AN EVENT LISTERNER INSTEAD OF USING THE ADDEVENTLISTERNER METHOD. This is with the use of on then the name of the event to be listened for directly next to the on then equating to the function. all event listerners can use on before it but using on is a bit old fashioned.

// h1.onmouseenter = function (e) {
//   alert(`addEventlistener: Great!You are reading the heading :D`);
// };

// YOU CAN REMOVE AN EVENT LISTENINER AFTER IT MUST HAVE DONE ITS WORK ONCE. This is done using remove eventListner but the remove part of a function variable created earlier. see below!

const alertH1 = function (e) {
  alert(`addEventlistener: Great!You are reading the heading :D`); // when you hover over h1, this will come as an alert

  h1.removeEventListener("mouseenter", alertH1); // Here, we are removing the event listener within so that when you hover subsequent times, it will not happen again.
};

h1.addEventListener("mouseenter", alertH1); // Here is where we are calling the event listener

// YOU CAN REMOVE AN EVENT LISTENER AGTER SOME TIME. See below an example of removing an event listener after 3 seconds

setTimeout(() => {
  h1.removeEventListener("mouseenter", alertH1);
}, 3000);

// EVENT PROPAGATION: BUBBLING AND CAPTURING PHASE.

// CREATING A RANDOM COLOR

// rgb(255,255,255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {});

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

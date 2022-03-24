var navList = document.getElementById("nav-list");
var navi = navList.getElementsByClassName("navi");
const navBar = document.getElementById("nav");

for (var i = 0; i < navi.length; i++) {
  navi[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("current");
    current[0].className = current[0].className.replace(" current", " ");
    this.className += " current";
  });
}

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("#nav-list .navi");
const footer = document.getElementById("contact-us");
window.onscroll = () => {
  var current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= Math.max(sectionTop - 112, 0)) {
      current = section.getAttribute("id");
    }
  });

  if (window.scrollY >= footer.offsetTop - sections[0].offsetHeight) {
    current = "contact-us";
  }

  navLi.forEach((li) => {
    li.classList.remove("current");
    if (li.dataset.link === current) {
      li.classList.add("current");
    }
  });
};

//comments

const header = document.querySelector("header");
const sectionOne = document.querySelector(".home-intro");

const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

sliders.forEach((slider) => {
  appearOnScroll.observe(slider);
});

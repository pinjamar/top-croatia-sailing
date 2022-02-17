/**
 * 1. Fetches cats JSON
 * 2. Builds carousel HTML
 * 3. Connects carousel with mouse events
 * 4. Starts carousel autoplay
 */
fetch("images.json")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    let summerCarousel = document.getElementById("kitten-carousel");
    summerCarousel.innerHTML = buildCarouselHTML(json.cats);

    return summerCarousel;
  })

  .then((summerCarousel) => {
    connectCarouselEvents(summerCarousel);
    return summerCarousel;
  })
  .then((summerCarousel) => {
    startCarouselAutoplay(summerCarousel);
  })

  .then(() => modalPopup());

/**
 * Hooks up carousel events. Should be called after carousel has finished building HTML.
 */
function connectCarouselEvents(summerCarousel) {
  if (!summerCarousel) {
    console.error(
      "Cannot start cat carousel without a reference to the carousel"
    );
    return;
  }

  let cardMargins = 40;
  let cardWidth =
    document.querySelector(".slide-card").scrollWidth + cardMargins;
  let prevButton = document.querySelector(".cat-carousel--button.button--prev");
  let nextButton = document.querySelector(".cat-carousel--button.button--next");

  nextButton.addEventListener("click", () => {
    if (
      summerCarousel.scrollWidth ==
      summerCarousel.scrollLeft + summerCarousel.clientWidth
    ) {
      summerCarousel.scroll({
        left: 1,
        behavior: "smooth",
      });
    } else {
      summerCarousel.scroll({
        left: summerCarousel.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
  });

  prevButton.addEventListener("click", () => {
    if (summerCarousel.scrollLeft === 0) {
      summerCarousel.scroll({
        left: 999999,
        behavior: "smooth",
      });
    } else {
      summerCarousel.scroll({
        left: summerCarousel.scrollLeft - cardWidth,
        behavior: "smooth",
      });
    }
  });
}

function startCarouselAutoplay(summerCarousel) {
  let shouldAutoplay = true;
  let nextButton = document.querySelector(".cat-carousel--button.button--next");
  let prevButton = document.querySelector(".cat-carousel--button.button--prev");
  let modal = document.querySelector(".modal");

  if (!nextButton) {
    console.error("Unable to start autoplay, check if nextButton is present");
    return;
  }

  setInterval(() => {
    if (shouldAutoplay) {
      nextButton.click();
    }
  }, 2500);

  summerCarousel.addEventListener("mouseover", () => {
    shouldAutoplay = false;
  });
  nextButton.addEventListener("mouseover", () => {
    shouldAutoplay = false;
  });
  prevButton.addEventListener("mouseover", () => {
    shouldAutoplay = false;
  });

  summerCarousel.addEventListener("mouseleave", () => {
    shouldAutoplay = true;
  });
  nextButton.addEventListener("mouseleave", () => {
    shouldAutoplay = true;
  });
  prevButton.addEventListener("mouseleave", () => {
    shouldAutoplay = true;
  });

  modal.addEventListener("mouseover", () => {
    shouldAutoplay = false;
  });
  modal.addEventListener("mouseleave", () => {
    shouldAutoplay = true;
  });
}

function buildCarouselHTML(images) {
  let summerCarouselHTML = "";

  images.forEach((image) => {
    summerCarouselHTML += `
        <div class="slide-card" id="carousel-id-${image.name}">
            <a data-modal
              ><img class="carousel-item" src="images/${image.name}.jpg"
              />
         <div class="card-modal" data-modal-content>
              <img class="carousel-item" src="images/${image.name}.jpg"
              />                
              <button class="modal-close modal-exit">X</button>                              
          </div>         
            </a>
          </div>
      `;
  });

  return summerCarouselHTML;
}

function modalPopup() {
  let modals = document.querySelectorAll("[data-modal]");

  modals.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();

      let modal = document.getElementById("modal");
      modal.classList.add("open");

      let modalContent = document.getElementById("modalContent");

      if (trigger.querySelector("[data-modal-content]")) {
        modalContent.innerHTML = trigger.querySelector(
          "[data-modal-content]"
        ).innerHTML;
      } else {
        modalContent.innerHTML = "Unknown";
      }

      let exits = modal.querySelectorAll(".modal-exit");
      exits.forEach(function (exit) {
        exit.addEventListener("click", function (event) {
          event.preventDefault();
          modal.classList.remove("open");
        });
      });
    });
  });
}

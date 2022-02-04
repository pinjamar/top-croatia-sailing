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
    let catCarousel = document.getElementById("kitten-carousel");
    catCarousel.innerHTML = buildCarouselHTML(json.cats);

    return catCarousel;
  })

  .then((catCarousel) => {
    connectCarouselEvents(catCarousel);
    return catCarousel;
  })
  .then((catCarousel) => {
    startCarouselAutoplay(catCarousel);
  })

  .then(() => modalPopup());

/**
 * Hooks up carousel events. Should be called after carousel has finished building HTML.
 */
function connectCarouselEvents(catCarousel) {
  if (!catCarousel) {
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
      catCarousel.scrollWidth ==
      catCarousel.scrollLeft + catCarousel.clientWidth
    ) {
      catCarousel.scroll({
        left: 1,
        behavior: "smooth",
      });
    } else {
      catCarousel.scroll({
        left: catCarousel.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
  });

  prevButton.addEventListener("click", () => {
    if (catCarousel.scrollLeft === 0) {
      catCarousel.scroll({
        left: 999999,
        behavior: "smooth",
      });
    } else {
      catCarousel.scroll({
        left: catCarousel.scrollLeft - cardWidth,
        behavior: "smooth",
      });
    }
  });
}

/**
 * Starts carousel autoplay logic
 *
 * @param {*} catCarousel HTML element containing the cat carousel
 * @returns void
 */
function startCarouselAutoplay(catCarousel) {
  let shouldAutoplay = true;
  let nextButton = document.querySelector(".cat-carousel--button.button--next");
  let prevButton = document.querySelector(".cat-carousel--button.button--prev");

  if (!nextButton) {
    console.error("Unable to start autoplay, check if nextButton is present");
    return;
  }

  setInterval(() => {
    if (shouldAutoplay) {
      nextButton.click();
    }
  }, 2500);

  catCarousel.addEventListener("mouseover", () => {
    shouldAutoplay = false;
  });
  nextButton.addEventListener("mouseover", () => {
    shouldAutoplay = false;
  });
  prevButton.addEventListener("mouseover", () => {
    shouldAutoplay = false;
  });

  catCarousel.addEventListener("mouseleave", () => {
    shouldAutoplay = true;
  });
  nextButton.addEventListener("mouseleave", () => {
    shouldAutoplay = true;
  });
  prevButton.addEventListener("mouseleave", () => {
    shouldAutoplay = true;
  });
}

/**
 * Generates HTML required for cats carousel
 * @param {*} cats - array of cats
 * @returns HTML string for carousel
 */
function buildCarouselHTML(cats) {
  let catCarouselHTML = "";

  cats
    .sort((cat1, cat2) => {
      if (cat1.age < cat2.age) {
        return -1;
      } else if (cat1.age > cat2.age) {
        return 1;
      } else {
        return 0;
      }
    })
    .forEach((cat) => {
      catCarouselHTML += `
        <div class="slide-card" id="carousel-id-${cat.name}">
            <a data-modal
              ><img class="carousel-item" src="images/${cat.name}.jpg"
            />
            <h2>${cat.name.toUpperCase()}</h2>
  
            <div class="card-modal" data-modal-content>
                <h1>${cat.name}</h1>
                <p>Color: ${cat.color}</p>
                <P>Age: ${cat.age}</P>
                <button class="udomi-carusel-button" data-cat-name="${
                  cat.name
                }" data-carousel-button-id="carousel-button-id-${
        cat.name
      }" data-modal="modal-one">UDOMI</button>
                <button class="modal-close modal-exit">X</button>              
            </div>
            </a>
          </div>
      `;
    });

  return catCarouselHTML;
}

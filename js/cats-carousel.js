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
  });

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

function buildCarouselHTML(images) {
  let catCarouselHTML = "";

  images.forEach((image) => {
    catCarouselHTML += `
        <div class="slide-card" id="carousel-id-${image.name}">
            <a data-modal
              ><img class="carousel-item" src="images/${image.name}.jpg"            
            </a>
          </div>
      `;
  });

  return catCarouselHTML;
}

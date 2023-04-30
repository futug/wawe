(function () {
  const innerTop = document.querySelector(".header__inner-top");
  const innerBottom = document.querySelector(".header__inner-bottom");
  const header = document.querySelector(".header");
  window.onscroll = () => {
    if (window.pageYOffset > 30) {
      // console.log("zdarova zaebal");
      innerTop.classList.add("dissapear");
      innerBottom.classList.add("dissapear");
    } else {
      innerTop.classList.remove("dissapear");
      innerBottom.classList.remove("dissapear");
    }
  };
})();

const btn = document.querySelector(".gallery__show-more-btn"),
  cards = Array.from(document.querySelectorAll(".gallery__item"));

function openCatalog() {
  btn.addEventListener("click", () => {
    cards.forEach((item) => item.classList.remove("hidden"));
    btn.classList.add("hidden");
  });
}
function responseFirst() {
  if (window.innerWidth > 1174) {
    btn.classList.add("hidden");
    cards.forEach((item, index) => {
      item.classList.add("hidden");
      if (index <= 5) {
        item.classList.remove("hidden");
      } else if (index > 5) {
        btn.classList.remove("hidden");
      }
      openCatalog();
    });
  }
}
responseFirst();

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 10,
  },
});

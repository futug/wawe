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
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 10,
  },
});

document.querySelector(".contacts__form-btn").addEventListener("click", () => {
  document.querySelector(".contacts__popup").classList.remove("hidden");
  document.querySelector(".contacts__popup").addEventListener("click", () => {
    document.querySelector(".contacts__popup").classList.add("hidden");
  });
});

const header = document.querySelector(".header");
const headerBottom = header.getBoundingClientRect().bottom + window.scrollY;

window.addEventListener("scroll", function () {
  if (window.scrollY >= headerBottom) {
    document.querySelector(".upword").classList.remove("dissapear");
  } else if (window.scrollY <= headerBottom) {
    document.querySelector(".upword").classList.add("dissapear");
  }
});

const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const blockID = anchor.getAttribute("href");
    document.querySelector("" + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

const gallery = document.querySelector(".gallery");
const galleryBottom = gallery.getBoundingClientRect().bottom + window.scrollY;
window.addEventListener("scroll", function () {
  if (window.scrollY >= galleryBottom) {
    const counterItems = document.querySelectorAll(".video__achievments-score");

    function animateValue(item, start, end, duration) {
      let range = end - start;
      let current = start;
      let increment = end > start ? 1 : -1;
      let stepTime = Math.abs(Math.floor(duration / range));
      let timer = setInterval(() => {
        current += increment;
        item.textContent = current;
        if (current === end) {
          clearInterval(timer);
        }
      }, stepTime);
    }

    function animateCounters() {
      // Проходим по каждому элементу счетчика
      counterItems.forEach((counterEl) => {
        const target = parseInt(counterEl.dataset.target, 10);
        let count = parseInt(counterEl.textContent, 10);

        // Запускаем анимацию только если значение меньше цели
        if (count < target) {
          animateValue(counterEl, count, target, 1000);
        }
      });
    }

    animateCounters();
  }
});

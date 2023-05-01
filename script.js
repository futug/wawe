//!!FADE__HEADER!!STARTS//
(function () {
  const innerTop = document.querySelector(".header__inner-top");
  const innerBottom = document.querySelector(".header__inner-bottom");
  const header = document.querySelector(".header");
  window.onscroll = () => {
    if (window.pageYOffset > 30) {
      innerTop.classList.add("dissapear");
      innerBottom.classList.add("dissapear");
    } else {
      innerTop.classList.remove("dissapear");
      innerBottom.classList.remove("dissapear");
    }
  };
})();
//!!FADE__HEADER ENDS!!//
//!!GALLERY__SHOWMORE STARTS!!//
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
//!!GALLERY__SHOWMORE ENDS!!//
//!!ФИЛЬТРАЦИЯ ГАЛЛЕРЕИ НАЧАЛО!!//

// const filterButtonsList = document.querySelector(".gallery__filter-buttons"),
//   galleryItems = document.querySelectorAll(".gallery__item");
// const filterButtons = document.querySelectorAll(".gallery__filter-btn");
// function filter() {
//   filterButtonsList.addEventListener("click", (e) => {
//     const targetId = e.target.dataset.id;
//     const target = e.target;
//     if (target.classList.contains("gallery__filter-btn")) {
//       filterButtons.forEach((listItem) => listItem.classList.remove("gallery__filter-btn--active"));
//       target.classList.add("gallery__filter-btn--active");
//     }

//     console.log(targetId);
//     switch (targetId) {
//       case "all":
//         getItems("gallery__item");
//         break;
//       case "tourists":
//         getItems(targetId);
//         break;
//       case "nature":
//         getItems(targetId);
//         break;
//       case "profi":
//         getItems(targetId);
//         break;
//     }
//   });
// }
// filter();
// function getItems(className) {
//   galleryItems.forEach((item) => {
//     if (item.classList.contains(className)) {
//       item.style.display = "block";
//     } else {
//       item.style.display = "none";
//     }
//   });
// }

const filterButtonsList = document.querySelector(".gallery__filter-buttons");
const galleryItems = document.querySelectorAll(".gallery__item");

filterButtonsList.addEventListener("click", (event) => {
  const target = event.target.closest(".gallery__filter-btn");
  if (!target) return;

  const targetId = target.dataset.id;

  filterButtonsList.querySelectorAll(".gallery__filter-btn").forEach((button) => {
    button.classList.remove("gallery__filter-btn--active");
  });

  target.classList.add("gallery__filter-btn--active");

  galleryItems.forEach((item) => {
    item.style.display = "none";
    if (targetId === "all" || item.classList.contains(targetId)) {
      item.style.display = "block";
    }
  });
});

//!!GALLERY FILTER ENDS!!//
//!!GALLERY LIGHTBOX STARTS!!//
const closeButton = document.querySelector(".gallery__lightbox-close");
const lightBoxWrapper = document.querySelector(".gallery__lightbox");
const lightBoxItem = document.querySelector(".gallery__lightbox-item");

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    lightBoxWrapper.classList.remove("hidden");
    lightBoxItem.classList.remove("closed");
    lightBoxItem.srcset = item.querySelector(".gallery__item-pic").getAttribute("srcset");

    const nextItem = galleryItems[index + 1];
    if (nextItem) {
      lightBoxItem.addEventListener("click", () => {
        lightBoxItem.classList.add("closed");
        setTimeout(() => {
          lightBoxItem.src = "";
          lightBoxItem.classList.remove("closed");
          lightBoxItem.removeEventListener("click");
          lightBoxItem.srcset = nextItem.querySelector(".gallery__item-pic").getAttribute("srcset");
        }, 500);
      });
    }
  });
});

closeButton.addEventListener("click", () => {
  lightBoxItem.classList.add("closed");
  setTimeout(() => {
    lightBoxWrapper.classList.add("hidden");
    lightBoxItem.src = "";
  }, 800);
});

//!!GALLERY LIGHTBOX ENDS!!//

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

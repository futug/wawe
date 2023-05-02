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

let currentIndex = -1; // начальное значение индекса

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    lightBoxWrapper.classList.remove("hidden");
    lightBoxItem.classList.remove("closed");
    lightBoxItem.srcset = item.querySelector(".gallery__item-pic").getAttribute("srcset");
    currentIndex = index; // сохраняем текущий индекс
  });
});

lightBoxItem.addEventListener("click", () => {
  lightBoxItem.classList.add("closed");
  setTimeout(() => {
    lightBoxItem.src = "";
    currentIndex++; // увеличиваем индекс при повторном клике
    if (currentIndex < galleryItems.length) {
      // если индекс не превышает длину массива
      lightBoxItem.srcset = galleryItems[currentIndex].querySelector(".gallery__item-pic").getAttribute("srcset");
      lightBoxItem.classList.remove("closed");
    } else {
      // если превышает, закрываем lightBox
      lightBoxWrapper.classList.add("hidden");
    }
  }, 500);
});

lightBoxWrapper.addEventListener("click", (event) => {
  if (!lightBoxItem.contains(event.target)) {
    lightBoxItem.classList.add("closed");
    setTimeout(() => {
      lightBoxWrapper.classList.add("hidden");
      lightBoxItem.src = "";
      currentIndex = -1;
    }, 800);
  }
});

lightBoxWrapper.addEventListener("click", (event) => {
  if (!lightBoxItem.contains(event.target)) {
    lightBoxItem.classList.add("closed");
    setTimeout(() => {
      lightBoxWrapper.classList.add("hidden");
      lightBoxItem.src = "";
    }, 800);
  }
});
//перелистывание стрелками//
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    currentIndex--;
    if (currentIndex >= 0) {
      lightBoxItem.srcset = galleryItems[currentIndex].querySelector(".gallery__item-pic").getAttribute("srcset");
      lightBoxItem.classList.remove("closed");
    } else {
      currentIndex = 0;
    }
  } else if (event.code === "ArrowRight") {
    currentIndex++;
    if (currentIndex < galleryItems.length) {
      lightBoxItem.srcset = galleryItems[currentIndex].querySelector(".gallery__item-pic").getAttribute("srcset");
      lightBoxItem.classList.remove("closed");
    } else {
      currentIndex = galleryItems.length - 1;
    }
  }
});
//перелистывание стрелками конец//

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

//!!FORM VALIDATION STARTS!!//

const form = document.querySelector(".contacts__form");
const nameInput = document.querySelector(".contacts__form-name");
const telInput = document.querySelector(".contacts__form-tel");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formIsValid = true;
  if (!/^[a-zA-Zа-яА-Я\s]+$/.test(nameInput.value)) {
    nameInput.style.borderBottom = "1px solid #ff5454";
    nameInput.style.color = "#ff5454";
    nameInput.nextElementSibling.classList.remove("hidden");
    nameInput.classList.add("error-anim");
    formIsValid = false;
  } else {
    nameInput.classList.remove("error-anim");
    nameInput.style.color = "";
    nameInput.style.borderBottom = "";
    nameInput.nextElementSibling.classList.add("hidden");
  }
  if (!/^[+0-9]{10,}$/.test(telInput.value)) {
    telInput.classList.add("error-anim");
    telInput.style.borderBottom = "1px solid #ff5454";
    telInput.style.color = "#ff5454";
    telInput.nextElementSibling.classList.remove("hidden");
    formIsValid = false;
  } else {
    telInput.classList.remove("error-anim");
    telInput.style.color = "";
    telInput.style.borderBottom = "";
    telInput.nextElementSibling.classList.add("hidden");
  }
  if (formIsValid) {
    document.querySelector(".contacts__form-btn").addEventListener("click", () => {
      document.querySelector(".contacts__popup").classList.remove("hidden");
      document.querySelector(".contacts__popup").addEventListener("click", () => {
        document.querySelector(".contacts__popup").classList.add("hidden");
      });
    });
  }
});
//!!FORM VALIDATION ENDS!!//

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

//!!VIDEO FRAME STARTS!!//

const videoCover = document.querySelector(".video__cover");
const videoButton = document.querySelector(".video__play-button");
const videoWrapper = document.querySelector(".video__wrapper");

videoButton.addEventListener("click", () => {
  let iFrame = createIframe();
  videoButton.remove();
  videoCover.remove();
  videoWrapper.appendChild(iFrame);
});

function createIframe() {
  let iFrame = document.createElement("iframe");
  iFrame.setAttribute("allowfullscreen", "");
  iFrame.setAttribute("src", "https://www.youtube.com/embed/TeU3o12U2hM?autoplay=1");
  iFrame.setAttribute("allow", "autoplay");
  iFrame.classList.add("video__cover");
  return iFrame;
}

//!!VIDEO FRAME ENDS!!//

let map;
function initMap() {
  const centerPosition = { lat: 29.025885, lng: -13.602853 };
  const mainPosition = { lat: 29.12960607069736, lng: -13.60995008872115 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: centerPosition,
    zoom: 11,
    styles: [
      {
        featureType: "all",
        elementType: "geometry.fill",
        stylers: [
          {
            weight: "2.00",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#9c9c9c",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100,
          },
          {
            lightness: 45,
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#eeeeee",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#7b7b7b",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#46bcec",
          },
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c8d7d4",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#070707",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
    ],
    disableDefaultUI: true,
  });
  const svgMarker = {
    path: "M28.3962 70C28.3962 70 56.7925 44.079 56.7925 28.3962C56.7925 12.7134 44.079 0 28.3962 0C12.7134 0 0 12.7134 0 28.3962C0 44.079 28.3962 70 28.3962 70Z",
    fillColor: "#00B2A0",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 1,
    anchor: new google.maps.Point(30, 60),
  };
  new google.maps.Marker({
    position: mainPosition,
    map,
    title: "Hello World!",
    icon: svgMarker,
  });
}

window.initMap = initMap;

///!!!BURGER MENU!!!///

const menuBtn = document.querySelector(".header__burger"),
  menu = document.querySelector(".navigation");
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("navigation--active");
});

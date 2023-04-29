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

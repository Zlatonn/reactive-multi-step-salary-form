import { atom } from "https://unpkg.com/nanostores";
let pagesCount = atom(0);

document.querySelectorAll(".step-box").forEach((e, i) => {
  e.onclick = () => {
    pagesCount.set(i);
  };
});

document.getElementById("prev-Btn").onclick = () => {
  pagesCount.set(pagesCount.get() - 1);
};

document.getElementById("next-Btn").onclick = () => {
  pagesCount.set(pagesCount.get() + 1);
};

function updatePage() {
  const translateX = -pagesCount.get() * 100;
  document.querySelector(".card-container").style.transform = `translateX(${translateX}%)`;
}

function updateStep() {
  document.querySelectorAll(".step-box").forEach((e, i) => {
    if (pagesCount.get() === i) {
      e.classList.add("active");
      e.classList.remove("complete");
    } else if (pagesCount.get() > i) {
      e.classList.remove("active");
      e.classList.add("complete");
    } else {
      e.classList.remove("active");
      e.classList.remove("complete");
    }
  });
}

function updateButton() {
  if (pagesCount.get() === 0) {
    document.getElementById("prev-Btn").style.visibility = "hidden";
    document.getElementById("next-Btn").style.visibility = "visible";
  } else if (pagesCount.get() === 2) {
    document.getElementById("prev-Btn").style.visibility = "hidden";
    document.getElementById("next-Btn").style.visibility = "hidden";
  } else {
    document.getElementById("prev-Btn").style.visibility = "visible";
    document.getElementById("next-Btn").style.visibility = "visible";
  }
}

// Page Reactive
pagesCount.subscribe(updatePage);
pagesCount.subscribe(updateStep);
pagesCount.subscribe(updateButton);

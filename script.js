import { atom } from "https://unpkg.com/nanostores";

// -------------------- Pages Management --------------------
let pagesCount = atom(0);

/** Set pages states */
document.querySelectorAll(".step-box").forEach((e, i) => {
  e.onclick = () => {
    pagesCount.set(i);
  };
});

document.getElementById("prev-btn").onclick = () => {
  pagesCount.set(pagesCount.get() - 1);
};

document.getElementById("next-btn").onclick = () => {
  pagesCount.set(pagesCount.get() + 1);
};

/** Pages Reactivity */
pagesCount.subscribe(updatePage);
pagesCount.subscribe(updateStep);
pagesCount.subscribe(updateButton);

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
  if (pagesCount.get()) {
    document.getElementById("prev-btn").disabled = false;
  } else {
    document.getElementById("prev-btn").disabled = true;
  }

  if (pagesCount.get() < 2) {
    document.getElementById("next-btn").disabled = false;
  } else {
    document.getElementById("next-btn").disabled = true;
  }
}

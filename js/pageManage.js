// Import nano stores
import { atom } from "https://unpkg.com/nanostores";

// Import variable
import { pageStores } from "./initialProcess.js";

// Create variable
export let pagesCount = atom(0);

export function setupPageCount() {
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
}

export function updatePage() {
  const count = pagesCount.get();
  const translateX = -count * 100;
  document.querySelector(".card-container").style.transform = `translateX(${translateX}%)`;
}

export function updateStep() {
  const count = pagesCount.get();
  document.querySelectorAll(".step-box").forEach((e, i) => {
    if (count === i) {
      e.classList.add("active");
      e.classList.remove("complete");
    } else if (count > i) {
      e.classList.remove("active");
      e.classList.add("complete");
    } else {
      e.classList.remove("active");
      e.classList.remove("complete");
    }
  });
}

export function updateButton() {
  const count = pagesCount.get();
  if (count) {
    document.getElementById("prev-btn").disabled = false;
  } else {
    document.getElementById("prev-btn").disabled = true;
  }

  if (count < pageStores.length - 1) {
    document.getElementById("next-btn").disabled = false;
  } else {
    document.getElementById("next-btn").disabled = true;
  }
}

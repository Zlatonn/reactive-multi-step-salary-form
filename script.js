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
  if (pagesCount.get()) {
    document.getElementById("prev-Btn").disabled = false;
  } else {
    document.getElementById("prev-Btn").disabled = true;    
  }
  
  if (pagesCount.get() < 2) {
    document.getElementById("next-Btn").disabled = false;
  } else {
    document.getElementById("next-Btn").disabled = true;
  }
}

// Page Reactive
pagesCount.subscribe(updatePage);
pagesCount.subscribe(updateStep);
pagesCount.subscribe(updateButton);

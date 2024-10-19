import { atom } from "https://unpkg.com/nanostores";

// -------------------- Initial Process (create pages) --------------------

let pageStores = [
  {
    name: "Income",
    leftDetail: ["Salary", "Bonus", "Investment", "Other"],
    rightDetail: 2
  },
  {
    name: "Expenses",
    leftDetail: ["Housing", "Food", "Transportation", "Heathcare", "Education", "Other"],
    rightDetail: 2
  },
  {
    name: "Summary",
    leftDetail: 3,
    rightDetail: 3
  },
];

createBullet();
createCard();
createHandlerButton();

function createBullet() {
  const stepContainer = document.querySelector(".step-container");

  pageStores.forEach((e, i) => {
    const stepBox = document.createElement("div");
    stepBox.classList.add("step-box");

    const stepNum = document.createElement("div");
    stepNum.classList.add("step-num");

    const stepDetail = document.createElement("div");
    stepDetail.classList.add("step-detail");

    stepContainer.appendChild(stepBox);

    stepBox.appendChild(stepNum);
    stepNum.innerHTML = i + 1;

    stepBox.appendChild(stepDetail);
    stepDetail.innerHTML = e.name;

    if (i < pageStores.length - 1) {
      const stepLine = document.createElement("div");
      stepLine.classList.add("step-line");
      stepContainer.appendChild(stepLine);
    }
  });
}

function createCard() {
  const cardContainer = document.querySelector(".card-container");

  pageStores.forEach(e => {
    const cardBox = document.createElement("div");
    cardBox.classList.add("card-box");

    const cardTitle = document.createElement("p");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = e.name;

    const cardDetail = document.createElement("div");
    cardDetail.classList.add("card-detail");

    const leftBox = document.createElement("div");
    leftBox.classList.add("left-box");

    const rightBox = document.createElement("div");
    rightBox.classList.add("right-box");

    cardContainer.appendChild(cardBox);

    cardBox.appendChild(cardTitle);
    cardBox.appendChild(cardDetail);

    cardDetail.appendChild(leftBox);
    cardDetail.appendChild(rightBox);

    // Insert Detail Left Box
    if (Array.isArray(e.leftDetail)) {
      e.leftDetail.forEach((d) => {
        const subDetailLeft = document.createElement("div");
        subDetailLeft.classList.add("sub-detail");

        const text = document.createElement("p");
        text.innerHTML = `${d} <span>/month</span>`;

        const input = document.createElement("input");
        input.type = "number";
        input.value = 0;
        input.min = "0";
        input.id = `${d.toLowerCase()}-input`;

        subDetailLeft.appendChild(text);
        subDetailLeft.appendChild(input);

        leftBox.appendChild(subDetailLeft);
      });
    } else {
      for (let count = 0; count < e.leftDetail; count++) {
        const subDetailLeft = document.createElement("div");
        subDetailLeft.classList.add("sub-detail");

        const text = document.createElement("p");
        text.innerHTML = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, quia.`;
        text.id = `${e.name.toLowerCase()}-left-text-${count + 1}`;
          
        subDetailLeft.appendChild(text);
        leftBox.appendChild(subDetailLeft);
      }
    }

    // Insert Detail Right Box
    for (let count = 0; count < e.rightDetail; count++) {
      const subDetailRight = document.createElement("div");
      subDetailRight.classList.add("sub-detail");

      const text = document.createElement("p");
      text.innerHTML = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, quia.`;
      text.id = `${e.name.toLowerCase()}-right-text-${count + 1}`;

      subDetailRight.appendChild(text);
      rightBox.appendChild(subDetailRight);
    }
  });
}

function createHandlerButton() {
  const bodyBox = document.querySelector(".body-box");

  const handler = document.createElement("div");
  handler.classList.add("handler");

  const prevBtn = document.createElement("button");
  prevBtn.type = "botton";
  prevBtn.id = "prev-btn";
  prevBtn.innerHTML = `<i class="ri-arrow-left-s-fill"></i> Prev`;

  const nextBtn = document.createElement("button");
  nextBtn.type = "botton";
  nextBtn.id = "next-btn";
  nextBtn.innerHTML = `Next <i class="ri-arrow-right-s-fill"></i>`;

  handler.appendChild(prevBtn);
  handler.appendChild(nextBtn);

  bodyBox.appendChild(handler);
}

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

  if (pagesCount.get() < pageStores.length - 1) {
    document.getElementById("next-btn").disabled = false;
  } else {
    document.getElementById("next-btn").disabled = true;
  }
}

// -------------------- Income Section --------------------
let salaryInput = atom(0);
let bonusInput = atom(0);
let investInput = atom(0);
let otherInput = atom(0);
let sumIncomeMonth = atom(0);
let sumIncomeYear = atom(0);

/** Binding */
// Salary Input
document.getElementById("salary-input").onchange = (e) => {
  salaryInput.set(Number(e.target.value));
};

salaryInput.subscribe((value) => {
  document.getElementById("salary-input").value = value;
});

// Bonus Input
document.getElementById("bonus-input").onchange = (e) => {
  bonusInput.set(Number(e.target.value));
};

bonusInput.subscribe((value) => {
  document.getElementById("bonus-input").value = value;
});

// Investment Input
document.getElementById("investment-input").onchange = (e) => {
  investInput.set(Number(e.target.value));
};

investInput.subscribe((value) => {
  document.getElementById("investment-input").value = value;
});

// Other Input
document.getElementById("other-input").onchange = (e) => {
  otherInput.set(Number(e.target.value));
};

otherInput.subscribe((value) => {
  document.getElementById("other-input").value = value;
});

/** Income Reactivity */
salaryInput.subscribe(sumIncome);
bonusInput.subscribe(sumIncome);
investInput.subscribe(sumIncome);
otherInput.subscribe(sumIncome);

function sumIncome() {
  const totalMonth = salaryInput.get() + bonusInput.get() + investInput.get() + otherInput.get();
  sumIncomeMonth.set(totalMonth);
  console.log(`totalMonth: ${sumIncomeMonth.get()}`);

  const totalYear = sumIncomeMonth.get() * 12;
  sumIncomeYear.set(totalYear);
  console.log(`totalYear: ${sumIncomeYear.get()}`);
}

function displayIncome() {
  
}

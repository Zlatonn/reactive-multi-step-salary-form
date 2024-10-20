import { atom } from "https://unpkg.com/nanostores";

// -------------------- Initial Process (create pages) --------------------

let pageStores = [
  {
    name: "Income",
    leftDetail: ["Salary", "Bonus", "Investment", "Other"],
    rightDetail: 2,
  },
  {
    name: "Expenses",
    leftDetail: ["Housing", "Food", "Transportation", "Healthcare", "Education", "Other"],
    rightDetail: 2,
  },
  {
    name: "Summary",
    leftDetail: 3,
    rightDetail: 3,
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

  pageStores.forEach((e) => {
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
        input.id = `${e.name.toLowerCase()}-${d.toLowerCase()}-input`;

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
let salaryIncome = atom(0);
let bonusIncome = atom(0);
let investIncome = atom(0);
let otherIncome = atom(0);

let sumIncomeMonth = atom(0);
let sumIncomeYear = atom(0);

/** Binding */
// Salary Income
document.getElementById("income-salary-input").onchange = (e) => {
  salaryIncome.set(Number(e.target.value));
};

salaryIncome.subscribe((value) => {
  document.getElementById("income-salary-input").value = value;
});

// Bonus Income
document.getElementById("income-bonus-input").onchange = (e) => {
  bonusIncome.set(Number(e.target.value));
};

bonusIncome.subscribe((value) => {
  document.getElementById("income-bonus-input").value = value;
});

// Investment Income
document.getElementById("income-investment-input").onchange = (e) => {
  investIncome.set(Number(e.target.value));
};

investIncome.subscribe((value) => {
  document.getElementById("income-investment-input").value = value;
});

// Other Income
document.getElementById("income-other-input").onchange = (e) => {
  otherIncome.set(Number(e.target.value));
};

otherIncome.subscribe((value) => {
  document.getElementById("income-other-input").value = value;
});

/** Income Reactivity */
salaryIncome.subscribe(sumIncome);
bonusIncome.subscribe(sumIncome);
investIncome.subscribe(sumIncome);
otherIncome.subscribe(sumIncome);

sumIncomeMonth.subscribe(displayIncome);
function sumIncome() {
  const totalMonth = salaryIncome.get() + bonusIncome.get() + investIncome.get() + otherIncome.get();
  sumIncomeMonth.set(totalMonth);

  const totalYear = sumIncomeMonth.get() * 12;
  sumIncomeYear.set(totalYear);
}

function displayIncome() {
  const text1 = document.getElementById("income-right-text-1");
  text1.innerHTML = `<i>" You have monthly income is <span style ="color:#5bbb72; font-size: 1rem; font-style:bolder;">${sumIncomeMonth.get()}</span> bath. "</i>`;

  const text2 = document.getElementById("income-right-text-2");
  text2.innerHTML = `<i>" Your total annual income is <span style ="color:#5bbb72; font-size: 1rem; font-style:bolder;">${sumIncomeYear.get()}</span> bath. "</i>`;
}

// -------------------- Expenses Section  --------------------
let housingExpenses = atom(0);
let foodExpenses = atom(0);
let transportationExpenses = atom(0);
let healthcareExpenses = atom(0);
let educationExpenses = atom(0);
let otherExpenses = atom(0);

let sumExpensesMonth = atom(0);
let sumExpensesYear = atom(0);

/** Binding */
// Housing Expenses
document.getElementById("expenses-housing-input").onchange = (e) => {
  housingExpenses.set(Number(e.target.value));
};

housingExpenses.subscribe((value) => {
  document.getElementById("expenses-housing-input").value = value;
});

// Food Expenses
document.getElementById("expenses-food-input").onchange = (e) => {
  foodExpenses.set(Number(e.target.value));
};

foodExpenses.subscribe((value) => {
  document.getElementById("expenses-food-input").value = value;
});

// Transportation Expenses
document.getElementById("expenses-transportation-input").onchange = (e) => {
  transportationExpenses.set(Number(e.target.value));
};

transportationExpenses.subscribe((value) => {
  document.getElementById("expenses-transportation-input").value = value;
});

// Healthcare Expenses
document.getElementById("expenses-healthcare-input").onchange = (e) => {
  healthcareExpenses.set(Number(e.target.value));
};

healthcareExpenses.subscribe((value) => {
  document.getElementById("expenses-healthcare-input").value = value;
});

// Education Expenses
document.getElementById("expenses-education-input").onchange = (e) => {
  educationExpenses.set(Number(e.target.value));
};

educationExpenses.subscribe((value) => {
  document.getElementById("expenses-education-input").value = value;
});

// Other Expenses
document.getElementById("expenses-other-input").onchange = (e) => {
otherExpenses.set(Number(e.target.value));
};
otherExpenses.subscribe((value) => {
  document.getElementById("expenses-other-input").value = value;
});

/** Expense Reactivity */

housingExpenses.subscribe(sumExpenses);
foodExpenses.subscribe(sumExpenses);
transportationExpenses.subscribe(sumExpenses);
healthcareExpenses.subscribe(sumExpenses);
educationExpenses.subscribe(sumExpenses);
otherExpenses.subscribe(sumExpenses);

sumExpensesMonth.subscribe(displayExpenses);
function sumExpenses() {
  const totalMonth = housingExpenses.get() + foodExpenses.get() + transportationExpenses.get() + healthcareExpenses.get() + educationExpenses.get() + otherExpenses.get();
  sumExpensesMonth.set(totalMonth);

  const totalYear = sumExpensesMonth.get() * 12;
  sumExpensesYear.set(totalYear);
}

function displayExpenses() {
  const text1 = document.getElementById("expenses-right-text-1");
  text1.innerHTML = `<i>" You have monthly expenses is <span style ="color:#D35400; font-size: 1rem; font-style:bolder;">${sumExpensesMonth.get()}</span> bath. "</i>`;

  const text2 = document.getElementById("expenses-right-text-2");
  text2.innerHTML = `<i>" Your total annual expenses is <span style ="color:#D35400; font-size: 1rem; font-style:bolder;">${sumExpensesYear.get()}</span> bath. "</i>`;
}
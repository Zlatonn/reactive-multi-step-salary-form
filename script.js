import { atom } from "https://unpkg.com/nanostores";

// ==================== Initial Process ====================

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
    leftDetail: 2,
    rightDetail: 2,
  },
];

createBullet();
createCard();
createHandler();

/** Create Bullet */
function createBullet() {
  const stepContainer = document.querySelector(".step-container");

  pageStores.forEach((e, i) => {
    const stepBox = createStepBox(i, e.name);
    stepContainer.appendChild(stepBox);

    if (i < pageStores.length - 1) {
      const stepLine = document.createElement("div");
      stepLine.classList.add("step-line");
      stepContainer.appendChild(stepLine);
    }
  });
}

function createStepBox(i, name) {
  const stepBox = document.createElement("div");
  stepBox.classList.add("step-box");

  const stepNum = document.createElement("div");
  stepNum.classList.add("step-num");
  stepNum.innerHTML = i + 1;

  const stepDetail = document.createElement("div");
  stepDetail.classList.add("step-detail");
  stepDetail.innerHTML = name;

  stepBox.append(stepNum, stepDetail);

  return stepBox;
}

/** Create Card */
function createCard() {
  const cardContainer = document.querySelector(".card-container");

  pageStores.forEach((e) => {
    const cardBox = createCardBox(e);
    cardContainer.appendChild(cardBox);
  });
}

function createCardBox(e) {
  const cardBox = document.createElement("div");
  cardBox.classList.add("card-box");

  const cardTitle = createCardTitle(e.name);
  const cardDetail = createCardDetail(e);

  cardBox.append(cardTitle, cardDetail);

  return cardBox;
}

function createCardTitle(name) {
  const cardTitle = document.createElement("p");
  cardTitle.classList.add("card-title");
  cardTitle.innerHTML = name;

  return cardTitle;
}

function createCardDetail(e) {
  const cardDetail = document.createElement("div");
  cardDetail.classList.add("card-detail");

  const leftBox = createDetailBox(e.leftDetail, "left", e.name);
  const rightBox = createDetailBox(e.rightDetail, "right", e.name);

  cardDetail.append(leftBox, rightBox);
  return cardDetail;
}

function createDetailBox(detailData, side, name) {
  const box = document.createElement("div");
  box.classList.add(`${side}-box`);

  if (Array.isArray(detailData)) {
    detailData.forEach((detail) => box.appendChild(createSubDetail(detail, side, name)));
  } else {
    for (let count = 0; count < detailData; count++) {
      box.appendChild(createSubDetail("", side, name, count));
    }
  }

  return box;
}

function createSubDetail(text, side, name, count = "") {
  const subDetail = document.createElement("div");
  subDetail.classList.add("sub-detail");

  const pText = document.createElement("p");
  const input = text ? createInputField(name, text) : "";

  pText.innerHTML = text ? `${text} <span style="color: rgb(94, 146, 242);">/month</span>` : ``;
  pText.id = text ? `` : `${name.toLowerCase()}-${side}-text-${count + 1}`;
  subDetail.appendChild(pText);

  if (input) {
    subDetail.appendChild(input);
  }

  return subDetail;
}

function createInputField(name, text) {
  const input = document.createElement("input");
  input.type = "number";
  input.value = 0;
  input.min = "0";
  input.id = `${name.toLowerCase()}-${text.toLowerCase()}-input`;

  return input;
}

/** Create Handle */
function createHandler() {
  const bodyBox = document.querySelector(".body-box");

  const handler = document.createElement("div");
  handler.classList.add("handler");
  bodyBox.appendChild(handler);

  const prevBtn = createHandlerButton("prev");
  const nextBtn = createHandlerButton("next");
  const clearBtn = createHandlerButton("clear");

  handler.append(prevBtn, nextBtn, clearBtn);
}

function createHandlerButton(typeBtn) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = `${typeBtn}-btn`;

  switch (typeBtn) {
    case "prev":
      btn.innerHTML = `<i class="ri-arrow-left-s-fill"></i> Prev`;
      break;
    case "next":
      btn.innerHTML = `Next <i class="ri-arrow-right-s-fill"></i>`;
      break;
    case "clear":
      btn.innerHTML = `Clear`;
      break;
  }

  return btn;
}

// ==================== Pages Management ====================
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

// ==================== Income Section ====================
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

  const totalYear = totalMonth * 12;
  sumIncomeYear.set(totalYear);
}

function displayIncome() {
  const text1 = document.getElementById("income-right-text-1");
  text1.innerHTML = `- monthly income is <b><span style ="color:#5bbb72; font-size: 1rem; font-style:bolder;">${sumIncomeMonth
    .get()
    .toLocaleString()}</span></b> ฿. `;

  const text2 = document.getElementById("income-right-text-2");
  text2.innerHTML = `- annual income is <b><span style ="color:#5bbb72; font-size: 1rem; font-style:bolder;">${sumIncomeYear
    .get()
    .toLocaleString()}</span></b> ฿.`;
}

// ==================== Expenses Section  ====================
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
  const totalMonth =
    housingExpenses.get() +
    foodExpenses.get() +
    transportationExpenses.get() +
    healthcareExpenses.get() +
    educationExpenses.get() +
    otherExpenses.get();
  sumExpensesMonth.set(totalMonth);

  const totalYear = totalMonth * 12;
  sumExpensesYear.set(totalYear);
}

function displayExpenses() {
  const text1 = document.getElementById("expenses-right-text-1");
  text1.innerHTML = `- monthly expenses is <b><span style ="color:#D35400; font-size: 1rem;">${sumExpensesMonth
    .get()
    .toLocaleString()}</span></b> ฿.</i>`;

  const text2 = document.getElementById("expenses-right-text-2");
  text2.innerHTML = `- annual expenses is <b><span style ="color:#D35400; font-size: 1rem;">${sumExpensesYear
    .get()
    .toLocaleString()}</span></b> ฿.`;
}

// ==================== Summary Section  ====================
let annualProfit = atom(0);

sumIncomeYear.listen(calAnnualProfit);
sumExpensesYear.listen(calAnnualProfit);

annualProfit.listen(displaySummary);

function calAnnualProfit() {
  annualProfit.set(sumIncomeYear.get() - sumExpensesYear.get());
}

function displaySummary() {
  const textSummary = document.getElementById("summary-left-text-1");
  textSummary.innerHTML = `
  <i>" You earn a <b>total income of ${sumIncomeYear
    .get()
    .toLocaleString()} bath</b> per year, with an <b><span style="color: rgb(94, 146, 242);">annual profit of ${annualProfit
    .get()
    .toLocaleString()} bath </span></b>remaining at the end of each year. "</i>`;

  const textGroups = document.getElementById("summary-left-text-2");
  if (sumIncomeYear.get() < 100000) {
    textGroups.innerHTML = `<i>" You're <b>Bottom 20%</b>: This group of the population has an average annual income of <b>less than 100,000</b> baht.</i> "`;
  } else if (sumIncomeYear.get() >= 100000 && sumIncomeYear.get() < 200000) {
    textGroups.innerHTML = `<i>" You're <b>Second 20%</b>: This group of the population has an average annual income of <b>100,000 - 200,000</b> baht.</i> "`;
  } else if (sumIncomeYear.get() >= 200000 && sumIncomeYear.get() < 400000) {
    textGroups.innerHTML = `<i>" You're <b>Middle 20%</b>: This group of the population has an average annual income of <b>200,000 - 400,000</b> baht. "`;
  } else if (sumIncomeYear.get() >= 400000 && sumIncomeYear.get() < 800000) {
    textGroups.innerHTML = `<i>" You're <b>Fourth 20%</b>: This group of the population has an average annual income of <b>400,000 - 800,000</b> baht.</i> "`;
  } else if (sumIncomeYear.get() >= 800000) {
    textGroups.innerHTML = `<i>" You're <b>Top 20%</b>: This group of the population has an average annual income of more than <b>800,000 baht.</b></i> "`;
  } else {
    textGroups.innerHTML = ``;
  }

  const textIncomeCashflow = document.getElementById("summary-right-text-1");
  textIncomeCashflow.innerHTML = `
  <span style="color: #5bbb72;">- income cash flow /month: <b>${sumIncomeMonth.get().toLocaleString()}</b> ฿.
  <br>- income cash flow /year: <b>${sumIncomeYear.get().toLocaleString()}</b> ฿.</span>`;

  const textExpensesCashflow = document.getElementById("summary-right-text-2");
  textExpensesCashflow.innerHTML = `
  <span style="color: #D35400;">- expenses cash flow /month: <b>${sumExpensesMonth.get().toLocaleString()}</b> ฿.
  <br>- expenses cash flow /year: <b>${sumExpensesYear.get().toLocaleString()}</b> ฿.</span>`;
}

// ==================== Data Management  ====================
let inputValue = {
  income: [0, 0, 0, 0],
  expenses: [0, 0, 0, 0, 0, 0],
};

/** Update data */
loadLocalStorage();

function loadLocalStorage() {
  const storedData = localStorage.getItem("inputValue");
  if (storedData) {
    inputValue = JSON.parse(storedData);
    updateData();
  }
}

function updateData() {
  // Update income
  salaryIncome.set(inputValue.income[0]);
  bonusIncome.set(inputValue.income[1]);
  investIncome.set(inputValue.income[2]);
  otherIncome.set(inputValue.income[3]);

  // Update expenses
  housingExpenses.set(inputValue.expenses[0]);
  foodExpenses.set(inputValue.expenses[1]);
  transportationExpenses.set(inputValue.expenses[2]);
  healthcareExpenses.set(inputValue.expenses[3]);
  educationExpenses.set(inputValue.expenses[4]);
  otherExpenses.set(inputValue.expenses[5]);
}

/** Save data */
pagesCount.listen(saveData);

function saveData() {
  // Save income
  inputValue.income[0] = salaryIncome.get();
  inputValue.income[1] = bonusIncome.get();
  inputValue.income[2] = investIncome.get();
  inputValue.income[3] = otherIncome.get();

  // Save expenses
  inputValue.expenses[0] = housingExpenses.get();
  inputValue.expenses[1] = foodExpenses.get();
  inputValue.expenses[2] = transportationExpenses.get();
  inputValue.expenses[3] = healthcareExpenses.get();
  inputValue.expenses[4] = educationExpenses.get();
  inputValue.expenses[5] = otherExpenses.get();
  saveLocalStorage();
}

function saveLocalStorage() {
  localStorage.setItem("inputValue", JSON.stringify(inputValue));
}

/** Clear data */
document.getElementById("clear-btn").onclick = () => {
  // Update income
  salaryIncome.set(0);
  bonusIncome.set(0);
  investIncome.set(0);
  otherIncome.set(0);

  // Update expenses
  housingExpenses.set(0);
  foodExpenses.set(0);
  transportationExpenses.set(0);
  healthcareExpenses.set(0);
  educationExpenses.set(0);
  otherExpenses.set(0);

  saveData();
};

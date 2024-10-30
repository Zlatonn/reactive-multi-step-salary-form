// ==================== Initial Process Section ====================

/** Create object collect pages detail */
let pageStores = [
  {
    name: "Income",
    leftDetail: ["Salary", "Extra", "Bonus", "Investment", "Other"],
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

  pText.innerHTML = text
    ? (text === "Bonus" && name === "Income") || (text === "Investment" && name === "Income")
      ? `${text} <span style="color: rgb(94, 146, 242);">/year</span>`
      : `${text} <span style="color: rgb(94, 146, 242);">/month</span>`
    : ``;
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

createBullet();
createCard();
createHandler();

// ==================== Pages Management Section ====================

/** Import variable */ 
import { pagesCount } from "./stores.js";

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

/** Create function */
function updatePage() {
  const count = pagesCount.get();
  const translateX = -count * 100;
  document.querySelector(".card-container").style.transform = `translateX(${translateX}%)`;
}

function updateStep() {
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

function updateButton() {
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

/** Reactive page count */
pagesCount.subscribe(updatePage);
pagesCount.subscribe(updateStep);
pagesCount.subscribe(updateButton);

// ==================== Income Section ====================
/** Import variable */
import { salaryIncome } from "./stores.js";
import { extraIncome } from "./stores.js";
import { bonusIncome } from "./stores.js";
import { investIncome } from "./stores.js";
import { otherIncome } from "./stores.js";
import { sumIncomeMonth } from "./stores.js";
import { sumIncomeYear } from "./stores.js";

/** Binding */
// >>> salary income
document.getElementById("income-salary-input").oninput = (e) => {
  salaryIncome.set(Number(e.target.value));
};

salaryIncome.subscribe((value) => {
  document.getElementById("income-salary-input").value = value;
});
// >>> extra income
document.getElementById("income-extra-input").oninput = (e) => {
  extraIncome.set(Number(e.target.value));
};

extraIncome.subscribe((value) => {
  document.getElementById("income-extra-input").value = value;
});

// >>> bonus income
document.getElementById("income-bonus-input").oninput = (e) => {
  bonusIncome.set(Number(e.target.value));
};

bonusIncome.subscribe((value) => {
  document.getElementById("income-bonus-input").value = value;
});

// >>> investment income
document.getElementById("income-investment-input").oninput = (e) => {
  investIncome.set(Number(e.target.value));
};

investIncome.subscribe((value) => {
  document.getElementById("income-investment-input").value = value;
});

// >>> other income
document.getElementById("income-other-input").oninput = (e) => {
  otherIncome.set(Number(e.target.value));
};

otherIncome.subscribe((value) => {
  document.getElementById("income-other-input").value = value;
});

/** Creat function */
function sumIncome() {
  const totalMonth = salaryIncome.get() + extraIncome.get() + otherIncome.get();
  sumIncomeMonth.set(totalMonth);

  const totalYear = totalMonth * 12 + bonusIncome.get() + investIncome.get();
  sumIncomeYear.set(totalYear);
}

/** Reactive income */
salaryIncome.subscribe(sumIncome);
extraIncome.subscribe(sumIncome);
bonusIncome.subscribe(sumIncome);
investIncome.subscribe(sumIncome);
otherIncome.subscribe(sumIncome);

// ==================== Expenses Section  ====================

/** Import variable */ 
import { housingExpenses } from "./stores.js";
import { foodExpenses } from "./stores.js";
import { transportationExpenses } from "./stores.js";
import { healthcareExpenses } from "./stores.js";
import { educationExpenses } from "./stores.js";
import { otherExpenses } from "./stores.js";
import { sumExpensesMonth } from "./stores.js";
import { sumExpensesYear } from "./stores.js";

//** Binding */
// >>> housing expenses
document.getElementById("expenses-housing-input").oninput = (e) => {
  housingExpenses.set(Number(e.target.value));
};

housingExpenses.subscribe((value) => {
  document.getElementById("expenses-housing-input").value = value;
});

// >>> food expenses
document.getElementById("expenses-food-input").oninput = (e) => {
  foodExpenses.set(Number(e.target.value));
};

foodExpenses.subscribe((value) => {
  document.getElementById("expenses-food-input").value = value;
});

// >>> transportation expenses
document.getElementById("expenses-transportation-input").oninput = (e) => {
  transportationExpenses.set(Number(e.target.value));
};

transportationExpenses.subscribe((value) => {
  document.getElementById("expenses-transportation-input").value = value;
});

// >>> healthcare expenses
document.getElementById("expenses-healthcare-input").oninput = (e) => {
  healthcareExpenses.set(Number(e.target.value));
};

healthcareExpenses.subscribe((value) => {
  document.getElementById("expenses-healthcare-input").value = value;
});

// >>> education expenses
document.getElementById("expenses-education-input").oninput = (e) => {
  educationExpenses.set(Number(e.target.value));
};

educationExpenses.subscribe((value) => {
  document.getElementById("expenses-education-input").value = value;
});

// >>> other expenses
document.getElementById("expenses-other-input").oninput = (e) => {
  otherExpenses.set(Number(e.target.value));
};
otherExpenses.subscribe((value) => {
  document.getElementById("expenses-other-input").value = value;
});

/** Create function */
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

/** Reactive expenses */
housingExpenses.subscribe(sumExpenses);
foodExpenses.subscribe(sumExpenses);
transportationExpenses.subscribe(sumExpenses);
healthcareExpenses.subscribe(sumExpenses);
educationExpenses.subscribe(sumExpenses);
otherExpenses.subscribe(sumExpenses);

// ==================== Summary Section  ====================

/** Import variable */
import { annualProfit } from "./stores.js";

/** Create function */
function calAnnualProfit() {
  const profit = sumIncomeYear.get() - sumExpensesYear.get();
  annualProfit.set(profit);
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
}

/** Reactive summary */
sumIncomeYear.subscribe(calAnnualProfit);
sumExpensesYear.subscribe(calAnnualProfit);
annualProfit.subscribe(displaySummary);

// ==================== Display Right Section  ====================

/** Create function */
function displayRight() {
  pageStores.forEach((e) => {
    const text1 = document.getElementById(`${e.name.toLowerCase()}-right-text-1`);
    const text2 = document.getElementById(`${e.name.toLowerCase()}-right-text-2`);

    const [textMonth, textYear] = getText();
    text1.innerHTML = textMonth;
    text2.innerHTML = textYear;
  });
}

/** Create function */
function getText() {
  const totalIncomeMonth = sumIncomeMonth.get();
  const totalExpensesMonth = sumExpensesMonth.get();

  const totalIncomeYear = sumIncomeYear.get();
  const totalExpensesYear = sumExpensesYear.get();

  const monthlyCashFlow = totalIncomeMonth - totalExpensesMonth;
  const annualCashFlow = totalIncomeYear - totalExpensesYear;

  const monthlyCashFlowColor = monthlyCashFlow >= 0 ? "#5bbb72" : "#ff605a";
  const annualCashFlowColor = annualCashFlow >= 0 ? "#5bbb72" : "#ff605a";

  const monthlyCashFlowSign = monthlyCashFlow >= 0 ? "+" : "-";
  const annualCashFlowSign = annualCashFlow >= 0 ? "+" : "-";

  const textMonth = `
  - monthly income = <b><span style ="color:#5bbb72; font-size: 1rem; font-style:bolder;">${totalIncomeMonth.toLocaleString()}</span></b> ฿.<br>
  - monthly expenses = <b><span style ="color:#ff605a; font-size: 1rem;">${totalExpensesMonth.toLocaleString()}</span></b> ฿.<br>
  - monthly cash flow = <b><span style ="color:${monthlyCashFlowColor}; font-size: 1rem; font-style:bolder;">${monthlyCashFlowSign}${Math.abs(
    monthlyCashFlow
  ).toLocaleString()}</span></b> ฿.`;

  const textYear = `
  - annual income = <b><span style ="color:#5bbb72; font-size: 1rem; font-style:bolder;">${totalIncomeYear.toLocaleString()}</span></b> ฿.<br>
  - annual expenses = <b><span style ="color:#ff605a; font-size: 1rem;">${totalExpensesYear.toLocaleString()}</span></b> ฿.<br>
  - annual cash flow = <b><span style ="color:${annualCashFlowColor}; font-size: 1rem; font-style:bolder;">${annualCashFlowSign}${Math.abs(
    annualCashFlow
  ).toLocaleString()}</span></b> ฿.`;

  return [textMonth, textYear];
}

/** Reactive display right side */
sumIncomeMonth.subscribe(displayRight);
sumIncomeYear.subscribe(displayRight);
sumExpensesMonth.subscribe(displayRight);

// ==================== Data Management Section ====================

/** Create object collect input data */
let inputValue = {
  income: [0, 0, 0, 0, 0],
  expenses: [0, 0, 0, 0, 0, 0],
};

/** Create function update data */
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
  extraIncome.set(inputValue.income[1]);
  bonusIncome.set(inputValue.income[2]);
  investIncome.set(inputValue.income[3]);
  otherIncome.set(inputValue.income[4]);

  // Update expenses
  housingExpenses.set(inputValue.expenses[0]);
  foodExpenses.set(inputValue.expenses[1]);
  transportationExpenses.set(inputValue.expenses[2]);
  healthcareExpenses.set(inputValue.expenses[3]);
  educationExpenses.set(inputValue.expenses[4]);
  otherExpenses.set(inputValue.expenses[5]);
}

// Initail load data
loadLocalStorage();

/** Create function save data */
function saveData() {
  // Save income
  inputValue.income[0] = salaryIncome.get();
  inputValue.income[1] = extraIncome.get();
  inputValue.income[2] = bonusIncome.get();
  inputValue.income[3] = investIncome.get();
  inputValue.income[4] = otherIncome.get();

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

/** Ceate function clear data */
function clearData() {
  // Update income
  salaryIncome.set(0);
  extraIncome.set(0);
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
}

// Eventlistener for clear data button
pagesCount.listen(saveData);
document.getElementById("clear-btn").onclick = clearData;

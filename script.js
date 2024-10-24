// ==================== Initial Process Section ====================
export let pageStores = [
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
// Import variable
import { pagesCount } from "./js/pageManage.js";

// Import function
import { setupPageCount } from "./js/pageManage.js";
setupPageCount();

// ==================== Income Section ====================
// Import variable
import { salaryIncome } from "./js/incomeStore.js";
import { extraIncome } from "./js/incomeStore.js";
import { bonusIncome } from "./js/incomeStore.js";
import { investIncome } from "./js/incomeStore.js";
import { otherIncome } from "./js/incomeStore.js";
import { sumIncomeMonth } from "./js/incomeStore.js";
import { sumIncomeYear } from "./js/incomeStore.js";

// Import function
import { setupIncome } from "./js/incomeStore.js";
setupIncome();

// ==================== Expenses Section  ====================
// Import variable
import { housingExpenses } from "./js/expensesStore.js";
import { foodExpenses } from "./js/expensesStore.js";
import { transportationExpenses } from "./js/expensesStore.js";
import { healthcareExpenses } from "./js/expensesStore.js";
import { educationExpenses } from "./js/expensesStore.js";
import { otherExpenses } from "./js/expensesStore.js";
import { sumExpensesMonth } from "./js/expensesStore.js";
import { sumExpensesYear } from "./js/expensesStore.js";

// Import function
import { setupExpenses } from "./js/expensesStore.js";
setupExpenses();

// ==================== Summary Section  ====================
// Import variable
import { annualProfit } from "./js/summaryStore.js";

// Import function
import { calAnnualProfit } from "./js/summaryStore.js";
import { displaySummary } from "./js/summaryStore.js";

sumIncomeYear.subscribe(calAnnualProfit);
sumExpensesYear.subscribe(calAnnualProfit);
annualProfit.subscribe(displaySummary);

// ==================== Display Right Section  ====================
sumIncomeMonth.subscribe(displayRight);
sumIncomeYear.subscribe(displayRight);
sumExpensesMonth.subscribe(displayRight);

function displayRight() {
  pageStores.forEach((e) => {
    const text1 = document.getElementById(`${e.name.toLowerCase()}-right-text-1`);
    const text2 = document.getElementById(`${e.name.toLowerCase()}-right-text-2`);

    const [textMonth, textYear] = getText();
    text1.innerHTML = textMonth;
    text2.innerHTML = textYear;
  });
}

function getText() {
  const totalIncomeMonth = sumIncomeMonth.get();
  const totalExpensesMonth = sumExpensesMonth.get();

  const totalIncomeYear = sumIncomeYear.get();
  const totalExpensesYear = sumExpensesYear.get();

  const monthlyCashFlow = totalIncomeMonth - totalExpensesMonth;
  const annualCashFlow = totalIncomeYear - totalExpensesYear;

  const monthlyCashFlowColor = monthlyCashFlow >= 0 ? "#5bbb72" : "#ff605a";
  const annualCashFlowColor = annualCashFlow >= 0 ? "#5bbb72" : "#ff605a";

  const textMonth = `
  - monthly income = <b><span style ="color:#5bbb72; font-size: 1rem; font-style:bolder;">${totalIncomeMonth.toLocaleString()}</span></b> ฿.<br>
  - monthly expenses = <b><span style ="color:#ff605a; font-size: 1rem;">${totalExpensesMonth.toLocaleString()}</span></b> ฿.<br>
  - monthly cash flow = <b><span style ="color:${monthlyCashFlowColor}; font-size: 1rem; font-style:bolder;">${monthlyCashFlow.toLocaleString()}</span></b> ฿.`;

  const textYear = `
  - annual income = <b><span style ="color:#5bbb72; font-size: 1rem; font-style:bolder;">${totalIncomeYear.toLocaleString()}</span></b> ฿.<br>
  - annual expenses = <b><span style ="color:#ff605a; font-size: 1rem;">${totalExpensesYear.toLocaleString()}</span></b> ฿.<br>
  - annual cash flow = <b><span style ="color:${annualCashFlowColor}; font-size: 1rem; font-style:bolder;">${annualCashFlow.toLocaleString()}</span></b> ฿.`;

  return [textMonth, textYear];
}

// ==================== Data Management Section ====================
let inputValue = {
  income: [0, 0, 0, 0, 0],
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

/** Save data */
pagesCount.listen(saveData);

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

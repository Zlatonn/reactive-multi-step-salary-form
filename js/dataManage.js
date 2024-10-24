// Import variable
import { salaryIncome } from "./incomeStore.js";
import { extraIncome } from "./incomeStore.js";
import { bonusIncome } from "./incomeStore.js";
import { investIncome } from "./incomeStore.js";
import { otherIncome } from "./incomeStore.js";

import { housingExpenses } from "./expensesStore.js";
import { foodExpenses } from "./expensesStore.js";
import { transportationExpenses } from "./expensesStore.js";
import { healthcareExpenses } from "./expensesStore.js";
import { educationExpenses } from "./expensesStore.js";
import { otherExpenses } from "./expensesStore.js";

export let inputValue = {
  income: [0, 0, 0, 0, 0],
  expenses: [0, 0, 0, 0, 0, 0],
};

/** Update data */
export function loadLocalStorage() {
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
export function saveData() {
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
export function clearData() {
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

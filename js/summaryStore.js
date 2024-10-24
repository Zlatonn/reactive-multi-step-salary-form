// Import nano stores
import { atom } from "https://unpkg.com/nanostores";

//Import variable
import { sumIncomeYear } from "../js/incomeStore.js";
import { sumExpensesYear } from "../js/expensesStore.js";

//Create variable
export let annualProfit = atom(0);

export function calAnnualProfit() {
  const profit = sumIncomeYear.get() - sumExpensesYear.get();
  annualProfit.set(profit);
}

export function displaySummary() {
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

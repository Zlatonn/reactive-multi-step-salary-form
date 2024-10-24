// Import variable
import { pageStores } from "./initialProcess.js";
import { sumIncomeMonth } from "./incomeStore.js";
import { sumIncomeYear } from "./incomeStore.js";
import { sumExpensesMonth } from "./expensesStore.js";
import { sumExpensesYear } from "./expensesStore.js";

export function displayRight() {
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

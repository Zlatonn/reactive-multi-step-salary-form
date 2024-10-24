// ==================== Initial Process Section ====================
// Import function
import { createBullet } from "./js/initialProcess.js";
import { createCard } from "./js/initialProcess.js";
import { createHandler } from "./js/initialProcess.js";

createBullet();
createCard();
createHandler();

// ==================== Pages Management Section ====================
// Import variable
import { pagesCount } from "./js/pageManage.js";

// Import function
import { setupPageCount } from "./js/pageManage.js";
import { updatePage } from "./js/pageManage.js";
import { updateStep } from "./js/pageManage.js";
import { updateButton } from "./js/pageManage.js";

setupPageCount();
pagesCount.subscribe(updatePage);
pagesCount.subscribe(updateStep);
pagesCount.subscribe(updateButton);

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
import { sumIncome } from "./js/incomeStore.js";

setupIncome();
salaryIncome.subscribe(sumIncome);
extraIncome.subscribe(sumIncome);
bonusIncome.subscribe(sumIncome);
investIncome.subscribe(sumIncome);
otherIncome.subscribe(sumIncome);

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
import { sumExpenses } from "./js/expensesStore.js";

setupExpenses();
housingExpenses.subscribe(sumExpenses);
foodExpenses.subscribe(sumExpenses);
transportationExpenses.subscribe(sumExpenses);
healthcareExpenses.subscribe(sumExpenses);
educationExpenses.subscribe(sumExpenses);
otherExpenses.subscribe(sumExpenses);

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
// Import function
import { displayRight } from "./js/displayRight.js";

sumIncomeMonth.subscribe(displayRight);
sumIncomeYear.subscribe(displayRight);
sumExpensesMonth.subscribe(displayRight);

// ==================== Data Management Section ====================
// Import function
import { loadLocalStorage } from "./js/dataManage.js";
import { saveData } from "./js/dataManage.js";
import { clearData } from "./js/dataManage.js";

loadLocalStorage();
pagesCount.listen(saveData);
document.getElementById("clear-btn").onclick = clearData;

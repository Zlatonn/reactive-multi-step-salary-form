// Import nano stores
import { atom } from "https://unpkg.com/nanostores";

// Create nano variable for page count
export let pagesCount = atom(0);

// Create nano variable for income
export let salaryIncome = atom(0);
export let extraIncome = atom(0);
export let bonusIncome = atom(0);
export let investIncome = atom(0);
export let otherIncome = atom(0);
export let sumIncomeMonth = atom(0);
export let sumIncomeYear = atom(0);

//Create nano variable for income
export let housingExpenses = atom(0);
export let foodExpenses = atom(0);
export let transportationExpenses = atom(0);
export let healthcareExpenses = atom(0);
export let educationExpenses = atom(0);
export let otherExpenses = atom(0);
export let sumExpensesMonth = atom(0);
export let sumExpensesYear = atom(0);

//Create nano variable for summary
export let annualProfit = atom(0);
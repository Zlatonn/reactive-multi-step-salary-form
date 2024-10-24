// Import nano stores
import { atom } from "https://unpkg.com/nanostores";

//Create variable
export let housingExpenses = atom(0);
export let foodExpenses = atom(0);
export let transportationExpenses = atom(0);
export let healthcareExpenses = atom(0);
export let educationExpenses = atom(0);
export let otherExpenses = atom(0);
export let sumExpensesMonth = atom(0);
export let sumExpensesYear = atom(0);

export function setupExpenses() {
  /** Binding */
  // >>> Housing Expenses
  document.getElementById("expenses-housing-input").oninput = (e) => {
    housingExpenses.set(Number(e.target.value));
  };

  housingExpenses.subscribe((value) => {
    document.getElementById("expenses-housing-input").value = value;
  });

  // >>> Food Expenses
  document.getElementById("expenses-food-input").oninput = (e) => {
    foodExpenses.set(Number(e.target.value));
  };

  foodExpenses.subscribe((value) => {
    document.getElementById("expenses-food-input").value = value;
  });

  // >>> Transportation Expenses
  document.getElementById("expenses-transportation-input").oninput = (e) => {
    transportationExpenses.set(Number(e.target.value));
  };

  transportationExpenses.subscribe((value) => {
    document.getElementById("expenses-transportation-input").value = value;
  });

  // >>> Healthcare Expenses
  document.getElementById("expenses-healthcare-input").oninput = (e) => {
    healthcareExpenses.set(Number(e.target.value));
  };

  healthcareExpenses.subscribe((value) => {
    document.getElementById("expenses-healthcare-input").value = value;
  });

  // >>> Education Expenses
  document.getElementById("expenses-education-input").oninput = (e) => {
    educationExpenses.set(Number(e.target.value));
  };

  educationExpenses.subscribe((value) => {
    document.getElementById("expenses-education-input").value = value;
  });

  // >>> Other Expenses
  document.getElementById("expenses-other-input").oninput = (e) => {
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
}

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

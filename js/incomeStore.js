// Import nano stores
import { atom } from "https://unpkg.com/nanostores";

// Create variable
export let salaryIncome = atom(0);
export let extraIncome = atom(0);
export let bonusIncome = atom(0);
export let investIncome = atom(0);
export let otherIncome = atom(0);
export let sumIncomeMonth = atom(0);
export let sumIncomeYear = atom(0);

export function setupIncome() {
  /** Binding */
  // >>> Salary Income
  document.getElementById("income-salary-input").oninput = (e) => {
    salaryIncome.set(Number(e.target.value));
  };

  salaryIncome.subscribe((value) => {
    document.getElementById("income-salary-input").value = value;
  });

  // >>> Extra Income
  document.getElementById("income-extra-input").oninput = (e) => {
    extraIncome.set(Number(e.target.value));
  };

  extraIncome.subscribe((value) => {
    document.getElementById("income-extra-input").value = value;
  });

  // >>> Bonus Income
  document.getElementById("income-bonus-input").oninput = (e) => {
    bonusIncome.set(Number(e.target.value));
  };

  bonusIncome.subscribe((value) => {
    document.getElementById("income-bonus-input").value = value;
  });

  // >>> Investment Income
  document.getElementById("income-investment-input").oninput = (e) => {
    investIncome.set(Number(e.target.value));
  };

  investIncome.subscribe((value) => {
    document.getElementById("income-investment-input").value = value;
  });

  // >>> Other Income
  document.getElementById("income-other-input").oninput = (e) => {
    otherIncome.set(Number(e.target.value));
  };

  otherIncome.subscribe((value) => {
    document.getElementById("income-other-input").value = value;
  });

  /** Income Reactivity */
  salaryIncome.subscribe(sumIncome);
  extraIncome.subscribe(sumIncome);
  bonusIncome.subscribe(sumIncome);
  investIncome.subscribe(sumIncome);
  otherIncome.subscribe(sumIncome);
}

function sumIncome() {
  const totalMonth = salaryIncome.get() + extraIncome.get() + otherIncome.get();
  sumIncomeMonth.set(totalMonth);

  const totalYear = totalMonth * 12 + bonusIncome.get() + investIncome.get();
  sumIncomeYear.set(totalYear);
}

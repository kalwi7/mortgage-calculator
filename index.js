const totalAmountInput = document.getElementById("amount-input");
const contributionInput = document.getElementById("contribution-input");
const monthsInput = document.getElementById("length-of-loan-input");
const calculateBtn = document.getElementById("calculate-btn");
const appoitmentBox = document.getElementById("appoitment-btn");
const resultsBox = document.getElementById("results-all");
const errorBox = document.getElementById("error-box");
const resutlFirstBk2 = document.getElementById("resutl-first-bk2");
const resutlMortgageBk2 = document.getElementById("resutl-mortgage-bk2");
const resutlInstallment121 = document.getElementById("resutl-121-bk2");
const resutlMortgageBk2After = document.getElementById(
  "resutl-mortgage-bk2-after"
);
const headingOrange = document.getElementById("headingBk2-years");

const resutlCostBk2 = document.getElementById("resutl-cost-bk2");
const resutlSavings = document.getElementById("resutl-savings");
const resutlCost = document.getElementById("resutl-cost");
const resutlFirst = document.getElementById("resutl-first");
const resutlMortgage = document.getElementById("resutl-mortgage");

const interestRateBK = 2.7;
const interestRate = 8.48;

const errorMessage = "Błąd w formularzu!";

let totalAmount = 400000;
let contribution = 50000;
let years = 30;
let bk2FullCost;
let ordinaryCost;
let installment121;

//Wyświetlanie wartości startowych
window.addEventListener("load", (event) => {
  monthsInput.value = "30 lat";
  totalAmountInput.value = "400 000 zł";
  contributionInput.value = "50 000 zł";
});

// function deleteErrorBox() {
//   timeout = setTimeout(alertFunc, 3000);
// }

setTimeout(function () {
  errorBox.style.display = "none";
}, 2000);

// function alertFunc() {
//   alert("Hello!");
// }

function calculateDecreasingLoan(months, totalAmount, interestRate) {
  // Obliczanie miesięcznej stopy oprocentowania
  const monthlyInterestRate = interestRate / 12 / 100;

  let remainingAmount = totalAmount;
  let amortizationSchedule = [];
  let payed_ = 0;
  let lastElementPayed;

  for (let i = 0; i < months; i++) {
    // Obliczanie odsetek dla danego miesiąca
    const interestAmount = remainingAmount * monthlyInterestRate;

    // Obliczanie kapitału spłacanego w danym miesiącu
    const principalAmount = totalAmount / months;

    remainingAmount -= principalAmount;

    const installment =
      parseFloat(principalAmount.toFixed(2)) +
      parseFloat(interestAmount.toFixed(2));

    payed_ += installment;

    amortizationSchedule.push({
      month: i + 1,
      principal: principalAmount.toFixed(2),
      interest: interestAmount.toFixed(2),
      remainingAmount: remainingAmount.toFixed(2),
      installment: installment,
      payed_: payed_,
    });

    if (i === 120) {
      const newMonths = months - 120;

      const since120 = calculateFixedInstallmentsLoan(
        newMonths,
        remainingAmount,
        8.48
      );
      lastElementPayed = since120.slice(-1)[0].payed;
      bk2FullCost = lastElementPayed + amortizationSchedule[119].payed_;
      installment121 = since120[0].installment;
    }
  }

  return amortizationSchedule;
}

function calculateFixedInstallmentsLoan(months, totalAmount, interestRate) {
  // Obliczanie miesięcznej stopy oprocentowania
  const monthlyInterestRate = interestRate / 12 / 100;

  // let interestSum = 0;
  // Obliczanie współczynnika dla równych rat
  const coefficient =
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
    (Math.pow(1 + monthlyInterestRate, months) - 1);

  // Obliczanie stałej raty
  const monthlyPayment = totalAmount * coefficient;

  let remainingAmount = totalAmount;
  let amortizationSchedule = [];
  let payed = 0;

  for (let i = 0; i < months; i++) {
    // Obliczanie odsetek dla danego miesiąca
    const interestAmount = remainingAmount * monthlyInterestRate;

    // Obliczanie kapitału spłacanego w danym miesiącu
    const principalAmount = monthlyPayment - interestAmount;

    remainingAmount -= principalAmount;

    const installment =
      parseFloat(principalAmount.toFixed(2)) +
      parseFloat(interestAmount.toFixed(2));

    payed += installment;

    amortizationSchedule.push({
      month: i + 1,
      principal: principalAmount.toFixed(2),
      interest: interestAmount.toFixed(2),
      remainingAmount: remainingAmount.toFixed(2),
      installment:
        parseFloat(principalAmount.toFixed(2)) +
        parseFloat(interestAmount.toFixed(2)),
      payed: payed,
    });
  }

  ordinaryCost = amortizationSchedule.slice(-1)[0].payed;
  return amortizationSchedule;
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

totalAmountInput.addEventListener("focus", function (e) {
  totalAmountInput.value = totalAmount;
});

totalAmountInput.addEventListener("focusout", function (e) {
  totalAmount = parseInt(totalAmountInput.value);
  if (!totalAmount) {
    totalAmount = 400000;
  } else if (totalAmount + contribution > 800000) {
    totalAmount = 800000 - contribution;
    totalAmountInput.value = totalAmount;
    errorBox.textContent = "Maksymalna wartość nieruchomości to 800 tyś";
    errorBox.style.display = "block";
    setTimeout(function () {
      errorBox.style.display = "none";
    }, 2000);
    // totalAmountInput.classList.add("error");
  } else if (totalAmount < 90000) {
    totalAmount = 90000;
    // totalAmountInput.value = totalAmount;
    errorBox.textContent = "Minimalna wartość nieruchomości to 90 tyś";
    errorBox.style.display = "block";
    setTimeout(function () {
      errorBox.style.display = "none";
    }, 2000);
    // totalAmountInput.classList.add("error");
  } else if (totalAmount > 600000 && contribution < totalAmount - 600000) {
    totalAmount = 600000 + contribution;
    // totalAmountInput.value = totalAmount;
    errorBox.textContent =
      "Wartość nieruchomości zmieniona! Maksymalna wartość 600 tyś + wkład";
    errorBox.style.display = "block";
    setTimeout(function () {
      errorBox.style.display = "none";
    }, 2000);
  } else if (totalAmount <= contribution) {
    totalAmount = 800000 - contribution;
    // totalAmountInput.value = totalAmount;
    errorBox.textContent = "Wkład własny większy od wartości nieruchomości";
    errorBox.style.display = "block";
    setTimeout(function () {
      errorBox.style.display = "none";
    }, 2000);
    // totalAmountInput.classList.add("error");
  } else {
    errorBox.style.display = "none";
    // totalAmountInput.classList.remove("error");
  }
  totalAmountInput.value = numberWithSpaces(parseInt(totalAmount)) + " zł";
  // totalAmountInput.value = totalAmount;
});

contributionInput.addEventListener("focus", function (e) {
  contributionInput.value = contribution;
});

contributionInput.addEventListener("focusout", function (e) {
  contribution = parseInt(contributionInput.value);
  console.log(contribution);
  if (!contribution) {
    contribution = 0;
  } else if (totalAmount + contribution > 800000) {
    if (totalAmount >= 600000) {
      contribution = 800000 - totalAmount;
      errorBox.textContent = "Maksymalna wartość nieruchomości to 800 tyś";
    } else {
      contribution = 200000;
      errorBox.textContent = "Maksymalny wkład własny to 200 tyś";
    }
    errorBox.style.display = "block";
    setTimeout(function () {
      errorBox.style.display = "none";
    }, 2000);
    // contributionInput.classList.add("error");
  } else if (totalAmount > 600000 && contribution < totalAmount - 600000) {
    contribution = 800000 - totalAmount;
    // totalAmountInput.value = totalAmount;
    errorBox.textContent =
      "Wkład własny zmieniony! Za duża wartość nieruchomości";
    errorBox.style.display = "block";
    setTimeout(function () {
      errorBox.style.display = "none";
    }, 2000);
  } else if (contribution > 200000) {
    contribution = 200000;
    errorBox.textContent = "Maksymalny wkład własny to 200 tyś";
    errorBox.style.display = "block";
    setTimeout(function () {
      errorBox.style.display = "none";
    }, 2000);
    // contributionInput.classList.add("error");
  } else if (contribution >= totalAmount) {
    contribution = 50000;
    errorBox.textContent = "Za duży wkład własny";
    errorBox.style.display = "block";
    setTimeout(function () {
      errorBox.style.display = "none";
    }, 2000);
    // contributionInput.classList.add("error");
  } else {
    errorBox.style.display = "none";
    // contributionInput.classList.remove("error");
  }
  contributionInput.value = numberWithSpaces(parseInt(contribution)) + " zł";
});

monthsInput.addEventListener("focus", function (e) {
  monthsInput.value = years;
});

monthsInput.addEventListener("focusout", function (e) {
  years = parseInt(monthsInput.value);
  if (!years) {
    years = 30;
  } else if (years > 35) {
    years = 35;
    errorBox.textContent = "Maksymalny okres spłaty to 35 lat";
    errorBox.style.display = "block";
    setTimeout(function () {
      errorBox.style.display = "none";
    }, 2000);
    // monthsInput.classList.add("error");
  } else if (years < 15) {
    years = 15;
    errorBox.textContent = "Minimalny okres spłaty to 15";
    errorBox.style.display = "block";
    setTimeout(function () {
      errorBox.style.display = "none";
    }, 2000);
  } else {
    errorBox.style.display = "none";
    // monthsInput.classList.remove("error");
  }
  monthsInput.value = years + " lat";
});

calculateBtn.addEventListener("click", function (e) {
  if (
    years <= 35 &&
    years >= 15 &&
    contribution <= 200000 &&
    totalAmount >= 90000 &&
    totalAmount <= 800000 &&
    totalAmount + contribution <= 800000
  ) {
    // errorBox.style.display = "none";
    calculateMortgagePayment();
  } else {
    errorBox.textContent = "Popraw wartości w formularzu!";
    errorBox.style.display = "block";
    // calculateBtn.classList.add("form-error");
  }
});

function calculateMortgagePayment() {
  const schedule = calculateDecreasingLoan(
    years * 12,
    totalAmount - contribution,
    interestRateBK
  );

  const schedule1 = calculateFixedInstallmentsLoan(
    years * 12,
    totalAmount - contribution,
    interestRate
  );

  const installemnt1 = Math.round(schedule[0].installment) + " zł";
  resutlFirstBk2.innerHTML = `${installemnt1} <span class="discountBadgeBk2"> -${
    Math.round(schedule1[0].installment) - Math.round(schedule[0].installment)
  } zł</span>`;
  // resutlMortgageBk2.textContent = interestRateBK + "%";
  resutlMortgageBk2After.textContent = interestRate + "%";
  resutlCostBk2.textContent = numberWithSpaces(Math.round(bk2FullCost)) + " zł";
  resutlSavings.textContent =
    numberWithSpaces(Math.round(ordinaryCost - bk2FullCost)) + " zł";
  resutlCost.textContent = numberWithSpaces(Math.round(ordinaryCost)) + " zł";
  resutlFirst.textContent = Math.round(schedule1[0].installment) + " zł";
  resutlInstallment121.textContent = Math.round(installment121) + " zł";
  resutlMortgage.textContent = interestRate + "%";
  headingOrange.textContent = `Następne ${years - 10} lat`;
  console.log(headingOrange);
  calculateBtn.classList.add("form-success");
  resultsBox.style.display = "flex";
  appoitmentBox.style.display = "flex";
  monthsInput.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

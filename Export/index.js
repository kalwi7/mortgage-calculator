function calculateDecreasingLoan(months, totalAmount, interestRate) {
  // Obliczanie miesięcznej stopy oprocentowania
  const monthlyInterestRate = interestRate / 12 / 100;

  let remainingAmount = totalAmount;
  let amortizationSchedule = [];
  let payed_ = 0;

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
      const newAmount = totalAmount - payed_;
      console.log(remainingAmount);

      console.log("Od 120");
      console.log(
        calculateFixedInstallmentsLoan(newMonths, remainingAmount, 9.1)
      );
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
    // interestSum += parseFloat(interestAmount.toFixed(2));

    amortizationSchedule.push({
      month: i + 1,
      principal: principalAmount.toFixed(2),
      interest: interestAmount.toFixed(2),
      remainingAmount: remainingAmount.toFixed(2),
      installment:
        parseFloat(principalAmount.toFixed(2)) +
        parseFloat(interestAmount.toFixed(2)),
      payed: payed,
      // interestSum: interestSum,
    });

    // if (i === 119) {
    //   amortizationSchedule.push;
    // }
  }

  return amortizationSchedule;
}

// Przykładowe użycie
const months = 360;
const totalAmount = 300000;
const interestRateBK = 2.7;
const interestRate = 9.1;

const schedule1 = calculateFixedInstallmentsLoan(
  months,
  totalAmount,
  interestRate
);
console.log("Normalny");
console.log(schedule1);

const schedule = calculateDecreasingLoan(months, totalAmount, interestRateBK);
console.log("BK2");
console.log(schedule);

const amountInput = document.getElementById("amount-input");
// const interestRateInput = document.getElementById("interest-rate-input");
const lengthOfLoanInput = document.getElementById("length-of-loan-input");
const calculateBtn = document.getElementById("calculate-btn");
const resultsBox = document.getElementById("results-all");
// const mortgageFinalResult = document.getElementById("mortgage-final-result");
const resutlFirstBk2 = document.getElementById("resutl-first-bk2");
const resutlMortgageBk2 = document.getElementById("resutl-mortgage-bk2");
const resutlSavingsBk2 = document.getElementById("resutl-savings-bk2");
const resutlFirst = document.getElementById("resutl-first");
const resutlMortgage = document.getElementById("resutl-mortgage");

const errorMessage = "Błąd w formularzu!";
const successMessage = "Rata przez pierwsze 10 lat: ";

amountInput.addEventListener("focusout", function (e) {
  if (!amountInput.validity.valid) {
    amountInput.classList.add("error");
  } else {
    amountInput.classList.remove("error");
  }
});
// interestRateInput.addEventListener("focusout", function (e) {
//   if (!interestRateInput.validity.valid) {
//     interestRateInput.classList.add("error");
//   } else {
//     interestRateInput.classList.remove("error");
//   }
// });
lengthOfLoanInput.addEventListener("focusout", function (e) {
  if (!lengthOfLoanInput.validity.valid) {
    lengthOfLoanInput.classList.add("error");
  } else {
    lengthOfLoanInput.classList.remove("error");
  }
});

calculateBtn.addEventListener("click", function (e) {
  if (
    amountInput.validity.valid &&
    // interestRateInput.validity.valid &&
    lengthOfLoanInput.validity.valid
  ) {
    calculateMortgagePayment();
  } else {
    mortgageFinalResult.textContent = errorMessage;
    mortgageFinalResult.classList.add("error-message");
    calculateBtn.classList.add("form-error");
    if (!amountInput.validity.valid) {
      amountInput.classList.add("error");
    }
    // if (!interestRateInput.validity.valid) {
    //   interestRateInput.classList.add("error");
    // }
    if (!lengthOfLoanInput.validity.valid) {
      lengthOfLoanInput.classList.add("error");
    }
  }
});

function calculateMortgagePayment() {
  //   mortgageFinalResult.textContent = successMessage + quotas.toFixed(2);
  resutlFirstBk2.textContent = "Pierwsza rata: " + schedule[0].installment;
  resutlMortgageBk2.textContent = "Oprocentowanie: " + interestRateBK;
  // resutlSavingsBk2.textContent =
  //   parseFloat(schedule1[119].remainingAmount) -
  //   parseFloat(schedule[119].remainingAmount);
  resutlFirst.textContent = "Pierwsza rata: " + schedule1[0].installment;
  resutlMortgage.textContent = "Oprocentowanie: " + interestRate;
  //   mortgageFinalResult.classList.add("success-message");
  calculateBtn.classList.add("form-success");
  calculateBtn.setAttribute("disabled", "disabled");
  // resetBtn.style.display = "block";
  resultsBox.style.display = "block";
}

// resetBtn.addEventListener("click", function () {
//   resetBtn.style.display = "none";
//   mortgageFinalResult.textContent = "";
//   calculateBtn.removeAttribute("disabled");
//   calculateBtn.classList.remove("form-success");
// });

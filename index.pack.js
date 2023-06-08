/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var amountInput = document.getElementById('amount-input');
var interestRateInput = document.getElementById('interest-rate-input');
var lengthOfLoanInput = document.getElementById('length-of-loan-input');
var calculateBtn = document.getElementById('calculate-btn');
var resetBtn = document.getElementById('reset-btn');
var mortgageFinalResult = document.getElementById('mortgage-final-result');

var errorMessage = 'There is an error in the form, please check it! 😥';
var successMessage = '🧮 Your monthly mortgage payment will be: ';

amountInput.addEventListener('focusout', function (e) {
    if (!amountInput.validity.valid) {
        amountInput.classList.add('error');
    } else {
        amountInput.classList.remove('error');
    }
});
interestRateInput.addEventListener('focusout', function (e) {
    if (!interestRateInput.validity.valid) {
        interestRateInput.classList.add('error');
    } else {
        interestRateInput.classList.remove('error');
    }
});
lengthOfLoanInput.addEventListener('focusout', function (e) {
    if (!lengthOfLoanInput.validity.valid) {
        lengthOfLoanInput.classList.add('error');
    } else {
        lengthOfLoanInput.classList.remove('error');
    }
});

calculateBtn.addEventListener('click', function (e) {
    if (amountInput.validity.valid && interestRateInput.validity.valid && lengthOfLoanInput.validity.valid) {
        calculateMortgagePayment();
    } else {
        mortgageFinalResult.textContent = errorMessage;
        mortgageFinalResult.classList.add('error-message');
        calculateBtn.classList.add('form-error');
        if (!amountInput.validity.valid) {
            amountInput.classList.add('error');
        }
        if (!interestRateInput.validity.valid) {
            interestRateInput.classList.add('error');
        }
        if (!lengthOfLoanInput.validity.valid) {
            lengthOfLoanInput.classList.add('error');
        }
    }
});

function calculateMortgagePayment() {
    var borrowedMoney = amountInput.value;
    var lengthOfLoan = lengthOfLoanInput.value * 12;
    var interestRate = interestRateInput.value; // Interés en bruto, sin preparar
    var calculedInterest = interestRate / 100; // Lo dividimos por 100
    var interesPreparado = calculedInterest / 12; // Y lo dividimos por 12 para prepararlo

    var percentage = interesPreparado; // 0.065 / 12 = 6.5% / 12
    var percentagePlusOne = interesPreparado + 1;
    var exponentiationOperator = Math.pow(percentagePlusOne, lengthOfLoan);
    var firstDividend = percentage * exponentiationOperator;
    var secondDividend = exponentiationOperator - 1;
    var division = firstDividend / secondDividend;
    var mortgage = borrowedMoney;
    var quotas = mortgage * division;

    console.log('Parte de arriba de la división: ' + firstDividend);
    console.log('Parte de abajo de la división: ' + secondDividend);
    console.log('División: ' + division);
    console.log('A pagar: ' + quotas);

    mortgageFinalResult.textContent = successMessage + quotas.toFixed(2);
    mortgageFinalResult.classList.add('success-message');
    calculateBtn.classList.add('form-success');
    calculateBtn.setAttribute('disabled', 'disabled');
    resetBtn.style.display = 'block';
}

resetBtn.addEventListener('click', function () {
    resetBtn.style.display = 'none';
    mortgageFinalResult.textContent = '';
    calculateBtn.removeAttribute('disabled');
    calculateBtn.classList.remove('form-success');
});

/***/ })
/******/ ]);
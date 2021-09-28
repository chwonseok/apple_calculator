'use strict';
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.js-result');
const numbers = document.querySelectorAll('.js-number');
const operations = document.querySelectorAll('.js-operation');
const equal = document.querySelector('.js-equals');
const clear = document.querySelector('.js-reset');
const plusminus = document.querySelector('.js-plusminus');
const percent = document.querySelector('.js-percent');

let memoryNum = '';
let curNum = '';
let preOperation;
let clickedOperation = '';
let result = '';
let equalStat;

// 추가할 것 : operation 연속 두번 누르면 아무 변화없도록(이전 유의미한 숫자가 있다면 계산해주는 기능 추가필요), 아무때나 clear할 수 있게하기

function percentClick() {
  const percentNum = display.textContent * 0.01;
  display.textContent = percentNum;
  curNum = percentNum;
  console.log(memoryNum, curNum);
}

function plusminusClick() {
  const plusminusNum = -display.textContent;
  display.textContent = plusminusNum;
  curNum = plusminusNum;
}

function erasePaint() {
  operations.forEach(function (el) {
    el.classList.remove('active-operation');
  });
}

function clearClick() {
  clear.innerText = 'AC';
  display.innerText = '0';
  result = '';
  memoryNum = '';
  curNum = '';
  clickedOperation = '';
  preOperation = false;

  erasePaint();
}

function equalClick() {
  if (!equalStat) {
    operate(memoryNum, curNum);
    equalStat = true;
    erasePaint();
  } else {
    curNum = display.textContent;
    operate(memoryNum, curNum);
  }
}

function operate(preValue, postValue) {
  let roughResult;

  if (clickedOperation === '+') roughResult = +preValue + +postValue;
  if (clickedOperation === '−') roughResult = +preValue - +postValue;
  if (clickedOperation === '×') roughResult = +preValue * +postValue;
  if (clickedOperation === '÷') roughResult = +preValue / +postValue;

  console.log(preValue, postValue);
  result = parseFloat(roughResult.toFixed(9));
  display.innerText = result;
}

function operationClick() {
  if (!preOperation) {
    preOperation = true;
    memoryNum = curNum;
    curNum = '';
    this.classList.add('active-operation');
  } else {
    operate(memoryNum, curNum);
    memoryNum = result;
    curNum = '';
    this.classList.add('active-operation');
  }

  clickedOperation = this.textContent;
}

function numberClick() {
  const number = this.textContent;

  if (!preOperation) {
    clear.innerText = 'C';
    // initial case
    curNum += number;
    display.innerText = curNum;

    erasePaint();
  } else if (preOperation) {
    curNum += number;
    display.innerText = curNum;

    erasePaint();
  }
}

// EventListeners
numbers.forEach(num => num.addEventListener('click', numberClick));
operations.forEach(oper => oper.addEventListener('click', operationClick));

equal.addEventListener('click', equalClick);
clear.addEventListener('click', clearClick);
plusminus.addEventListener('click', plusminusClick);
percent.addEventListener('click', percentClick);

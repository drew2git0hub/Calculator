let display = document.getElementById("display");
let currentOperation = null;
let lastAnswer = null;

// 숫자 입력
function appendNumber(num) {
  display.value += num;
}

// 소수점 입력
function appendDecimal() {
  if (!display.value.includes(".")) {
    display.value += ".";
  }
}

// 전체 지우기(C)
function clearDisplay(type) {
  if (type === "all") {
    display.value = "";
    currentOperation = null;
  } else if (type === "entry") {
    // 마지막 입력만 지우기
    display.value = display.value.replace(/\d+$/, "");
  }
}

// 마지막 글자 삭제(DEL)
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// 연산자 설정
function setOperation(op) {
    if (op === "EXP") {
        display.value += "EXP";
    } else
        display.value += op;
    currentOperation = op;
}

// ANS (직전 결과 불러오기)
function recallAnswer() {
  if (lastAnswer !== null) {
    display.value += "ANS";
  }
}

// 결과 계산(EXE)
function calculateResult() {
  try {
    let expression = display.value
      .replace(/MOD/g, "%")
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/ANS/g, () => lastAnswer !== null ? lastAnswer : 0)

    // 지수 연산 처리(EXP)
    if (expression.includes("EXP")) {
      let parts = expression.split("EXP");
      let base = parseFloat(parts[0].trim());
      let exponent = parseFloat(parts[1].trim());
      let result = Math.pow(base, exponent);
      display.value = result;
      lastAnswer = result;
      return;
    }

    // 몫 연산 처리(DIV)
    if (expression.includes("DIV")) {
      let parts = expression.split("DIV");
        let dividend = parseFloat(parts[0].trim());
        let divisor = parseFloat(parts[1].trim());
        let result = Math.floor(dividend / divisor);
        display.value = result;
        lastAnswer = result;
        return;
    }

    // 루트 연산 처리(√)
    if (expression.includes("√")) {
      let parts = expression.split("√");
      let number = parseFloat(parts[1].trim());
        let result = Math.sqrt(number);
        display.value = result;
        lastAnswer = result;
        return;
    }

    let result = eval(expression);
    display.value = result;
    lastAnswer = result;
  } catch (e) {
    display.value = "Error";
  }
}
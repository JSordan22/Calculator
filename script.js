let calculator = document.querySelector(".calculator");
let screen = document.querySelector(".screen");
let output = document.querySelector(".output");
let button1 = document.querySelectorAll(".button-1");
let buttonOperator = document.querySelectorAll(".button-operator");
let buttonNumber = document.querySelectorAll(".button-number");
let buttonFunction = document.querySelectorAll(".button-function");
let clearButton = document.querySelector(".AC");
let equate = document.querySelector(".button-equate");

let isOperatorPressed = false;
let num1;
let num2;
let oper;

buttonNumber.forEach(button => button.addEventListener("click", () => {
    switch (button.textContent) {
        case "0":
            zero(button);
            break;
        case ".":
            decimal(button);
            break;
        default:
            input(button, isOperatorPressed);
    }
}));

buttonFunction.forEach(button => button.addEventListener("click", () => {
    switch (button.textContent) {
        case "AC":
            allClear();
            break;
        case "C":
            clear(0);
            break;
        case "+/-":
            negate();
            break;
        case "%":
            percent();
    }
}));

buttonOperator.forEach(button => button.addEventListener("click", () => {
    checked(button);
    switch (true) {
        case button.classList.contains("divide"):
            operatorFunc("/");
            break;
        case button.classList.contains("multiply"):
            operatorFunc("*");
            break;
        case button.classList.contains("subtract"):
            operatorFunc("-");
            break;
        case button.classList.contains("add"):
            operatorFunc("+");
    }
    //console.log("num1: " + num1 + "\nnum2: " + num2);
}));


equate.addEventListener("click", () => {
    checked();
    equateFunc();
});


function zero(button) {
    if (!(output.textContent.startsWith("0")) || output.textContent.indexOf(".") > -1) {
        input(button, false);
    }
}

function decimal(button) {
    if (output.textContent.indexOf(".") === -1) {
        output.textContent += button.textContent;
        clearButton.textContent = "C";
    }
}

function input(button) {
    if (output.textContent.length < 9) {
        if (output.textContent === "0") {
            clear(1);
            output.textContent = button.textContent;
        } else if (output.textContent === "-0") {
            clear(1);
            output.textContent = "-" + button.textContent;
        } else if (isOperatorPressed) {
            clear(1);
            output.textContent = button.textContent;
            checked();
            isOperatorPressed = false;
        } else {
            output.textContent += button.textContent;
        }
        clearButton.textContent = "C";
    }
}

function allClear() {
    num1 = undefined;
    num2 = undefined;
    oper = undefined;
    clear(0);
    checked();
}
//clear(1);
function clear(type) {
    if (type === 0) {
        clearButton.textContent = "AC";
        output.textContent = "0";
        isOperatorPressed = false;
        num1 = 0;
    } else if (type === 1) {
        output.textContent = "";
    }
}

function negate() {
    if (isOperatorPressed) {
        output.textContent = "-0";
        isOperatorPressed = false;
    } else if (!(output.textContent.startsWith("-"))) {
        output.textContent = "-" + output.textContent;
    } else {
        output.textContent = output.textContent.slice(1);
    }
}

function percent() {
    if (output.textContent === "-0") {
        output.textContent = "0";
    } else if (output.textContent !== "0") {
        //from ChatGPT (parsefloat line and formatResult line)
        output.textContent = parseFloat(output.textContent) / 100;
        output.textContent = formatResult(output.textContent);
    }
}

function checked(button) {
    buttonOperator.forEach(button => button.classList.remove("active"));
    if (typeof button !== "undefined") { button.classList.add("active"); }
}

function solve(num1, num2, oper) {
    let ans;
    switch (true) {
        case oper === "/":
            ans = num2 === 0 ? ">:(" : num1 / num2;
            break;
        case oper === "*":
            ans = num1 * num2;
            break;
        case oper === "-":
            ans = num1 - num2;
            break;
        case oper === "+":
            ans = num1 + num2;
    }
    console.log(`${num1} ${oper} ${num2} = ${ans}`);
    return ans;
}

function equateFunc() {
    if (typeof oper !== "undefined") {
        //ChatGPT ternary operator
        num2 = typeof num2 !== "undefined" ? num2 : Number(output.textContent);
        let ans = solve(num1, num2, oper);
        output.textContent = formatResult(ans);
        num1 = ans;
        isOperatorPressed = true;
    }
}

function operatorFunc(symb) {
    if (typeof oper === "undefined") {
        num1 = Number(output.textContent);
        oper = symb;
        isOperatorPressed = true;
        //ChatGPT condition, brain died lol (elseif and else w/ else code)
    } else if (!isOperatorPressed) {
        num2 = Number(output.textContent);
        let ans = solve(num1, num2, oper);
        num1 = ans;
        output.textContent = num1;
        oper = symb;
        isOperatorPressed = true;
        num2 = undefined;
    } else {
        oper = symb;
        num2 = undefined;
    }
}


//from ChatGPT (whole funciton)
function formatResult(value) {
    return value.toString().length > 9 ? parseFloat(value).toExponential(4) : value;
}

//transition effect for same number 
//keyboard support

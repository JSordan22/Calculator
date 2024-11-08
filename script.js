let calculator = document.querySelector(".calculator");
let screen = document.querySelector(".screen");
let output = document.querySelector(".output");
let button1 = document.querySelectorAll(".button-1");
let buttonOperator = document.querySelectorAll(".button-operator");
let buttonNumber = document.querySelectorAll(".button-number");
let buttonFunction = document.querySelectorAll(".button-function");
let clearButton = document.querySelector(".AC");

buttonNumber.forEach(button => button.addEventListener("click", () => {
    switch(button.textContent) {
        case "0":
            zero(button);
            break;
        case ".":
            decimal(button);
            break;
        default:
            input(button);
    }
}));

buttonFunction.forEach(button => button.addEventListener("click", () => {
    switch(button.textContent) {
        case "AC":
            allClear();
            break;
        case "C":
            clear(button);
            break;
        case "+/-":
            negate();
            break;
        case "%":
            percent();
            break;
    }
}));

buttonOperator.forEach(button => button.addEventListener("click", () => {
        buttonOperator.forEach(button => button.classList.remove("active")); 
        button.classList.add("active");
}));


function zero(button) {
    if(!(output.textContent.startsWith("0")) || output.textContent.indexOf(".") > -1) {
        input(button);
    }
}

function decimal(button) {
    if(output.textContent.indexOf(".") === -1) {
        output.textContent += button.textContent;
        clearButton.textContent = "C";
    }
}

function input(button) {
    if(output.textContent === "0" || output.textContent === "-0") {
        output.textContent = output.textContent.replace("0", button.textContent);
    } else {
        output.textContent += button.textContent;
    }
    clearButton.textContent = "C";
}

function allClear() {
    output.textContent = "0";
    buttonOperator.forEach(button => button.classList.remove("active"));
}

function clear(button) {
    button.textContent = "AC";
    output.textContent = "0";
}

function negate() {
    if(!(output.textContent.startsWith("-"))) {
        output.textContent = "-" + output.textContent;
    } else {
        output.textContent = output.textContent.slice(1);
    }
}

function percent() {
    if(output.textContent === "-0") {
        output.textContent = 0;
    } else if(output.textContent != "0") {
        output.textContent = Math.abs(output.textContent / 100) < 1e-7 ? (output.textContent / 100).toExponential(1) : Number((output.textContent / 100).toFixed(10));
    }
}
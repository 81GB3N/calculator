let choice;

document.addEventListener('keydown', function(e) {
    choice = e.key.charCodeAt(0);
    console.log(choice);
    applyClickedClass(choice);
});

const button = document.querySelectorAll('button');
button.forEach(element => {
    element.addEventListener('click', function(e) {
        choice = this.textContent.charCodeAt(0);
        console.log(choice);
        applyClickedClass(choice);
    });
});

const input = document.querySelector('.screen1 .input');
let counter = 0;
let currentNumber = '';
let isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let newNumber = '';
let active = true;
const realAnswer = document.querySelector('.real-answer');
let answer = '0';
let firstNumber = '', secondNumber = '';
let pointCounter;

function applyClickedClass(charCode) {
    let matchingButton = document.querySelector(`button[class="${String.fromCharCode(charCode)}"]`);
    if (matchingButton) {
        matchingButton.classList.add('clicked');
        setTimeout(() => {
            matchingButton.classList.remove('clicked');
        }, 100); 
    }

    if(charCode == '8') backspace();
    if(charCode == '99') clear();
    if(matchingButton.classList[0] == '=') equal();
// console.log(matchingButton);
// console.log(`${matchingButton.classList[0]}`);
//nuo cia pzda reik viska sutvarkyt 

    if(isNumber.includes(matchingButton.classList[0]) || matchingButton.classList[0] == '.'){
        active = false;
        if(isNumber.includes(matchingButton.classList[0])){
            // currentNumber += (`${matchingButton.classList[0]}`);
            input.innerText += (`${matchingButton.classList[0]}`);
        }

    }
    // else if(firstNumber == ''){
    //     alert('enter first number!');
    // }
    else if(!active && matchingButton.classList[0] != '='){
        input.innerText += (`${matchingButton.classList[0]}`);
        active = true;
        if(matchingButton.classList[0] == '+') add();
        else if(matchingButton.classList[0] == '-') subtract();
        else if(matchingButton.classList[0] == '*') multiply();
        else if(matchingButton.classList[0] == '/') divide();
    }

}

function add(){
    answer = Number(firstNumber) + Number(secondNumber);
}

function subtract(){
    answer = Number(firstNumber) - Number(secondNumber);
}

function multiply(){
    answer = Number(firstNumber) * Number(secondNumber);
}

function divide(){
    answer = Number(firstNumber) / Number(secondNumber);
}

function equal(){
    input.innerText = '';
    currentNumber = '';
    newNumber = '';
    if(answer % 1 != 0)
        realAnswer.innerText = answer.toFixed(2);
    else
    realAnswer.innerText = answer;
    active = false;
}

function point(){

}

function backspace(){
    newNumber = currentNumber.slice(1)
    input.innerText = newNumber;
    currentNumber = newNumber;
}

function clear(){
    input.innerText = '';
    currentNumber = '';
    newNumber = '';
    realAnswer.innerText = '';
}
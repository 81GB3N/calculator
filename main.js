let choice;

document.addEventListener('keydown', function(e) {
    choice = e.key.charCodeAt(0);
    console.log(choice);//
    applyClickedClass(choice);
});

const button = document.querySelectorAll('button');
button.forEach(element => {
    element.addEventListener('click', function(e) {
        choice = this.textContent.charCodeAt(0);
        console.log(choice);//
        applyClickedClass(choice);
    });
});

const input = document.querySelector('.screen1 .input');
let isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const realAnswer = document.querySelector('.real-answer');
let answer = '0';
let firstNumber = '', secondNumber = '';
let memory = '';

function applyClickedClass(charCode) {
    let matchingButton = document.querySelector(`button[class="${String.fromCharCode(charCode)}"]`);
    if (matchingButton) {
        matchingButton.classList.add('clicked');
        setTimeout(() => {
            matchingButton.classList.remove('clicked');
        }, 100); 
    }

    if(charCode == '66')backspace();
    if(charCode == '99')clear();
    if((matchingButton.classList[0] == '-' && secondNumber == '' && firstNumber != '' && memory != 0 && (secondNumber.split('-').length - 1) == '0'))
        secondNumber += matchingButton.classList[0];
    if(isNumber.includes(matchingButton.classList[0]) || matchingButton.classList[0] == '.' || (matchingButton.classList[0] == '-' && firstNumber == '')){
        if(memory == ''){
            if(matchingButton.classList[0] == '.' && (firstNumber.split('.').length - 1) == '0'){
                firstNumber += matchingButton.classList[0];
            }
            else if(matchingButton.classList[0] == '-' && (firstNumber.split('-').length - 1) == '0' && firstNumber == ''){
                firstNumber += matchingButton.classList[0];
            }
            else if(matchingButton.classList[0] != '.' && matchingButton.classList[0] != '-'){
                firstNumber += matchingButton.classList[0];
            }
        }
        else{
            if(matchingButton.classList[0] == '.' && (secondNumber.split('.').length - 1) == '0')
                secondNumber += matchingButton.classList[0];
            else if(matchingButton.classList[0] != '.' && matchingButton.classList[0] != '-')
                secondNumber += matchingButton.classList[0];
        }
    }
    else{
        memory += (`${matchingButton.classList[0]}`);
    }
    answer = firstNumber;
    if(memory.length == '2'){
        if(memory[0] == '+') add();
        else if(memory[0] == '-') subtract();
        else if(memory[0] == '*') multiply();
        else if(memory[0] == '/') divide();
    }
    if(memory.includes('=') || charCode == '69') equal();
        input.innerText = firstNumber + memory + secondNumber;
}

function add(){
    answer = Number(firstNumber) + Number(secondNumber);
    logic();
}

function subtract(){
    answer = Number(firstNumber) - Number(secondNumber);
    logic();
}

function multiply(){
    answer = Number(firstNumber) * Number(secondNumber);
    logic();
}

function divide(){
    if(secondNumber == 0){
        answer = 'Nuh uh';
        firstNumber = '';
        secondNumber = '';
        memory = memory[1];
    }
    else{
        answer = Number(firstNumber) / Number(secondNumber);
        logic();
    }
}

function logic(){
    firstNumber = answer;
    secondNumber = '';
    memory = memory[1];
}

function equal(){
    memory = '';
    input.innerText = '';
    firstNumber = answer; //jei nori, kad skaiciai eitu is naujo tai first answer = '';
    secondNumber = '';
    if(answer == 'Nuh uh'){
        realAnswer.innerText = answer;
    }
    else if(answer % 1 != 0){
        realAnswer.innerText = Number(answer).toFixed(2);
    }
    else{
        realAnswer.innerText = answer;
    }
}

function backspace(){
    console.log('backspace');
    if(secondNumber.length)
        secondNumber = secondNumber.substring(0, secondNumber.length - 1);
    else if(memory.length)
        memory = '';
    else if(firstNumber.length)
        firstNumber = firstNumber.substring(0, firstNumber.length - 1);
        input.innerText = firstNumber + memory + secondNumber;
}
// chat gpt code

function clear(){
    input.innerText = '';
    firstNumber = '';
    secondNumber = '';
    memory = '';
    realAnswer.innerText = '';
}
const numbers =document.querySelectorAll(".numbers") ;
const operators = document.querySelectorAll(".operator");
const display = document.querySelector("#display")
const equals = document.querySelector(".equalTo")
const clear = document.querySelector("#clear")
const decimal = document.querySelector('#decimal')


let displayValue = '';
let operatorValue=[];


const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b


const calculate = (a, b, operator) => {
    a = Number(a)
    b = Number(b)
    try {
        switch (operator) {
            case '+':
                displayValue = add(a, b)
                break
            case '-':
                displayValue = subtract(a,  b)
                break
            case 'x':
                displayValue = multiply(a, b)
                break
            case '/':
                if (b === 0) {
                    displayValue = 'Error'
                    break
                }
                displayValue = divide(a, b)
                break
            default:
                break
        }

        operatorValue.shift()

        if (displayValue.length > 10) {
            displayValue = displayValue.toPrecision(6)
        }

        return displayValue.toString()
    } catch (error) {
        return 'Error'
    }
}

operators.forEach(operator => {
    operator.addEventListener("click", (e) =>{
        if(operatorValue.length > 0){
            values = displayValue.split(operatorValue[0]);
            displayValue = calculate(values[0], values[1], operatorValue[0])
            display.value = displayValue;
            operatorValue.shift()
        }
        operatorValue.push(e.target.innerText)
        displayValue += operatorValue[0]
        display.value = displayValue
    })
})


numbers.forEach(number => {
    number.addEventListener("click", (e) =>{
        displayValue += e.target.innerText;
        display.value= displayValue;
    })
})

decimal.addEventListener('click', (e) => {
    if(!displayValue.includes('.')){
        displayValue += e.target.innerText;
        display.value = displayValue;
    }
    else if(displayValue.includes('.')
        && (displayValue.includes('+'))
            || displayValue.includes('-') 
            || displayValue.includes('x') 
            || displayValue.includes('/') 
    ){
        displayValue += e.target.innerText;
        display.value = displayValue
    }
        
})


clear.addEventListener('click', (e) => {
     displayValue= '';
     operatorValue = [];
    display.value = displayValue
})


equals.addEventListener("click", (e) => {
   let values = displayValue.split(operatorValue[0])
    displayValue = calculate(values[0], values[1], operatorValue[0])
    display.value = displayValue;
})
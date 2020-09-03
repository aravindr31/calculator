class Calculator{
    constructor(historyElement,currentElement){
        this.historyElement=historyElement
        this.currentElement=currentElement
        this.clear()
    }

clear() {
    this.current=""
    this.history=""
    this.operator=undefined
}

deleteNumber(){
    this.current=this.current.toString().slice(0,-1)


}

appendNumber(num){
    if(num==='.'&&this.current.includes('.')&&this.current.toString().length()===10){
        return
    }

this.current=this.current.toString() + num.toString()
}

operationChoose(operation){
    if(this.current==='') {
        return
    }
    if(this.history !=='') {
        this.equate()
    }
    this.operation=operation
    this.history=this.current
    this.current=''
}

equate(){
    let answer
    const currentValue=parseFloat(this.current)
    const previousValue=parseFloat(this.history)
    if(isNaN(currentValue)||isNaN(previousValue)){
        return
    }
    switch (this.operation){
        case '+' :
            answer=currentValue+previousValue
            break
        case '-' :
            answer=previousValue-currentValue
            break
        case '*' :
            answer=currentValue*previousValue
            break
        case '/' :
            answer=previousValue/currentValue
            break
        default:
            return
    }
    this.current=answer
    this.history=''
    this.operator=undefined


}

updateDisplay(){
    this.currentElement.innerText=this.current
    this.historyElement.innerText=this.history

}
}

const numberButton=document.querySelectorAll('.digits');
const operatorButton=document.querySelectorAll('.operator')
const equalButton=document.querySelector('.equal');
const clearButton=document.querySelector('.clear')
const deleteButton = document.querySelector('.delete')
const currentElement=document.querySelector('.current')
const historyElement=document.querySelector('.history')

const calculator=new Calculator(historyElement,currentElement)

numberButton.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButton.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.operationChoose(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click',button =>{
    calculator.equate()
    calculator.updateDisplay()
})

clearButton.addEventListener('click',button =>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',button =>{
    calculator.deleteNumber()
    calculator.updateDisplay()
})
/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor(){
    this.res=0
  }
  add(num){
    this.res+=num
  }
  subtract(num){
    this.res-=num
  }
  multiply(num){
    this.res*=num
  }
  divide(num){
    if(num==0){
      throw new Error("Invalid Expression: Dividing by zero")
    }
    this.res/=num
  }
  clear(){
    this.res=0
  }
  getResult(){
    return this.res
  }
  calculate(inputExpression){
    const temp = inputExpression;
    const cleanedExpression = temp.replace(/\s+/g, '');
    const isValidExpression = /^[0-9+\-*/().]+$/.test(cleanedExpression);
  
    if (!isValidExpression) {
      throw new Error("Invalid expression.");
    }
  
    try {
      this.res = eval(inputExpression);
    } catch (error) {
      throw new Error("Invalid expression.");
    }
  
    if (this.res === Infinity) {
      throw new Error("Cannot divide a number by 0.");
    }
  
    return this.res;
  }


}

module.exports = Calculator;

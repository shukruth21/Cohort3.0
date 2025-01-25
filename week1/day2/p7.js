//Write a function that takes an array of numbers as input, and returns a new array with only even values. Read about filter in JS
let io=[1,2,3,4,5,6,7,8,9]
 let o= io.filter(isEven)
function isEven(n){
    if (n%2===0)return true

    return false
}
console.log(o)
//Write a function called sum that finds the sum from 1 to a number
function sum(n){
    let s=0;
    for(let i=0;i<=n;i++){
        s+=i
    }
    return s
}
let res=sum(100)
console.log(`the sum of numbers from 1 to 100 is ${res}`)
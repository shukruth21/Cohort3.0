//Write an if/else statement that checks if a number is even or odd. If it's even, print "The number is even." Otherwise, print "The number is odd."
function isEven(a){
    if (a%2===0){
        console.log(`${a} is even`)
    }
    else{
        console.log(`${a} is odd`)
    }
}

let a=23
isEven(a)
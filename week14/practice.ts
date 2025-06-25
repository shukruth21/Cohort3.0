/*
function greet(name: string){
  console.log(`hello ${name}`)
}

greet('shukruth')

/* here the return type is implicitly infered by the compiler
function sum(a: number,b: number){
    return a+b
}

const ans: number = sum(4,5)
console.log(ans) 
*/

/*function sum(a: number,b: number):number{
    return a+b
}

let ans = sum(2,3)
console.log(ans) */
interface User {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
}

const user = {
	firstName: "harkirat",
	lastName: "singh",
	email: "email@gmail.com",
	age: 21,
}

function isLegal(user: User){
    if (user.age> 18){
        return true
    }
    else{
        return false
    }
}
console.log(isLegal(user))
//Write a function that takes an array of users as inputs and returns only the users who are more than 18 years old

const users=[
    {
        name: "a",
        age: 19
    },{
        name:"b",
        age: 20
    },{
        name:"c",
        age: 17
    },{
        name:"d",
        age: 16
    },{
        name:"e",
        age: 15
    }
]
let res= users.filter(solve)

function solve(users){
   if(users.age >18) return true
   return false
}

console.log(res)
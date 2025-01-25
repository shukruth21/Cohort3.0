//Create a function that takes an array of objects as input,
//and returns the users whose age > 18 and are male


const users=[
    {
        name: "a",
        age: 19,
        gender: "m"
    },{
        name:"b",
        age: 20,
        gender: "f"
    },{
        name:"c",
        age: 17,
        gender: "f"
    },{
        name:"d",
        age: 16,
        gender: "f"
    },{
        name:"e",
        age: 32,
        gender: "m"
    }
]
let res= users.filter(solve)

function solve(users){
   if(users.age >18 && users.gender==="m") return true
   return false
}

console.log(res)
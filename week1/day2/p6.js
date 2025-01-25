//Write a function that takes a new object as input which has name , age  and gender and greets the user with their gender (Hi Mr/Mrs/Others harkirat, your age is 21)
//Also tell the user if they are legal to vote or not
let user={
    name: "shukruth",
    gender: "M",
    age: 22
}
function usage(user){
    if(user.gender ==="M"){
        console.log(`Hi Mr ${user.name} your age is ${user.age}`)
    }
    else{
        console.log(`Hi Mrs ${user.name} your age is ${user.age}`)
    }
}
usage(user)
if (user.age >=18){
    console.log('you are legal to vote')
}
else {
    console.log('you are not legal to vote')
}
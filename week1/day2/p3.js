//Write a function called canVote that returns true or false if the age of a user is > 18
function canvote(isAge){
    if (isAge >19){
        return true 
    }
    return false
}
let age = 18
let res=canvote(age)
console.log(`voter can vote =${res}`)
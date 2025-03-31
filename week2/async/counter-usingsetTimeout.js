let cnt=0
function counter(){
    console.log(cnt)
    cnt=cnt+1
    setTimeout(counter,1000)
}
setTimeout(counter,1000
)
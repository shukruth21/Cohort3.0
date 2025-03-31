let cnt =0
function increaseAndPrint(){
    console.log(cnt)
    cnt=cnt+1
}
setInterval(increaseAndPrint,1000)//this calls the function after every 1s
/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    let p=new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },milliseconds)
    })
    return p
}
async function demo() {
    await sleep(30)
    console.log('waited for 3 seconds')
}
demo()

module.exports = sleep;

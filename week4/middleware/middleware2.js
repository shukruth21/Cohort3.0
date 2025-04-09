//here we declare middleware to handle authorisations and validations
// letting the routes do what they were meant to and not involve in 
// authorising or handling errors

// there is a better syntax for this middleware checking 

const express=require('express')

const app =express()

function isOldenoughmiddleware(req,res,next){
    const age=req.query.age
    if(age>=14){
        next()
    }else{
        res.status(411).json({
            msg:'sorry you are not of age yet'
        })
    }
}

app.get("/ride2",isOldenoughmiddleware,function(req,res){
    res.json({
        msg:'you have successfully ridden ride 2'
    })
    
})
app.get("/ride1",function(req,res){
    res.json({
        msg:'you have successfully ridden ride 1'
    })
    
})

app.listen(3000)
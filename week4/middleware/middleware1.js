// there is a better syntax for this middleware checking 

const express=require('express')

const app =express()

function isOldenough(age){
    if(age>=14){
        return true
    }else{
        return false
    }
}

app.get("/ride2",function(req,res){
    if(isOldenough(req.query.age)){
        res.json({
            msg:'you have successfully ridden ride 2'
        })
    }else{
        res.status(411).json({
            msg:'sorry you are not of age yet'
        })
    }
})
app.get("/ride1",function(req,res){
    if(isOldenough(req.query.age)){
        res.json({
            msg:'you have successfully ridden ride 1'
        })
    }else{
        res.status(411).json({
            msg:'sorry you are not of age yet'
        })
    }
})

app.listen(3000)
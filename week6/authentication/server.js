const express= require('express')
const app= express()
app.use(express.json())

let users=[]

const JWT_SECRET="USER_APP"

app.post('/signup',function(req,res){
    const username=req.body.username
    const password=req.body.pwd
    users.push({
        username: username,
        password: password,
    })
    res.json({
        msg:'successfully signed up'
    })
})

app.post('/signin',function(req,res){
    
    const username=req.body.username
    const password=req.body.pwd
    const user = users.find(user=> user.username ===username && user.password=== password)
    if(user){
        const token=jwt.sign({
            username: user.username
        },JWT_SECRET)
        user.token=token
        res.json({
            msg: `${token} created`
        })
        console.log(users)
    }else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    } 
})
app.get("/me",function(req,res){
    const token=req.headers.token
    const userDetails=jwt.verify(token,JWT_SECRET)
    const username=userDetails.username
    const user = users.find(user => user.username===username)
    if(user){
        res.json({
            username: user.username,
            password: user.password
        })
    }else{
        res.json({
            msg:"token invalid"
        })
    }
})

app.listen(3000)
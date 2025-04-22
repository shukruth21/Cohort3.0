const express = require("express");
const { UserModel, TodoModel } = require("./db");
const JWT_SECRET="s3cret"
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://shukruth:$Hukruth210503@cluster0.mtmxgzu.mongodb.net/todo-app-database")

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
});


app.post('/signin',async function (req,res) {
    const email = req.body.email
    const password = req.body.password

    const response = await UserModel.findOne({
        email: email,
        password: password,
    })
    if(response){
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_SECRET)
        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "incorrect creds"
        })
    }
})
function auth(req, res, next) {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Verify the token using the jwt.verify() method
    const decodedData = jwt.verify(token, JWT_SECRET);

    // If the token is valid, set the userId in the request object and call the next middleware
    if (decodedData) {
        // Set the userId in the request object
        req.userId = decodedData.id;

        // Call the next middleware
        next();
    } else {
        // If the token is invalid, send an error message to the client
        res.status(403).json({
            message: "Invalid Token!",
        });
    }
}



app.post("/todo",auth,async function(req, res) {
    const userId = req.userId;

    // Get the title, and done from the request body
    const title = req.body.title;
    const done = req.body.done;

    // Create a new todo using the TodoModel.create() method
    await TodoModel.create({
        userId,
        title,
        done,
    });

    // Send a response to the client
    res.json({
        message: "Todo created",
    });

});


app.get("/todos",auth,async function(req, res) {
    // Get the userId from the request object
    const userId = req.userId;

    // Find all the todos with the given userId
    const todos = await TodoModel.find({
        userId,
    });

    // Send the todos to the client
    res.json({
        todos,
    });

});

app.listen(3000);
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const JWT_SECRET = "kirat123123";

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

// localhost:3000
app.use(express.static("./public"))

app.post("/signup", logger, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Check if the username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({
            message: "Username already exists"
        });
    }

    users.push({
        username: username,
        password: password
    });

    res.json({
        message: "You are signed up"
    });
});

app.post("/signin", logger, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i];
            break; // Exit the loop once the user is found
        }
    }

    if (!foundUser) {
        res.status(401).json({
            message: "Credentials incorrect"
        });
        return;
    } else {
        const token = jwt.sign({
            username: foundUser.username // Use foundUser instead of users[i]
        }, JWT_SECRET);
        res.header("jwt", token);

        res.json({
            token: token
        });
    }
});

function auth(req, res, next) {
    try {
        const token = req.headers.token;
        const decodedData = jwt.verify(token, JWT_SECRET);

        if (decodedData.username) {
            req.username = decodedData.username;
            next();
        } else {
            res.status(401).json({
                message: "You are not logged in"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

app.get("/me", logger, auth, function(req, res) {
    const currentUser = req.username;
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser) {
            foundUser = users[i];
            break; // Exit the loop once the user is found
        }
    }

    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

app.listen(3000);
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const JWT_SECRET = "shukruth";

const app = express();
app.use(express.json());
app.use(cors());

const todos = [];
const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

function auth(req, res, next) {
    const token = req.headers.token; // Extract token from headers
    if (!token) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
        req.username = decoded.username; // Attach username to the request
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}

app.post("/signup", logger, function (req, res) {
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

app.post("/signin", logger, function (req, res) {
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

app.post('/create', logger, auth, (req, res) => {
    const title = req.body.title;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const id = Math.floor(Math.random() * 1000) + 1; // Generate random ID between 1 and 1000
    const todo = { title, id, isDone: false, username: req.username }; // Associate todo with the user
    todos.push(todo);

    res.json({
        message: "Todo created successfully",
        todo
    });
});

app.put('/edit', logger, auth, (req, res) => {
    const id = req.body.id;
    const newData = req.body.data;

    if (!id || !newData) {
        return res.status(400).json({ message: "ID and new data are required" });
    }

    const todo = todos.find(todo => id === todo.id && todo.username === req.username); // Ensure the todo belongs to the user
    if (todo) {
        todo.title = newData;
        res.json({
            message: "Todo updated successfully",
            todo
        });
    } else {
        res.status(404).json({
            message: "Todo not found or you do not have permission to edit it"
        });
    }
});

app.delete('/delete', logger, auth, (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const index = todos.findIndex(todo => todo.id === id && todo.username === req.username); // Ensure the todo belongs to the user
    if (index !== -1) {
        todos.splice(index, 1);
        res.json({
            message: "Todo deleted successfully"
        });
    } else {
        res.status(404).json({
            message: "Todo not found or you do not have permission to delete it"
        });
    }
});

app.put('/mark', logger, auth, (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).json({ message: "ID is required" });
    }

    const todo = todos.find(todo => todo.id === id && todo.username === req.username); // Ensure the todo belongs to the user
    if (todo) {
        todo.isDone = !todo.isDone;
        res.json({
            message: "Todo status has been updated",
            todo
        });
    } else {
        res.status(404).json({
            message: "Todo not found or you do not have permission to update it"
        });
    }
});

app.get('/todos', logger, auth, (req, res) => {
    const userTodos = todos.filter(todo => todo.username === req.username); // Filter todos for the logged-in user
    res.json({
        message: "Todos fetched successfully",
        todos: userTodos
    });
});

app.listen(3000);
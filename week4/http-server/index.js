const express = require("express");
const app = express();

let todos = [];

// Middleware to parse JSON data
app.use(express.json());

app.post("/", function (req, res) {
    // Create a random ID for the todo
    const title = req.body.title;
    const id = Math.floor(Math.random() * 1000000);
    todos.push({
        title,
        id,
    });
    res.json({
        msg: "todo added successfully",
        todo: { title, id },
    });
});

app.delete("/", function (req, res) {
    // Extract the todo ID
    const id = req.body.id;
    // Remove the todo from the list
    todos = todos.filter((todo) => todo.id !== id);
    res.json({
        msg: "todo deleted successfully",
    });
});

app.get("/", function (req, res) {
    // Return all the todos in the list
    res.json({
        todos,
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
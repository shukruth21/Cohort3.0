let ctr = 1;
let todos = [];

function addTodo() {
    const inputValue = document.querySelector("input").value.trim();
    if (inputValue === "") return; // Prevent adding empty todos

    todos.push({
        id: ctr,
        description: inputValue,
        isDone: false // Add a property to track the "done" state
    });
    document.querySelector('input').value = "";
    ctr++;
    render(todos);
}

function render(todos) {
    const todoList = document.getElementById('root');
    todoList.innerHTML = ""; // Clear the list before re-rendering
    todos.forEach(todo => {
        const div = document.createElement('div');
        const h4 = document.createElement('h4');
        const doneButton = document.createElement('button');

        doneButton.innerHTML = "Done";
        doneButton.setAttribute('id', todo.id);
        doneButton.setAttribute('onclick', 'doneTodo(this)');
        doneButton.classList.add('done-button'); // Add a class to the button

        h4.innerHTML = `${todo.description}`;
        if (todo.isDone) {
            h4.classList.add('completed'); // Apply the "completed" class if the todo is done
        }

        div.appendChild(h4);
        div.appendChild(doneButton);
        div.setAttribute('id', todo.id);
        div.classList.add('todo-item'); // Add a class to the div

        todoList.appendChild(div);
    });
}

function doneTodo(button) {
    const todoId = parseInt(button.id); // Get the ID of the todo
    const todo = todos.find(t => t.id === todoId); // Find the corresponding todo in the array
    if (todo) {
        todo.isDone = !todo.isDone; // Toggle the "done" state
    }
    render(todos); // Re-render the list to reflect the changes
}

render(todos);
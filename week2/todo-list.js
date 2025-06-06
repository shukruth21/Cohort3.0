/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.todos=[]
  }
  add(todo){
    this.todos.push(todo)
  }
  remove(idx){
    this.todos.splice(idx, 1); 
  }
  update(idx,newtodo){
    if (idx < 0 || idx >= this.todos.length) {
      return;
  }
  this.todos[idx] = newtodo;
  }
  getAll(){
    return this.todos
  }
  get(idx){
    if(idx<0 || idx >=this.todos.length){
      return null;
    }
    return this.todos[idx]
  }
  clear(){
    this.todos=[]
  }
}

module.exports = Todo;

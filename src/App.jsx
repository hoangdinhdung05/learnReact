import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import './components/todo/todo.css'
import { useState } from "react";

const App = () => {

  const [todoList, setTodoList] = useState([]);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 100),
      name: name,
      completed: false
    }
    setTodoList((prevList) => ([...prevList, newTodo]));
  };

  const handleDeleteTodo = (id) => {
    setTodoList((prevList) => prevList.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodoList((prevList) => prevList
      .map(todo => todo.id === id ? 
        {...todo, completed: !todo.completed} : todo));
  }

  return (  
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew 
        addNewTodo = {addNewTodo}
      />
      <TodoData 
        todoList={todoList}
        onDeleteTodo={handleDeleteTodo}
        onToggleTodo={handleToggleTodo}
      />
    </div>
  );
};

export default App

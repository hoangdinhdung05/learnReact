import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import './components/todo/todo.css'
import { useState } from "react";

const App = () => {

  const [todoList, setTodoList] = useState([
    // {
    //   id: 1,
    //   name: "HoangDung"
    // }
  ]);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // const data = {
  //   name: "HoangDung",
  //   age: 20
  // }

  const addNewTodo = (name) => {

    const newTodo = {
      id: randomIntFromInterval(1, 100),
      name: name
    }

    setTodoList([...todoList, newTodo]);

  };

  return (  
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew 
        addNewTodo = {addNewTodo} //không có () truyền tham chiếu
      />
      <TodoData 
        // data = {data}
        todoList = {todoList}
      />
    </div>
  );
};

export default App

import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import './components/todo/todo.css'

const App = () => {

  return (  
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew />
      <TodoData />
    </div>
  );
};

export default App

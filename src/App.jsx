import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import './components/todo/todo.css'

const App = () => {

  const data = {
    name: "HoangDung",
    age: 20
  }

  const addNewTodo = (name) => {

    alert(`Add new todo ${name}`);

  };

  return (  
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew 
        addNewTodo = {addNewTodo} //không có () truyền tham chiếu
      />
      <TodoData 
        data = {data}
      />
    </div>
  );
};

export default App

import { Button, Checkbox } from 'antd';

const TodoData = ({ todoList, onDeleteTodo, onToggleTodo }) => {
  const showTodoList = () => {
    if (todoList.length === 0) {
      return (
        <div className="todo-item">
          <span>Chưa có công việc</span>
        </div>
      );
    } else {
      return todoList.map((todo) => (
        <div key={todo.id} className="todo-item">
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggleTodo(todo.id)}
          >
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'gray' : 'black',
              }}
            >
              {todo.name}
            </span>
          </Checkbox>

          <Button
            danger
            size="small"
            style={{ marginLeft: "10px" }}
            onClick={() => onDeleteTodo(todo.id)}
          >
            Xoá
          </Button>
        </div>
      ));
    }
  };

  return <div className="todo-data">{showTodoList()}</div>;
};

export default TodoData;

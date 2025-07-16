
const TodoNew = (props) => {

    console.log("Check props", props);
    const { addNewTodo } = props;

    addNewTodo("Dung");
    return (
        <div className="todo-new">
            <input type="text" name="" id="" className="todo-input" placeholder="Add new todo"/>
            <button className="todo-btn-add">Add</button>
        </div>
    );
};

export default TodoNew;
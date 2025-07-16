
const TodoNew = (props) => {

    console.log("Check props", props);
    const { addNewTodo } = props;

    const handleClick = () => {
        console.log("Click");
    };

    const handleChange = (name) => {
        console.log(name);
    };

    addNewTodo("Dung");
    return (
        <div className="todo-new">
            <input type="text" name="" id="" className="todo-input" placeholder="Add new todo" onChange={(event) => handleChange(event.target.value)}/>

            <button className="todo-btn-add" onClick={handleClick}>Add</button>
        </div>
    );
};

export default TodoNew;
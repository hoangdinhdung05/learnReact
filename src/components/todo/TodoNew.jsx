import { useState } from "react";

const TodoNew = (props) => {

    const [ valueInput, setValueInput ] = useState("");

    console.log("Check props", props);
    const { addNewTodo } = props;

    const handleClick = () => {
        console.log("Click");
        addNewTodo(valueInput);
    };

    const handleChange = (name) => {
        console.log(name);
        setValueInput(name);
    };

    // addNewTodo("Dung");
    return (
        <div className="todo-new">
            <input type="text" name="" id="" className="todo-input" placeholder="Add new todo" 
                onChange={(event) => handleChange(event.target.value)}/>

            <button className="todo-btn-add" onClick={handleClick}>Add</button>

            <div style={{color: "red", marginLeft: "10px"}}>
                {valueInput}
            </div>
        </div>
    );
};

export default TodoNew;
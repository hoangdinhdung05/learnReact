import { useState } from "react";

const TodoNew = ({ addNewTodo }) => {

    const [ valueInput, setValueInput ] = useState("");

    const handleClick = () => {
        console.log("Click add new todo");
        if(valueInput.trim() === "") {
            console.log("Không được để trống");
            return;
        }
        addNewTodo(valueInput);
        setValueInput(""); // reset
    };

    const handleChange = (name) => {
        console.log(name);
        setValueInput(name);
    };

    return (
        <div className="todo-new">
            <input 
                type="text" 
                value={valueInput} 
                className="todo-input" 
                placeholder="Add new todo" 
                onChange={(event) => handleChange(event.target.value)}
            />

            <button className="todo-btn-add" onClick={handleClick}>Add</button>

            <div style={{color: "red", marginLeft: "10px"}}>
                {valueInput}
            </div>
        </div>
    );
};

export default TodoNew;
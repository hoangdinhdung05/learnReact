
const TodoData = (props) => {

    //props là 1 object
    /*
        props = {
            name: "HoangDung",
            age: 20
        }
    */
    const { name, age } = props.data;

    console.log(props);

    return (
        <div className="todo-data">
            <div className="todo-item">My name is {name}</div>
            <div className="todo-item">My age is {age}</div>
        </div>
    );
};

export default TodoData;
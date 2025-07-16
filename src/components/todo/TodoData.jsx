
const TodoData = (props) => {

    //props là 1 object
    /*
        props = {
            name: "HoangDung",
            age: 20
        }
    */

    console.log(props);

    return (
        <div className="todo-data">
            <div className="todo-item">
                JSON.stringify(props) = {JSON.stringify(props)}
            </div>
        </div>
    );
};

export default TodoData;
import { useSelector } from "react-redux";
import Todo from "./Todo";

function TodoList() {

    //the state passed as argument is the state of the entire store, if we have multiple slices...
    //it'll return the state of all slices, therefore we have to specify state.todos
    const todoList = useSelector((state) => state.todos);
    console.log(todoList);

    return (
        <div className="tasks-list">
            {/* when rendering a jsx element from array map, we need a unique key attached to each item */}
            {todoList.map(todo => <Todo key={todo.id} todo={todo} />)}

        </div>
    );
}

export default TodoList;
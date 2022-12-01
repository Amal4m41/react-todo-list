import { useSelector } from "react-redux";


function TodoCount() {
    const todoList = useSelector(state => state.todos);

    return (
        <div className="todo-count">
            Completed: {todoList.filter(t => t.isCompleted === true).length}/{todoList.length}
        </div>
    )
}

export default TodoCount;
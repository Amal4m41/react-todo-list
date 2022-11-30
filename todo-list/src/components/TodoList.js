import Todo from "./Todo";

function TodoList({ todosList, deleteTodo, updateTodo }) {
    return (
        <div className="tasks-list">
            {/* when rendering a jsx element from array map, we need a unique key attached to each item */}
            {todosList.map(todo => <Todo key={todo.id} todo={todo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
            />)}

        </div>
    );
}

export default TodoList;
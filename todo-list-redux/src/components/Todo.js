import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodoAsync, updateTodoAsync } from "../redux/todoSlice";

function Todo({ todo }) {
    const [isEdit, setIsEdit] = useState(false);
    const [todoValue, setTodoValue] = useState(todo);

    // TODO: check later(props passed is true, but useState returns false)
    // console.log('VALUE PASSED: ', todo);
    // console.log('VALUE: ', todoValue);

    const dispatch = useDispatch();

    const handleTodoUpdate = e => {

        if (isEdit) {
            if (!todoValue.content.trim()) {
                alert('Please enter a task to save');
                return;
            }
            dispatch(
                updateTodoAsync({
                    id: todoValue.id,
                    content: todoValue.content,
                })
            ); //update the todo list.
        }
        setIsEdit(!isEdit);
    };

    const handleDeleteTodo = e => dispatch(deleteTodoAsync({ id: todoValue.id }));
    const handleToggleTodo = e => dispatch(updateTodoAsync({ id: todoValue.id, isCompleted: !todo.isCompleted }))

    return (
        <div className="task-item" style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
            <input type="checkbox" className="task-checkbox" checked={todo.isCompleted}
                onChange={handleToggleTodo} />
            <div className="task-content-value">
                <input type="text" className="input-task-content"
                    onChange={(e) => setTodoValue({ ...todoValue, content: e.target.value })}
                    value={todoValue.content}
                    readOnly={!isEdit} />
            </div>
            <div className="actions">
                <button className="edit" onClick={handleTodoUpdate}>{isEdit ? 'Save' : 'Edit'}
                </button>
                <button className="delete" onClick={handleDeleteTodo} >Delete</button>
            </div>
        </div >
    );
}


export default Todo;
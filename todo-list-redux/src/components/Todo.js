import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/todoSlice";

function Todo({ todo }) {
    const [isEdit, setIsEdit] = useState(false);
    const [todoValue, setTodoValue] = useState(todo);

    const dispatch = useDispatch();

    return (
        <div className="task-item" style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
            <div className="task-content-value">
                <input type="text" className="input-task-content"
                    onChange={(e) => setTodoValue({ ...todoValue, task: e.target.value })}
                    value={todoValue.content}
                    readOnly={!isEdit} />
            </div>
            <div className="actions">
                <button className="edit" onClick={(e) => {

                    if (isEdit) {
                        if (!todoValue.task.trim()) {
                            alert('Please enter a task to save');
                            return;
                        }
                        // updateTodo(todoValue.id, todoValue.task);
                    }
                    setIsEdit(!isEdit)
                }
                }
                >
                    {isEdit ? 'Save' : 'Edit'
                    }</button>
                <button className="delete" onClick={(e) => {
                    dispatch(
                        deleteTodo(todo.id)
                    );
                }} >Delete</button>
            </div>
        </div >
    );
}


export default Todo;
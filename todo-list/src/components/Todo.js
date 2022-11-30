import { useState } from "react";

function Todo({ todo, deleteTodo, updateTodo }) {
    const [isEdit, setIsEdit] = useState(false);
    const [todoValue, setTodoValue] = useState(todo);


    return (
        <div className="task-item" style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
            <div className="task-content-value">
                <input type="text" className="input-task-content"
                    onChange={(e) => setTodoValue({ ...todoValue, task: e.target.value })}
                    value={todoValue.task}
                    readOnly={!isEdit} />
            </div>
            <div className="actions">
                <button className="edit" onClick={(e) => {

                    if (isEdit) {
                        if (!todoValue.task.trim()) {
                            alert('Please enter a task to save');
                            return;
                        }
                        updateTodo(todoValue.id, todoValue.task);
                    }
                    setIsEdit(!isEdit)
                }
                }
                >
                    {isEdit ? 'Save' : 'Edit'
                    }</button>
                <button className="delete" onClick={(e) => deleteTodo(todoValue.id)}>Delete</button>
            </div>
        </div>
    );
}


export default Todo;
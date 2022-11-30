import { useState } from "react";
import { v4 } from 'uuid';

function TodoForm({ addTodo }) {
    const [todo, setTodo] = useState({
        id: '', task: ''
    });

    //event target value will contain the new input from user.
    const handleTaskInputChange = e => setTodo({ ...todo, task: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        if (todo.task.trim()) {
            addTodo({ ...todo, id: v4() });
            console.log(todo);
            setTodo({ ...todo, task: '' }); //reset task
        }
        else {
            alert('Please enter a task to add');
        }
    };

    return (
        <form id="form-add-task" onSubmit={handleSubmit}>
            <input type="text" placeholder="Add new task" id="new-task-input"
                value={todo.task}
                onChange={handleTaskInputChange}
            />
            <input type="submit" id="submit-add-task" value="Add task" />
        </form>
    );
}


export default TodoForm;
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';

function TodoForm() {
    const [taskContent, setTaskContent] = useState('');
    const dispatch = useDispatch();

    //event target value will contain the new input from user.
    const handleTaskInputChange = e => setTaskContent(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        if (taskContent.trim()) {
            console.log(taskContent);
            dispatch(
                addTodo(taskContent)
            );
            setTaskContent(''); //reset task
        }
        else {
            alert('Please enter a task to add');
        }
    };

    return (
        <form id="form-add-task" onSubmit={handleSubmit}>
            <input type="text" placeholder="Add new task" id="new-task-input"
                value={taskContent}
                onChange={handleTaskInputChange}
            />
            <input type="submit" id="submit-add-task" value="Add task" />
        </form>
    );
}


export default TodoForm;
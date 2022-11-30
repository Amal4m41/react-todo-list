import { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

/*
React state is immutable, can't be modified directly.
useState is a function that takes in a initial state as an arugment and returns a tuple array of a 'state' object and 'setState' function,
since the state object is immutable we use setState to update the state.  
*/

//a component
function App() {

  // const [state, setState] = useState([]);
  const [todoList, setTodoList] = useState([]);

  const addTodo = todo => {
    // todoList.push(todo);
    // setTodoList(todoList);
    setTodoList([todo, ...todoList]);
  };

  return (
    <div className="App">
      <p>React Todo</p>
      <TodoForm addTodo={addTodo} />

      <TodoList
        todosList={todoList}
        deleteTodo={(todoId) => setTodoList(todoList.filter(e => e.id !== todoId))}
        updateTodo={(todoId, todoTask) => {

          const editedtask = todoList.filter(e => e.id === todoId)[0];
          const tasks = todoList.filter(e => e.id !== todoId);
          setTodoList([editedtask, ...tasks]);
        }}
      />

    </div>
  );
}

export default App;

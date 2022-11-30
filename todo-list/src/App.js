import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';



const LOCAL_STORAGE_KEY = 'todo-list-key';

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

  //Load initial value for todoList, when there's empty dependencies the effect is 
  //invoked the first time the component is rendered. 
  useEffect(
    () => {
      const listValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (listValue.length !== 0) {
        setTodoList(listValue);
      }
      console.log(listValue);
    },
    []
  );

  //Whenever todoList is updated, update the value in the local storage.
  useEffect(
    () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
    },
    [todoList]
  );

  return (
    <div className="App">
      <p>React Todo</p>
      <TodoForm addTodo={addTodo} />

      <TodoList
        todosList={todoList}
        deleteTodo={(todoId) => setTodoList(todoList.filter(e => e.id !== todoId))}
        updateTodo={(todoId, todoTask) => {

          const editedtask = todoList.filter(e => e.id === todoId)[0];
          editedtask.task = todoTask;
          const tasks = todoList.filter(e => e.id !== todoId);
          setTodoList([editedtask, ...tasks]);
        }}
      />

    </div>
  );
}

export default App;

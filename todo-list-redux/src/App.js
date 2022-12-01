import React from 'react';
import './App.css';
import TodoCount from './components/TodoCount';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <h1>React Redux Todo</h1>
      <TodoForm />
      <TodoList />
      <TodoCount />
    </div>
  );
}

export default App;

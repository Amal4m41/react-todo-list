import React from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Redux Todo</h1>
        <TodoForm />
      </header>
      <TodoList />
    </div>
  );
}

export default App;

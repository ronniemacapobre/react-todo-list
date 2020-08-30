import React, { useState, useEffect } from 'react';

import Form from './components/Form';
import TodoList from './components/TodoList';

import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case 'completed':
          setFilteredTodos(todos.filter((todo) => todo.completed));
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter((todo) => !todo.completed));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };

    const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };

    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };

  return (
    <div className='App'>
      <header>
        <h1>Ronnie's Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={filteredTodos}
        setTodos={setTodos}
        status={status}
        setStatus={setStatus}
      />
      <TodoList todos={filteredTodos} setTodos={setTodos} />
    </div>
  );
};

export default App;

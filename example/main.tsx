import React from 'react';
import ReactDOM from 'react-dom/client';
import { Table } from './table';
import { createTodoTable } from './todos/create-todo-table';
import { fetchTodosFx } from './todos/model';
import './index.css';

fetchTodosFx();
const todoTableStore = createTodoTable();

const App = () => {
  return (
    <div
      className="bg-white p-6 shadow-2xl shadow-indigo-900/50 mt-16 rounded-2xl"
      style={{
        maxWidth: 900,
      }}
    >
      <Table store={todoTableStore} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

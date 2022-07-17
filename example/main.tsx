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
      className="card mt-5 shadow-lg"
      style={{
        maxWidth: 900,
      }}
    >
      <div className="card-body">
        <Table store={todoTableStore} />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import { Todo } from './types';

export const fetchTodos = (): Promise<Todo[]> =>
  fetch('https://jsonplaceholder.typicode.com/todos').then((response) =>
    response.json()
  );

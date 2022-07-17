import { createEffect, createStore } from 'effector';
import { fetchTodos } from './api';
import { Todo } from './types';

export const fetchTodosFx = createEffect(fetchTodos);
export const $todos = createStore<Todo[]>([]).on(
  fetchTodosFx.doneData,
  (_, payload) => payload
);

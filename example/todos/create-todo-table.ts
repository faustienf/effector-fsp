import { createStore } from 'effector';
import { createSorting, Comparator } from 'src/create-sorting';
import { createFilters } from 'src/create-filters';
import { createPagination } from 'src/create-pagination';
import { TableStore } from '../table/use-table';
import { $todos, fetchTodosFx } from './model';
import type { Todo } from './types';

const todoComparator: Comparator<Todo> = (records, field, order) => {
  if (!field) return 0;

  const [a, b] = order === 'asc' ? records : records.reverse();
  const aValue = a[field];
  const bValue = b[field];

  return typeof aValue === 'number'
    ? aValue - Number(bValue)
    : String(aValue).localeCompare(String(bValue));
};

export const createTodoTable = (): TableStore<Todo> => {
  const $columns = createStore<(keyof Todo)[]>(['id', 'title', 'completed']);

  const filters = createFilters($todos, (todo, field, value) =>
    String(todo[field]).toLowerCase().includes(value.toLowerCase())
  );

  const sorting = createSorting({
    $allRecords: filters.$filtredRecords,
    comparator: todoComparator,
    initialField: 'id' as keyof Todo,
    initialOrder: 'desc',
  });

  const pagination = createPagination(sorting.$sortedRecords, 10);

  return {
    $loading: fetchTodosFx.pending,
    $columns,
    filters,
    sorting,
    pagination,
  };
};

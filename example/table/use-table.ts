import { Store } from 'effector';
import {
  createContext,
  ReactElement,
  useContext,
  ProviderProps,
  Provider,
} from 'react';

import type { FilteringContext } from 'src/create-filters';
import type { PaginationContext } from 'src/create-pagination';
import type { SortingContext } from 'src/create-sorting';

export type TableStore<R> = {
  $loading: Store<boolean>;
  $columns: Store<(keyof R)[]>;
  pagination: PaginationContext<R>;
  filters: FilteringContext<R, keyof R, string>;
  sorting: SortingContext<R, keyof R | null>;
};

const context = createContext<TableStore<Record<string, unknown>>>(null!);

export const TableProvider: <R extends Record<string, unknown>>(
  props: ProviderProps<TableStore<R>>
) => ReactElement | null = context.Provider as Provider<any>;

export const useTable = () => {
  const store = useContext(context);

  if (!store) {
    throw new Error("Table Store doesn't exist");
  }

  return store;
};

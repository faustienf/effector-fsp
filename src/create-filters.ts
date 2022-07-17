import { createStore, createEvent, Store, combine, Event } from 'effector';

export type FilteringContext<R, F, V> = {
  $allRecords: Store<R[]>;
  $filters: Store<Map<F, V>>;
  $filtredRecords: Store<R[]>;
  filterChanged: Event<[F, V]>;
};

export const createFilters = <R, F = keyof R, V = string>(
  $allRecords: Store<R[]>,
  onFilter: (record: R, field: F, value: V) => boolean
): FilteringContext<R, F, V> => {
  const reset = createEvent();
  const $filters = createStore(new Map<F, V>()).reset(reset);
  const filterChanged = createEvent<[F, V]>();

  $filters.on(filterChanged, (state, [field, value]) => {
    const nextState = new Map<F, V>(state);
    nextState.set(field, value);
    return nextState;
  });

  const $filtredRecords = combine(
    $allRecords,
    $filters,
    (allRecords, filters) => {
      const filterEntries = Array.from(filters).filter(
        ([, value]) => value !== undefined && value !== null
      );

      return allRecords.filter((record) =>
        filterEntries.every(([field, value]) => onFilter(record, field, value))
      );
    }
  );

  return {
    $allRecords,
    $filters,
    $filtredRecords,
    filterChanged,
  };
};

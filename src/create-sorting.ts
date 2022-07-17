import {
  createStore,
  createEvent,
  combine,
  Store,
  Event,
  sample
} from 'effector';

type Nullable<T> = NonNullable<T> | null;

export type Order = 'asc' | 'desc';

export type Comparator<R = unknown, F = keyof R> = (
  [a, b]: [R, R],
  field: Nullable<F>,
  order: Order
) => number;

export type SortingContext<R, F> = {
  $allRecords: Store<R[]>;
  $field: Store<F>;
  $order: Store<Order>;
  $sortedRecords: Store<R[]>;
  reset: Event<void>;
  sortedBy: Event<F>;
  orderedBy: Event<Order>;
};

type Options<R, F, C> = {
  $allRecords: Store<R[]>;
  comparator: C;
  initialField?: F;
  initialOrder?: Order;
};

export const createSorting = <
  R = unknown,
  F = keyof R,
  C extends Comparator<R, F> = Comparator<R, F>
>({
  $allRecords,
  comparator,
  initialField,
  initialOrder = 'asc'
}: Options<R, F, C>): SortingContext<R, Nullable<F>> => {
  const $field = createStore(initialField ?? null);
  const $order = createStore(initialOrder);
  const reset = createEvent();
  const sortedBy = createEvent<Nullable<F>>();
  const orderedBy = createEvent<Order>();

  $field.reset(reset);
  $order.reset(reset);

  sample({
    clock: orderedBy,
    target: $order
  });

  sample({
    clock: sortedBy,
    source: {
      field: $field,
      order: $order
    },
    filter: ({ field }, nextField) => field === nextField,
    fn: ({ order }) => (order === 'asc' ? 'desc' : 'asc'),
    target: orderedBy
  });

  sample({
    clock: sortedBy,
    target: $field
  });

  const $sortedRecords = combine(
    $allRecords,
    $field,
    $order,
    (allRecords, field, order) =>
      allRecords.slice().sort((a, b) => comparator([a, b], field, order))
  );

  return {
    $allRecords,
    $field,
    $order,
    $sortedRecords,
    reset,
    sortedBy,
    orderedBy
  };
};

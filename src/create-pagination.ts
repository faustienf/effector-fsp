import {
  createStore,
  createEvent,
  combine,
  Store,
  Event,
  sample,
} from 'effector';

export type PaginationContext<R> = {
  $page: Store<number>;
  $pages: Store<number>;
  $allRecords: Store<R[]>;
  $pageRecords: Store<R[]>;
  $allRecordsCount: Store<number>;
  $recordsPerPage: Store<number>;
  $recordsFrom: Store<number>;
  $recordsTo: Store<number>;
  $isFirstPage: Store<boolean>;
  $isLastPage: Store<boolean>;
  pageSwitched: Event<number>;
  previousPageSwitched: Event<void>;
  nextPageSwitched: Event<void>;
  recordsPerPageChanged: Event<number>;
  reset: Event<void>;
};

export const createPagination = <R>(
  $allRecords: Store<R[]>,
  initialRecordsPerPage: number
): PaginationContext<R> => {
  const $allRecordsCount = $allRecords.map((allRecords) => allRecords.length);
  const reset = createEvent();

  const $page = createStore(1).reset(reset);
  const $recordsPerPage = createStore(initialRecordsPerPage).reset(reset);
  const recordsPerPageChanged = createEvent<number>();
  const pageSwitched = createEvent<number>();
  const previousPageSwitched = createEvent();
  const nextPageSwitched = createEvent();

  const $pages = combine(
    $allRecordsCount,
    $recordsPerPage,
    (allRecordsCount, recordsPerPage) =>
      Math.ceil(allRecordsCount / recordsPerPage)
  );

  const $isFirstPage = $page.map((page) => page <= 1);
  const $isLastPage = combine($page, $pages, (page, pages) => page >= pages);

  sample({
    source: recordsPerPageChanged,
    target: $recordsPerPage,
  });

  sample({
    clock: [$allRecordsCount, recordsPerPageChanged],
    fn: () => 1,
    target: pageSwitched,
  });

  sample({
    clock: pageSwitched,
    source: $pages,
    fn: (pages, nextPage) => Math.max(Math.min(pages, nextPage), 1),
    target: $page,
  });

  sample({
    clock: previousPageSwitched,
    source: $page,
    fn: (page) => page - 1,
    target: pageSwitched,
  });

  sample({
    clock: nextPageSwitched,
    source: $page,
    fn: (page) => page + 1,
    target: pageSwitched,
  });

  const $pageRecords = combine(
    $allRecords,
    $page,
    $recordsPerPage,
    (allRecords, page, recordsPerPage) =>
      allRecords.slice((page - 1) * recordsPerPage, page * recordsPerPage)
  );

  const $recordsFrom = combine(
    $page,
    $recordsPerPage,
    (page, recordsPerPage) => (page - 1) * recordsPerPage + 1
  );

  const $recordsTo = combine(
    $page,
    $recordsPerPage,
    $allRecordsCount,
    (page, recordsPerPage, allRecordsCount) =>
      Math.min(page * recordsPerPage, allRecordsCount)
  );

  return {
    $page,
    $pages,
    $allRecords,
    $pageRecords,
    $allRecordsCount,
    $recordsPerPage,
    $recordsFrom,
    $recordsTo,
    $isFirstPage,
    $isLastPage,
    pageSwitched,
    previousPageSwitched,
    nextPageSwitched,
    recordsPerPageChanged,
    reset,
  };
};

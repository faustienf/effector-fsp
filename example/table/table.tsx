import { TableRows } from './table-rows';
import { TableColumns } from './table-columns';
import { TablePagination } from './table-pagination';
import { TableStore, TableProvider } from './use-table';
import { TablePlaceholder } from './table-placeholder';
import { useStore } from 'effector-react';

type Props<R> = {
  store: TableStore<R>;
};

export const Table = <R extends Record<string, unknown>>({
  store,
}: Props<R>) => {
  const loading = useStore(store.$loading);

  return (
    <TableProvider value={store}>
      <table
        className="table w-full table-fixed text-base text-slate-900"
        style={{ captionSide: 'bottom' }}
      >
        <caption className="mt-3">
          <TablePagination />
        </caption>
        <colgroup>
          <col width={100} />
          <col />
          <col width={200} />
        </colgroup>
        <thead>
          <TableColumns />
        </thead>
        <tbody>{loading ? <TablePlaceholder /> : <TableRows />}</tbody>
      </table>
    </TableProvider>
  );
};

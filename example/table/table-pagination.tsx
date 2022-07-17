import { ChangeEvent, FC, memo } from 'react';
import { useStore, useEvent } from 'effector-react';
import { useTable } from './use-table';

export const TablePagination: FC = memo(() => {
  const { pagination } = useTable();
  const isFirstPage = useStore(pagination.$isFirstPage);
  const isLastPage = useStore(pagination.$isLastPage);
  const recordsFrom = useStore(pagination.$recordsFrom);
  const recordsTo = useStore(pagination.$recordsTo);
  const allRecordsCount = useStore(pagination.$allRecordsCount);
  const recordsPerPage = useStore(pagination.$recordsPerPage);
  const previousPageSwitched = useEvent(pagination.previousPageSwitched);
  const nextPageSwitched = useEvent(pagination.nextPageSwitched);
  const recordsPerPageChanged = useEvent(pagination.recordsPerPageChanged);

  const recordsRange =
    allRecordsCount > 0 ? `${recordsFrom} to ${recordsTo} of` : '';

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    recordsPerPageChanged(parseInt(e.target.value));

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center text-sm text-slate-500 gap-2">
        <span>{`Showing ${recordsRange} ${allRecordsCount} rows.`}</span>
        <select
          defaultValue={recordsPerPage}
          onChange={handleChange}
          className="text-slate-900 outline-0 border-b-2 border-transparent focus:border-indigo-500 cursor-pointer"
        >
          {[5, 10, 15].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <span>rows per page.</span>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className="inline-flex items-center h-7 px-4 bg-slate-100 disabled:opacity-50 text-sm rounded-full leading-none cursor-pointer focus:outline outline-indigo-500 focus:outline-offset-2"
          disabled={isFirstPage}
          onClick={previousPageSwitched}
        >
          Previous
        </button>

        <button
          type="button"
          className="inline-flex items-center h-7 px-4 bg-slate-100 disabled:opacity-50 text-sm rounded-full leading-none cursor-pointer focus:outline outline-indigo-500 focus:outline-offset-2"
          disabled={isLastPage}
          onClick={nextPageSwitched}
        >
          Next
        </button>
      </div>
    </div>
  );
});

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
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center fw-light gap-2">
        <small>{`Showing ${recordsRange} ${allRecordsCount} rows.`}</small>
        <div>
          <select
            defaultValue={recordsPerPage}
            onChange={handleChange}
            className="form-control-plaintext form-control-sm"
          >
            {[5, 10, 15].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <small>rows per page</small>
      </div>
      <div className="d-flex gap-3">
        <button
          type="button"
          className="btn btn-light btn-sm"
          disabled={isFirstPage}
          onClick={previousPageSwitched}
        >
          Previous
        </button>

        <button
          type="button"
          className="btn btn-light btn-sm"
          disabled={isLastPage}
          onClick={nextPageSwitched}
        >
          Next
        </button>
      </div>
    </div>
  );
});

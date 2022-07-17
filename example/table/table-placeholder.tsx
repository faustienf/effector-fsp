import { FC, memo } from 'react';
import { useStore } from 'effector-react';
import { useTable } from './use-table';

export const TablePlaceholder: FC = memo(() => {
  const { $columns, pagination } = useTable();
  const columns = useStore($columns);
  const recordsPerPage = useStore(pagination.$recordsPerPage);

  return (
    <>
      {Array.from({ length: recordsPerPage }, (_, index) => (
        <tr key={index}>
          {columns.map((column) => (
            <td key={column} className="py-3 px-2">
              <span className="flex w-1/2 h-4 bg-slate-300 rounded-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
});

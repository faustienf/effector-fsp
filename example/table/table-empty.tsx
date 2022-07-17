import { FC, memo } from 'react';
import { useStore } from 'effector-react';
import { useTable } from './use-table';

export const TableEmpty: FC = memo(() => {
  const { $columns } = useTable();
  const columns = useStore($columns);

  return (
    <tr className="bg-light">
      <td
        colSpan={columns.length}
        className="text-center text-muted fst-italic"
      >
        <small>No Data</small>
      </td>
    </tr>
  );
});

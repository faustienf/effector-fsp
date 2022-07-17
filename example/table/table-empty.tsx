import { FC, memo } from 'react';
import { useStore } from 'effector-react';
import { useTable } from './use-table';

export const TableEmpty: FC = memo(() => {
  const { $columns } = useTable();
  const columns = useStore($columns);

  return (
    <tr>
      <td
        colSpan={columns.length}
        className="bg-slate-50 p-5 text-center font-extralight text-sm italic"
      >
        No Data
      </td>
    </tr>
  );
});

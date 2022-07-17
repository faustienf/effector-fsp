import { FC, memo } from 'react';
import { useStore } from 'effector-react';
import { TableTitle } from './table-title';
import { TableFilter } from './table-filter';
import { useTable } from './use-table';

export const TableColumns: FC = memo(() => {
  const { $columns } = useTable();
  const columns = useStore($columns);

  return (
    <tr>
      {columns.map((column) => (
        <th key={column} className="text-left px-2">
          <TableTitle column={column} />
          <TableFilter column={column} />
        </th>
      ))}
    </tr>
  );
});

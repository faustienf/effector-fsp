import { FC, memo } from 'react';
import { useStore, useList } from 'effector-react';
import { useTable } from './use-table';
import { TableEmpty } from './table-empty';

export const TableRows: FC = memo(() => {
  const { $columns, pagination } = useTable();
  const columns = useStore($columns);

  return useList(pagination.$pageRecords, {
    placeholder: <TableEmpty />,
    getKey: (record) => String(record.id),
    fn: (record) => (
      <tr>
        {columns.map((column) => (
          <td key={column}>{String(record[column])}</td>
        ))}
      </tr>
    ),
  });
});

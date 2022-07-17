import { FC, memo } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useTable } from './use-table';
import { TableOrder } from './table-order';

type Props = {
  column: string;
};

export const TableTitle: FC<Props> = memo(({ column }) => {
  const { sorting } = useTable();
  const field = useStore(sorting.$field);
  const sortedBy = useEvent(sorting.sortedBy);

  return (
    <span
      className="text-capitalize"
      role="button"
      tabIndex={0}
      onClick={() => sortedBy(column)}
    >
      {column}
      {field === column && <TableOrder />}
    </span>
  );
});

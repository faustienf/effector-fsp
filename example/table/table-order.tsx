import { FC, memo } from 'react';
import { useStore } from 'effector-react';
import { useTable } from './use-table';

export const TableOrder: FC = memo(() => {
  const { sorting } = useTable();
  const order = useStore(sorting.$order);

  return <small>{order === 'asc' ? ' ↑' : ' ↓'}</small>;
});

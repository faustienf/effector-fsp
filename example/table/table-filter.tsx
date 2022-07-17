import { FC, memo } from 'react';
import { useStoreMap } from 'effector-react';
import { useTable } from './use-table';

type Props = {
  column: string;
};

export const TableFilter: FC<Props> = memo(({ column }) => {
  const { filters } = useTable();
  const value = useStoreMap({
    store: filters.$filters,
    keys: [column],
    fn: (filters) => filters.get(column) || '',
  });

  return (
    <input
      placeholder="Search..."
      className="block w-full text-sm font-normal py-1 outline-0 border-b-2 border-transparent focus:border-indigo-500"
      value={value}
      onChange={(e) => filters.filterChanged([column, e.target.value])}
    />
  );
});

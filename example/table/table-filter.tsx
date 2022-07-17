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
      className="form-control-plaintext form-control-sm"
      value={value}
      onChange={(e) => filters.filterChanged([column, e.target.value])}
    />
  );
});

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
            <td key={column}>
              <div className="placeholder-glow">
                <span className="placeholder col-6"></span>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
});

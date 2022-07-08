import { useMemo } from 'react';
import BootstrapTable, {
  BootstrapTableProps,
  ColumnDescription,
} from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { ChevronUp, ChevronDown } from 'react-feather';

export interface OnSortPropsInterface {
  sortBy?: string;
  order?: 'desc' | 'asc';
}

type TableProps = Pick<BootstrapTableProps, 'data' | 'columns'> & {
  keyField?: string;
  handleOnSort?: (props: OnSortPropsInterface) => void;
};

const Table = (props: TableProps) => {
  const columns: Array<ColumnDescription> = useMemo(
    () =>
      props.columns.map((v) => ({
        ...v,
        onSort: (sortBy, order) => props.handleOnSort({ sortBy, order }),
      })),
    props.columns,
  );

  return (
    <BootstrapTable
      bootstrap4
      {...props}
      columns={columns}
      keyField={props.keyField || 'id'}
      onSort={(field, order) => {
        console.log({ field, order });
      }}
      sort={{
        order: 'asc',
        sortCaret: (sort) => (
          <span className="d-inline-flex flex-column align-middle ps-2 float-end align-items-center">
            <ChevronUp
              size={sort === 'asc' ? 14 : 12}
              color={sort === 'asc' ? 'blue' : 'black'}
            />
            <ChevronDown
              size={sort === 'desc' ? 14 : 12}
              color={sort === 'desc' ? 'blue' : 'black'}
            />
          </span>
        ),
        sortFunc: () => true,
      }}
    />
  );
};

export default Table;
